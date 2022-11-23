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

class ZegoExpressBridge {

  public:
    ZegoExpressBridge();
    ~ZegoExpressBridge() {}

  private:
    IZegoExpressEngine *native_engine_ = nullptr;

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
    void logoutRoom(const std::string &roomID, const se::Value &callback);
    void switchRoom(const std::string &fromRoomID, const std::string &toRoomID, int maxMemberCount,
                    bool isUserStatusNotify, const std::string &token);

    void renewToken(const std::string &roomID, const std::string &token);
    void setRoomExtraInfo(const std::string &roomID, const std::string &key,
                          const std::string &value, const se::Value &callback);

#pragma mark - Publisher module
  public:
    void startPublishingStream(const std::string &streamID, const std::string &roomID,
                               int forceSynchronousNetworkTime, int streamCensorshipMode,
                               int channel);
    void stopPublishingStream(int channel);
    void setStreamExtraInfo(const std::string &extraInfo, int channel, const se::Value &callback);
    void startPreview(int channel);
    void stopPreview(int channel);

    void setVideoConfig(int captureWidth, int captureHeight, int encodeWidth, int encodeHeight,
                        int fps, int bitrate, int codecID, int keyFrameInterval, int channel);

    se::Object *getVideoConfig(int channel);
    void setAppOrientation(int orientation, int channel);
    void setAudioConfig(int bitrate, int audioChannel, int codecID, int channel);
    se::Object *getAudioConfig(int channel);
    void setPublishStreamEncryptionKey(const std::string &key, int channel);
    void mutePublishStreamAudio(bool mute, int channel);
    void mutePublishStreamVideo(bool mute, int channel);
    void enableTrafficControl(bool enable, int property, int channel);
    void setMinVideoBitrateForTrafficControl(int bitrate, int mode, int channel);
    void setMinVideoFpsForTrafficControl(int fps, int channel);
    void setMinVideoResolutionForTrafficControl(int width, int height, int channel);
    void setCaptureVolume(int volume);
    void enableHardwareEncoder(bool enable);
    void setCapturePipelineScaleMode(int mode);
    bool isVideoEncoderSupported(int codecID);
    void setAppOrientationMode(int mode);

#pragma mark - Player module
  public:
    void startPlayingStream(const std::string &streamID, const se::Value &config);
    void stopPlayingStream(const std::string &streamID);
    void setPlayStreamDecryptionKey(const std::string &streamID, const std::string &key);
    void setPlayVolume(const std::string &streamID, int volume);
    void setAllPlayStreamVolume(int volume);
    void setPlayStreamVideoType(const std::string &streamID, int streamType);
    void setPlayStreamBufferIntervalRange(const std::string &streamID, int minBufferInterval,
                                          int maxBufferInterval);
    void setPlayStreamFocusOn(const std::string &streamID);
    void mutePlayStreamAudio(const std::string &streamID, bool mute);
    void mutePlayStreamVideo(const std::string &streamID, bool mute);
    void muteAllPlayStreamAudio(bool mute);
    void muteAllPlayStreamVideo(bool mute);
    void enableHardwareDecoder(bool enable);
    void enableCheckPoc(bool enable);
    bool isVideoDecoderSupported(int codecID);
};

} // namespace zego::cocos
