//
//  zego_express_bridge.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#pragma once

#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"
#include <memory>
#include <unordered_map>

#if defined(ANDROID)
#include "platform/java/jni/JniHelper.h"
#endif

#include "ZegoExpressSDK.h"

using namespace ZEGO::EXPRESS;

namespace zego::cocos {

class ZegoExpressBridge : public std::enable_shared_from_this<ZegoExpressBridge>,
                          public IZegoEventHandler,
                          public IZegoCustomVideoRenderHandler {

  public:
    ZegoExpressBridge();
    ~ZegoExpressBridge() {}

  public:
    static std::string getVersion();

  public:
    void createEngine(unsigned int appID, const std::string &appSign, int scenario);

    void destroyEngine();

    void setEventHandler(const se::Value &handler);

    void loginRoom(const std::string &roomID, const std::string &userID,
                   const std::string &userName);

    void logoutRoom(const std::string &roomID);

    void startPreview(int channel, int viewID);

    void stopPreview(int channel);

    void startPublishingStream(const std::string &streamID, const std::string &roomID,
                               int forceSynchronousNetworkTime, int streamCensorshipMode,
                               int channel);

    void stopPublishingStream(int channel);

    void startPlayingStream(const std::string &streamID, int viewID);

    void stopPlayingStream(const std::string &streamID);

  public:
    int64_t createTextureRenderer();
    void destroyTextureRenderer(int64_t textureId);
    void setJsTextureRendererController(const se::Value &controller);

  public:
    void onDebugError(int errorCode, const std::string &funcName, const std::string &info) override;

    void onRoomStateUpdate(const std::string &roomID, ZegoRoomState state, int errorCode,
                           const std::string &extendedData) override;

    void onRoomStateChanged(const std::string &roomID, ZegoRoomStateChangedReason reason,
                            int errorCode, const std::string &extendedData) override;

  private:
    IZegoExpressEngine *native_engine_ = nullptr;
    std::shared_ptr<se::Value> event_handler_;
};

bool RegisterExpressBridge(se::Object *ns);

} // namespace zego::cocos
