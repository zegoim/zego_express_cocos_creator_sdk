//
//  zego_texture_renderer_controller.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "zego_texture_renderer_controller.h"

namespace zego::cocos {

std::shared_ptr<ZegoTextureRendererController> ZegoTextureRendererController::GetInstance() {
    static std::shared_ptr<ZegoTextureRendererController> instance_ =
        std::make_shared<ZegoTextureRendererController>();
    return instance_;
}

int64_t ZegoTextureRendererController::CreateTextureRenderer() {
    auto renderer = std::make_shared<ZegoTextureRenderer>();
    int64_t textureId = renderer->TextureId();
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

void ZegoTextureRendererController::BindRemoteStreamId(std::string streamId, int64_t textureId) {
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

void ZegoTextureRendererController::BindMediaPlayerIndex(int32_t index, int64_t textureId) {
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

uint8_t *ZegoTextureRendererController::GetFrameBuffer() {
    return 0;
#warning todo
}

void ZegoTextureRendererController::UpdateRendererFrameBuffer(ZegoTextureRenderer *renderer,
                                                              unsigned char **data,
                                                              unsigned int *dataLength,
                                                              ZegoVideoFrameParam param,
                                                              ZegoVideoFlipMode flipMode) {
    if (param.width != renderer->Width() || param.height != renderer->Height() ||
        param.rotation != renderer->Rotation() || flipMode != renderer->FlipMode()) {
#warning TODO: Notify TS layer to update renderer's param, and then get the new buffer from native
    }

    renderer->UpdateFrameBuffer(data[0], dataLength[0], param, flipMode);
}

void ZegoTextureRendererController::onCapturedVideoFrameRawData(unsigned char **data,
                                                                unsigned int *dataLength,
                                                                ZegoVideoFrameParam param,
                                                                ZegoVideoFlipMode flipMode,
                                                                ZegoPublishChannel channel) {
    printf("[onCapturedVideoFrameRawData] data:%p, length:%u, w:%d, h:%d, format:%d, flip:%d, "
           "channel:%d\n",
           data[0], dataLength[0], param.width, param.height, param.format, flipMode, channel);

    int64_t textureId;
    ZegoTextureRenderer *renderer;

    {
        const std::lock_guard<std::mutex> lock(renderersMutex_);
        auto textureId = capturedTextureIdMap_.find(channel);
        if (textureId == capturedTextureIdMap_.end()) {
            return;
        }
        auto renderer = renderers_.find(textureId->second);
        if (renderer == renderers_.end()) {
            return;
        }
    }
}

void ZegoTextureRendererController::onRemoteVideoFrameRawData(unsigned char **data,
                                                              unsigned int *dataLength,
                                                              ZegoVideoFrameParam param,
                                                              const std::string &streamID) {
    printf("[onRemoteVideoFrameRawData] streamID:%s, data:%p, length:%u, w:%d, h:%d, format:%d\n",
           streamID.c_str(), data[0], dataLength[0], param.width, param.height, param.format);
}

} // namespace zego::cocos
