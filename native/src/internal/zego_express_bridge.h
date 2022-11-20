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
                          public IZegoApiCalledEventHandler,
                          public IZegoCustomVideoRenderHandler {

  public:
    ZegoExpressBridge();
    ~ZegoExpressBridge() {}

  public:
    void setJsTextureRendererController(const se::Value &controller);

#pragma mark - Main module
  public:
    void createEngine(unsigned int appID, const std::string &appSign, int scenario);
    void destroyEngine(const se::Value &callback);
    void setEngineConfig(const se::Value &advancedConfig);
    void setLogConfig(const std::string &logPath, uint64_t logSize);
    void setRoomMode(int mode);
    std::string getVersion();
    void setApiCalledCallback(const se::Value &callback);
    bool isFeatureSupported(int featureType);
    void setEventHandler(const se::Value &handler);
    void setRoomScenario(int scenario);
    void uploadLog(const se::Value &callback);
    void enableDebugAssistant(bool enable);
    std::string callExperimentalAPI(const std::string &params);

#pragma mark - Room module
  public:
    void loginRoom(const std::string &roomID, const std::string &userID,
                   const std::string &userName, unsigned int maxMemberCount,
                   bool isUserStatusNotify, const std::string &token, const se::Value &callback);
    void logoutRoom(const std::string &roomID);

#pragma mark - Publisher module
  public:
    void startPreview(int channel);
    void stopPreview(int channel);

    void startPublishingStream(const std::string &streamID, const std::string &roomID,
                               int forceSynchronousNetworkTime, int streamCensorshipMode,
                               int channel);
    void stopPublishingStream(int channel);
    se::Object *getVideoConfig(int channel);

#pragma mark - Player module
  public:
    void startPlayingStream(const std::string &streamID);
    void stopPlayingStream(const std::string &streamID);

#pragma mark - Callback
  public:
    void onApiCalledResult(int, const std::string &, const std::string &) override;
    void onDebugError(int errorCode, const std::string &funcName, const std::string &info) override;

    void onRoomStateUpdate(const std::string &roomID, ZegoRoomState state, int errorCode,
                           const std::string &extendedData) override;

    void onRoomStateChanged(const std::string &roomID, ZegoRoomStateChangedReason reason,
                            int errorCode, const std::string &extendedData) override;

    void onRoomStreamUpdate(const std::string &roomID, ZegoUpdateType updateType,
                            const std::vector<ZegoStream> &streamList,
                            const std::string &extendedData) override;

  private:
    IZegoExpressEngine *native_engine_ = nullptr;
    std::shared_ptr<se::Value> event_handler_;
    std::shared_ptr<se::Value> api_called_callback_;
};

} // namespace zego::cocos
