//
//  zego_texture_renderer_controller.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#pragma once

#include "ZegoExpressSDK.h"

#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"
#include <unordered_map>

using namespace ZEGO::EXPRESS;

namespace zego::cocos {

struct ZegoCocosVideoFrame {
    std::unique_ptr<uint8_t[]> data;
    uint32_t data_length = 0;
    ZegoVideoFrameParam param;
    ZegoVideoFlipMode flip_mode = ZEGO_VIDEO_FLIP_MODE_NONE;
};

class ZegoTextureRendererController : public IZegoCustomVideoRenderHandler {

  public:
    static std::shared_ptr<ZegoTextureRendererController> GetInstance();

    void SetJsController(const se::Value &controller);

  private:
    void onCapturedVideoFrameRawData(unsigned char **data, unsigned int *dataLength,
                                     ZegoVideoFrameParam param, ZegoVideoFlipMode flipMode,
                                     ZegoPublishChannel channel) override;

    void onRemoteVideoFrameRawData(unsigned char **data, unsigned int *dataLength,
                                   ZegoVideoFrameParam param, const std::string &streamID) override;
    
private:
    /// Convert BGRA to RGBA, and cut the stride padding
    void CopyAndProcessVideoFrameBuffer(uint8_t *src_buffer, uint8_t *dst_buffer, ZegoVideoFrameParam param);

  private:
    std::shared_ptr<se::Value> js_controller_;
    
private:
    std::mutex captured_video_frame_mutex_;
    std::map<ZegoPublishChannel, std::shared_ptr<ZegoCocosVideoFrame>> captured_video_frames_;

    std::mutex remote_video_frame_mutex_;
    std::map<std::string, std::shared_ptr<ZegoCocosVideoFrame>> remote_video_frames_;

};

} // namespace zego::cocos
