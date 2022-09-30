//
//  zego_texture_renderer.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "zego_texture_renderer.h"
#include "zego_utils.h"

namespace zego::cocos {

ZegoTextureRenderer::ZegoTextureRenderer() { textureId_ = GetNextSequence(); }

int64_t ZegoTextureRenderer::TextureId() { return textureId_; }

void ZegoTextureRenderer::UpdateFrameBuffer(uint8_t *data, uint32_t data_length,
                                            ZEGO::EXPRESS::ZegoVideoFrameParam param,
                                            ZegoVideoFlipMode flip_mode) {
    const std::lock_guard<std::mutex> lock(mutex_);
    if (buffer_.size() != data_length) {
        buffer_.resize(data_length);
    }
    width_ = param.width;
    height_ = param.height;
    rotation_ = param.rotation;
    flip_mode_ = flip_mode;
    std::copy(data, data + data_length, buffer_.data());
}

uint8_t *ZegoTextureRenderer::GetFrameBuffer() {
    const std::lock_guard<std::mutex> lock(mutex_);
    return buffer_.data();
}

} // namespace zego::cocos
