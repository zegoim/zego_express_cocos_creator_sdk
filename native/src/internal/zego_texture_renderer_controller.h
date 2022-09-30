//
//  zego_texture_renderer_controller.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#pragma once

#include "ZegoExpressSDK.h"
#include "zego_texture_renderer.h"

#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"
#include <unordered_map>

using namespace ZEGO::EXPRESS;

namespace zego::cocos {

class ZegoTextureRendererController : public IZegoCustomVideoRenderHandler {

  public:
    static std::shared_ptr<ZegoTextureRendererController> GetInstance();

    int64_t CreateTextureRenderer();

    bool DestroyTextureRenderer(int64_t textureId);
    
    void SetJsController(const se::Value &controller);

  public:
    bool BindCapturedChannel(ZegoPublishChannel channel, int64_t textureId);

    void UnbindCapturedChannel(ZegoPublishChannel channel);

    void BindRemoteStreamId(std::string streamId, int64_t textureId);

    void UnbindRemoteStreamId(std::string streamId);

    void BindMediaPlayerIndex(int32_t index, int64_t textureId);

    void UnbindMediaPlayerIndex(int32_t index);

  public:
    uint8_t *GetFrameBuffer();

  private:
    void UpdateRendererFrameBuffer(ZegoTextureRenderer *renderer, unsigned char **data,
                                   unsigned int *dataLength, ZegoVideoFrameParam param,
                                   ZegoVideoFlipMode flipMode);

  private:
    void onCapturedVideoFrameRawData(unsigned char **data, unsigned int *dataLength,
                                     ZegoVideoFrameParam param, ZegoVideoFlipMode flipMode,
                                     ZegoPublishChannel channel) override;

    void onRemoteVideoFrameRawData(unsigned char **data, unsigned int *dataLength,
                                   ZegoVideoFrameParam param, const std::string &streamID) override;

  private:
    std::unordered_map<int64_t, std::shared_ptr<ZegoTextureRenderer>> renderers_;
    std::unordered_map<ZegoPublishChannel, int64_t> capturedTextureIdMap_;
    std::unordered_map<std::string, int64_t> remoteTextureIdMap_;
    std::unordered_map<int32_t, int64_t> mediaPlayerTextureIdMap_;

    std::mutex renderersMutex_;

    std::atomic_bool isInit = false;
    
    std::shared_ptr<se::Value> js_controller_;
};

} // namespace zego::cocos
