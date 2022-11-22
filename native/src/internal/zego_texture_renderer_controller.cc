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

void ZegoTextureRendererController::SetJsController(const se::Value &controller) {
    js_controller_ = std::make_shared<se::Value>(controller);
}

void ZegoTextureRendererController::onCapturedVideoFrameRawData(unsigned char **data,
                                                                unsigned int *dataLength,
                                                                ZegoVideoFrameParam param,
                                                                ZegoVideoFlipMode flipMode,
                                                                ZegoPublishChannel channel) {

    uint32_t fixed_data_length = param.width * param.height * 4;

    auto video_frame = std::make_shared<ZegoCocosVideoFrame>();
    video_frame->data = std::make_unique<uint8_t[]>(fixed_data_length);
    video_frame->data_length = fixed_data_length;
    video_frame->param = param;
    video_frame->flip_mode = flipMode;

    // Convert BGRA to RGBA, and cut the stride padding
    CopyAndProcessVideoFrameBuffer(data[0], video_frame->data.get(), param);

    {
        // Cache video frame
        std::lock_guard<std::mutex> lock(captured_video_frame_mutex_);
        captured_video_frames_[channel] = video_frame;
    }

    RunOnCocosThread([=]() {
        std::shared_ptr<ZegoCocosVideoFrame> frame = nullptr;
        {
            std::lock_guard<std::mutex> lock(captured_video_frame_mutex_);
            frame = captured_video_frames_[channel];
            if (!frame) {
                return; // Drop this frame
            }
            captured_video_frames_[channel].reset();
        }

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

            se::Object *js_data_object = se::Object::createTypedArray(
                se::Object::TypedArrayType::UINT8, frame->data.get(), frame->data_length);
            se::Value js_data = se::Value(js_data_object);

            se::Value js_data_length;
            nativevalue_to_se(frame->data_length, js_data_length, nullptr);

            se::Value js_width;
            se::Value js_height;
            se::Value js_rotation;
            se::Value js_flip_mode;
            nativevalue_to_se(frame->param.width, js_width, nullptr);
            nativevalue_to_se(frame->param.height, js_height, nullptr);
            nativevalue_to_se(frame->param.rotation, js_rotation, nullptr);
            nativevalue_to_se(frame->flip_mode, js_flip_mode, nullptr);

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
    });
}

void ZegoTextureRendererController::onRemoteVideoFrameRawData(unsigned char **data,
                                                              unsigned int *dataLength,
                                                              ZegoVideoFrameParam param,
                                                              const std::string &streamID) {

    uint32_t fixed_data_length = param.width * param.height * 4;

    auto video_frame = std::make_shared<ZegoCocosVideoFrame>();
    video_frame->data = std::make_unique<uint8_t[]>(fixed_data_length);
    video_frame->data_length = fixed_data_length;
    video_frame->param = param;
    video_frame->flip_mode = ZEGO_VIDEO_FLIP_MODE_NONE;

    // Convert BGRA to RGBA, and cut the stride padding
    CopyAndProcessVideoFrameBuffer(data[0], video_frame->data.get(), param);

    {
        // Cache video frame
        std::lock_guard<std::mutex> lock(remote_video_frame_mutex_);
        remote_video_frames_[streamID] = video_frame;
    }

    RunOnCocosThread([=] {
        std::shared_ptr<ZegoCocosVideoFrame> frame = nullptr;
        {
            std::lock_guard<std::mutex> lock(remote_video_frame_mutex_);
            frame = remote_video_frames_[streamID];
            if (!frame) {
                return; // Drop this frame
            }
            remote_video_frames_[streamID].reset();
        }

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

            se::Object *js_data_object = se::Object::createTypedArray(
                se::Object::TypedArrayType::UINT8, frame->data.get(), frame->data_length);
            se::Value js_data = se::Value(js_data_object);

            se::Value js_data_length;
            nativevalue_to_se(frame->data_length, js_data_length, nullptr);

            se::Value js_width;
            se::Value js_height;
            se::Value js_rotation;
            nativevalue_to_se(frame->param.width, js_width, nullptr);
            nativevalue_to_se(frame->param.height, js_height, nullptr);
            nativevalue_to_se(frame->param.rotation, js_rotation, nullptr);

            se::ValueArray args;
            args.push_back(js_stream_id);
            args.push_back(js_data);
            args.push_back(js_data_length);
            args.push_back(js_width);
            args.push_back(js_height);
            args.push_back(js_rotation);

            func->call(args, js_controller_->toObject());
        }
    });
}

void ZegoTextureRendererController::CopyAndProcessVideoFrameBuffer(uint8_t *src_buffer,
                                                                   uint8_t *dst_buffer,
                                                                   ZegoVideoFrameParam param) {
    uint32_t fixed_stride = param.width * 4;
    uint32_t src_index = 0;
    uint32_t dst_index = 0;
    for (uint32_t h = 0; h < param.height; h++) {
        src_index = h * param.strides[0];
        for (uint32_t w = 0; w < fixed_stride; w += 4) {
#if defined(ANDROID)
            dst_buffer[dst_index++] = src_buffer[src_index + w + 0]; // R
            dst_buffer[dst_index++] = src_buffer[src_index + w + 1]; // G
            dst_buffer[dst_index++] = src_buffer[src_index + w + 2]; // B
            dst_buffer[dst_index++] = src_buffer[src_index + w + 3]; // A
#else
            dst_buffer[dst_index++] = src_buffer[src_index + w + 2]; // R
            dst_buffer[dst_index++] = src_buffer[src_index + w + 1]; // G
            dst_buffer[dst_index++] = src_buffer[src_index + w + 0]; // B
            dst_buffer[dst_index++] = src_buffer[src_index + w + 3]; // A
#endif
        }
    }
}

} // namespace zego::cocos
