//
//  zego_texture_renderer_controller.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "zego_texture_renderer_controller.h"
#include "zego_utils.h"

namespace zego::cocos {

std::shared_ptr<ZegoTextureRendererController> ZegoTextureRendererController::GetInstance() {
    static std::shared_ptr<ZegoTextureRendererController> instance_ =
        std::make_shared<ZegoTextureRendererController>();
    return instance_;
}

int64_t ZegoTextureRendererController::CreateTextureRenderer() {
    auto renderer = std::make_shared<ZegoTextureRenderer>();
    int64_t textureId = renderer->TextureId();
    renderer->SetJsController(*js_controller_.get());
    {
        const std::lock_guard<std::mutex> lock(renderersMutex_);
        renderers_[textureId] = renderer;
    }

    return textureId;
}

void ZegoTextureRendererController::SetJsController(const se::Value &controller) {
    js_controller_ = std::make_shared<se::Value>(controller);
}

bool ZegoTextureRendererController::DestroyTextureRenderer(int64_t textureId) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    auto renderer = renderers_.find(textureId);
    if (renderer == renderers_.end()) {
        // TODO: Add some log
        return false;
    }
    renderer->second.reset();
    renderers_.erase(textureId);
    return true;
}

bool ZegoTextureRendererController::BindCapturedChannel(ZegoPublishChannel channel,
                                                        int64_t textureId) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    auto renderer = renderers_.find(textureId);
    if (renderer == renderers_.end()) {
        // TODO: Add some log
        return false;
    }

    capturedTextureIdMap_[channel] = textureId;

    return true;
}

void ZegoTextureRendererController::UnbindCapturedChannel(ZegoPublishChannel channel) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    capturedTextureIdMap_.erase(channel);
}

bool ZegoTextureRendererController::BindRemoteStreamId(std::string streamId, int64_t textureId) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    auto renderer = renderers_.find(textureId);
    if (renderer == renderers_.end()) {
        // TODO: Add some log
        return false;
    }

    remoteTextureIdMap_[streamId] = textureId;

    return true;
}

void ZegoTextureRendererController::UnbindRemoteStreamId(std::string streamId) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    remoteTextureIdMap_.erase(streamId);
}

bool ZegoTextureRendererController::BindMediaPlayerIndex(int32_t index, int64_t textureId) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    auto renderer = renderers_.find(textureId);
    if (renderer == renderers_.end()) {
        // TODO: Add some log
        return false;
    }

    mediaPlayerTextureIdMap_[index] = textureId;

    return true;
}

void ZegoTextureRendererController::UnbindMediaPlayerIndex(int32_t index) {
    const std::lock_guard<std::mutex> lock(renderersMutex_);
    mediaPlayerTextureIdMap_.erase(index);
}


void ZegoTextureRendererController::onCapturedVideoFrameRawData(unsigned char **data,
                                                                unsigned int *dataLength,
                                                                ZegoVideoFrameParam param,
                                                                ZegoVideoFlipMode flipMode,
                                                                ZegoPublishChannel channel) {
    printf("[onCapturedVideoFrameRawData] data:%p, length:%u, w:%d, h:%d, format:%d, flip:%d, "
           "channel:%d\n",
           data[0], dataLength[0], param.width, param.height, param.format, flipMode, channel);
    
    auto video_frame = std::make_shared<ZegoCocosVideoFrame>();
    video_frame->data = std::make_unique<uint8_t[]>(dataLength[0]);
    video_frame->data_length = dataLength[0];
    video_frame->param = param;
    video_frame->flip_mode = flipMode;
    memcpy(video_frame->data.get(), data[0], dataLength[0]);
    
    {
        // Cache video frame into buffer queue
        std::lock_guard<std::mutex> lock(captured_video_frame_mutex_);
        if (captured_video_frames_.count(channel) <= 0) {
            captured_video_frames_[channel] = ZegoCocosVideoFrameQueue();
        }
        auto &queue = captured_video_frames_[channel];
        queue.push(video_frame);
        if (queue.size() > 1) {
            queue.pop();
        }
    }
    
    auto job = [=]() {
        std::lock_guard<std::mutex> lock(captured_video_frame_mutex_);
        auto &queue = captured_video_frames_[channel];
        if (queue.size() <= 0) {
            return;
        }
        
        auto video_frame = queue.front();
        queue.pop();
        
        se::ScriptEngine::getInstance()->clearException();
        se::AutoHandleScope hs;
        se::Value method;
        if (js_controller_->toObject()->getProperty("onCapturedVideoFrameRawData", &method)) {
            if (!method.isObject()) {
                return;
            }
            auto func = method.toObject();
            if (!func->isFunction()) {
                return;
            }
            
            se::Value js_channel;
            nativevalue_to_se(channel, js_channel, nullptr);
            
            se::Object *js_data_object = se::Object::createTypedArray(se::Object::TypedArrayType::UINT8, video_frame->data.get(), video_frame->data_length);
            se::Value js_data = se::Value(js_data_object);
            
            se::Value js_data_length;
            nativevalue_to_se(video_frame->data_length, js_data_length, nullptr);
            
            se::Value js_width;
            se::Value js_height;
            se::Value js_rotation;
            se::Value js_flip_mode;
            nativevalue_to_se(video_frame->param.width, js_width, nullptr);
            nativevalue_to_se(video_frame->param.height, js_height, nullptr);
            nativevalue_to_se(video_frame->param.rotation, js_rotation, nullptr);
            nativevalue_to_se(video_frame->flip_mode, js_flip_mode, nullptr);
            
            se::ValueArray args;
            args.push_back(js_channel);
            args.push_back(js_data);
            args.push_back(js_data_length);
            args.push_back(js_width);
            args.push_back(js_height);
            args.push_back(js_rotation);
            args.push_back(js_flip_mode);

            func->call(args, js_controller_->toObject());
        }
    };
    
    RunOnCocosThread(job);
}

void ZegoTextureRendererController::onRemoteVideoFrameRawData(unsigned char **data,
                                                              unsigned int *dataLength,
                                                              ZegoVideoFrameParam param,
                                                              const std::string &streamID) {
    // RunOnCocosThread([=] {
    printf("[onRemoteVideoFrameRawData] streamID:%s, data:%p, length:%u, w:%d, h:%d, format:%d\n",
           streamID.c_str(), data[0], dataLength[0], param.width, param.height, param.format);

    auto video_frame = std::make_shared<ZegoCocosVideoFrame>();
    video_frame->data = std::make_unique<uint8_t[]>(dataLength[0]);
    video_frame->data_length = dataLength[0];
    video_frame->param = param;
    memcpy(video_frame->data.get(), data[0], dataLength[0]);
    
    {
        // Cache video frame into buffer queue
        std::lock_guard<std::mutex> lock(remote_video_frame_mutex_);
        
        if (remote_video_frames_.count(streamID) <= 0) {
            remote_video_frames_[streamID] = ZegoCocosVideoFrameQueue();
        }
        auto &queue = remote_video_frames_[streamID];
        queue.push(video_frame);
        if (queue.size() > 1) {
            queue.pop();
        }
    }
    
    auto job = [=]() {
        std::lock_guard<std::mutex> lock(captured_video_frame_mutex_);
        auto &queue = remote_video_frames_[streamID];
        if (queue.size() <= 0) {
            return;
        }
        
        auto video_frame = queue.front();
        queue.pop();
        
        se::ScriptEngine::getInstance()->clearException();
        se::AutoHandleScope hs;
        se::Value method;
        if (js_controller_->toObject()->getProperty("onRemoteVideoFrameRawData", &method)) {
            if (!method.isObject()) {
                return;
            }
            auto func = method.toObject();
            if (!func->isFunction()) {
                return;
            }
            
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            
            se::Object *js_data_object = se::Object::createTypedArray(se::Object::TypedArrayType::UINT8, video_frame->data.get(), video_frame->data_length);
            se::Value js_data = se::Value(js_data_object);
            
            se::Value js_data_length;
            nativevalue_to_se(video_frame->data_length, js_data_length, nullptr);
            
            se::Value js_width;
            se::Value js_height;
            se::Value js_rotation;
            nativevalue_to_se(video_frame->param.width, js_width, nullptr);
            nativevalue_to_se(video_frame->param.height, js_height, nullptr);
            nativevalue_to_se(video_frame->param.rotation, js_rotation, nullptr);
            
            se::ValueArray args;
            args.push_back(js_stream_id);
            args.push_back(js_data);
            args.push_back(js_data_length);
            args.push_back(js_width);
            args.push_back(js_height);
            args.push_back(js_rotation);

            func->call(args, js_controller_->toObject());
        }
    };
    
    RunOnCocosThread(job);
}

} // namespace zego::cocos
