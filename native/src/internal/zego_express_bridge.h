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

#pragma mark - Device module
  public:
    void muteMicrophone(bool mute);
    bool isMicrophoneMuted();
    void muteSpeaker(bool mute);
    bool isSpeakerMuted();
    ccstd::vector<se::Object *> getAudioDeviceList(int deviceType);
    std::string getDefaultAudioDeviceID(int deviceType);
    void useAudioDevice(int deviceType, const std::string &deviceID);
    int getAudioDeviceVolume(int deviceType, const std::string &deviceID);
    void setAudioDeviceVolume(int deviceType, const std::string &deviceID, int volume);
    void startAudioDeviceVolumeMonitor(int deviceType, const std::string &deviceID);
    void stopAudioDeviceVolumeMonitor(int deviceType, const std::string &deviceID);
    void muteAudioDevice(int deviceType, const std::string &deviceID, bool mute);
    void setAudioDeviceMode(int deviceMode);
    bool isAudioDeviceMuted(int deviceType, const std::string &deviceID);
    void enableAudioCaptureDevice(bool enable);
    int getAudioRouteType();
    void setAudioRouteToSpeaker(bool defaultToSpeaker);
    void enableCamera(bool enable, int channel);
    void useFrontCamera(bool enable, int channel);
    bool isCameraFocusSupported(int channel);
    void setCameraFocusMode(int mode, int channel);
    void setCameraFocusPointInPreview(float x, float y, int channel);
    void setCameraExposureMode(int mode, int channel);
    void setCameraExposurePointInPreview(float x, float y, int channel);
    void setCameraExposureCompensation(float value, int channel);
    void setCameraZoomFactor(float factor, int channel);
    float getCameraMaxZoomFactor(int channel);
    void enableCameraAdaptiveFPS(bool enable, int minFPS, int maxFPS, int channel);
    void useVideoDevice(const std::string &deviceID, int channel);
    ccstd::vector<se::Object *> getVideoDeviceList();
    std::string getDefaultVideoDeviceID();
    void startSoundLevelMonitor(int millisecond, bool enableVAD);
    void stopSoundLevelMonitor();
    void startAudioSpectrumMonitor(int millisecond);
    void stopAudioSpectrumMonitor();
    void enableHeadphoneMonitor(bool enable);
    void setHeadphoneMonitorVolume(int volume);
    void enableMixSystemPlayout(bool enable);
    void setMixSystemPlayoutVolume(int volume);
    void enableMixEnginePlayout(bool enable);
    void startAudioVADStableStateMonitor(int type, int millisecond);
    void stopAudioVADStableStateMonitor(int type);
    se::Object *getCurrentAudioDevice(int deviceType);

#pragma mark - Device module
  public:
    void enableAEC(bool enable);
    void enableHeadphoneAEC(bool enable);
    void setAECMode(int mode);
    void enableAGC(bool enable);
    void enableANS(bool enable);
    void enableTransientANS(bool enable);
    void setANSMode(int mode);
    void startEffectsEnv();
    void stopEffectsEnv();
    void enableEffectsBeauty(bool enable);
    void setEffectsBeautyParam(const se::Value &param);
    void setAudioEqualizerGain(int bandIndex, float bandGain);
    void setVoiceChangerPreset(int preset);
    void setVoiceChangerParam(const se::Value &param);
    void setReverbPreset(int preset);
    void setReverbAdvancedParam(const se::Value &param);
    void setReverbEchoParam(const se::Value &param);
    void enableVirtualStereo(bool enable, int angle);
    void enablePlayStreamVirtualStereo(bool enable, int angle, const std::string &streamID);
    void setElectronicEffects(bool enable, int mode, int tonal);
};

} // namespace zego::cocos
