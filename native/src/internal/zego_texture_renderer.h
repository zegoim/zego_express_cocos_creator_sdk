//
//  zego_texture_renderer.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#pragma once

#include "ZegoExpressSDK.h"

using namespace ZEGO::EXPRESS;

namespace zego::cocos {

class ZegoTextureRenderer {
  public:
    ZegoTextureRenderer();

    void UpdateFrameBuffer(uint8_t *data, uint32_t data_length,
                           ZEGO::EXPRESS::ZegoVideoFrameParam param, ZegoVideoFlipMode flip_mode);

    uint8_t *GetFrameBuffer();

  public:
    int64_t TextureId();
    uint32_t Width();
    uint32_t Height();
    uint32_t Rotation();
    ZegoVideoFlipMode FlipMode();

  private:
    int64_t textureId_ = -1;
    uint32_t width_ = 0;
    uint32_t height_ = 0;
    uint32_t rotation_ = 0;
    ZegoVideoFlipMode flip_mode_ = ZEGO_VIDEO_FLIP_MODE_NONE;

  private:
    std::mutex mutex_;
    std::vector<uint8_t> buffer_;
};

} // namespace zego::cocos
