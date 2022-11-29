//
//  zego_express_event_handler.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/11/22.
//  Copyright © 2022 Zego. All rights reserved.
//

#pragma once

#include "ZegoExpressSDK.h"
#include "bindings/sebind/sebind.h"
#include <mutex>

using namespace ZEGO::EXPRESS;

namespace zego::cocos {

class ZegoExpressEventHandler : public std::enable_shared_from_this<ZegoExpressEventHandler>,
                                public IZegoApiCalledEventHandler,
                                public IZegoEventHandler {

  public:
    static std::shared_ptr<ZegoExpressEventHandler> GetInstance();

    void SetJsEventHandler(const se::Value &handler);
    void ClearJsEventHandler();
    void SetJsApiCalledCallback(const se::Value &callback);
    void ClearJsApiCalledCallback();

  private:
    std::mutex handler_mutex_;
    std::shared_ptr<se::Value> event_handler_;
    std::shared_ptr<se::Value> api_called_callback_;

#pragma mark - ApiCalledEventHandler
  public:
    void onApiCalledResult(int, const std::string &, const std::string &) override;

#pragma mark - ZegoEventHandler
  public:
    void onDebugError(int errorCode, const std::string &funcName, const std::string &info) override;

    void onEngineStateUpdate(ZegoEngineState state) override;

    void onRecvExperimentalAPI(const std::string &content) override;

    void onRoomStateUpdate(const std::string &roomID, ZegoRoomState state, int errorCode,
                           const std::string &extendedData) override;

    void onRoomStateChanged(const std::string &roomID, ZegoRoomStateChangedReason reason,
                            int errorCode, const std::string &extendedData) override;

    void onRoomUserUpdate(const std::string &roomID, ZegoUpdateType updateType,
                          const std::vector<ZegoUser> &userList) override;

    void onRoomOnlineUserCountUpdate(const std::string &roomID, int count) override;

    void onRoomStreamUpdate(const std::string &roomID, ZegoUpdateType updateType,
                            const std::vector<ZegoStream> &streamList,
                            const std::string &extendedData) override;

    void onRoomStreamExtraInfoUpdate(const std::string &roomID,
                                     const std::vector<ZegoStream> &streamList) override;

    void onRoomExtraInfoUpdate(const std::string &roomID,
                               const std::vector<ZegoRoomExtraInfo> &roomExtraInfoList) override;

    void onRoomTokenWillExpire(const std::string &roomID, int remainTimeInSecond) override;

    void onPublisherStateUpdate(const std::string &streamID, ZegoPublisherState state,
                                int errorCode, const std::string &extendedData) override;

    void onPublisherQualityUpdate(const std::string &streamID,
                                  const ZegoPublishStreamQuality &quality) override;

    void onPublisherCapturedAudioFirstFrame() override;

    void onPublisherCapturedVideoFirstFrame(ZegoPublishChannel channel) override;

    void onPublisherRenderVideoFirstFrame(ZegoPublishChannel channel) override;

    void onPublisherVideoSizeChanged(int width, int height, ZegoPublishChannel channel) override;

    void
    onPublisherRelayCDNStateUpdate(const std::string &streamID,
                                   const std::vector<ZegoStreamRelayCDNInfo> &infoList) override;

    void onPublisherVideoEncoderChanged(ZegoVideoCodecID fromCodecID, ZegoVideoCodecID toCodecID,
                                        ZegoPublishChannel channel) override;

    void onPublisherStreamEvent(ZegoStreamEvent eventID, const std::string &streamID,
                                const std::string &extraInfo) override;

    void onPlayerStateUpdate(const std::string &streamID, ZegoPlayerState state, int errorCode,
                             const std::string &extendedData) override;

    void onPlayerQualityUpdate(const std::string &streamID,
                               const ZegoPlayStreamQuality &quality) override;

    void onPlayerMediaEvent(const std::string &streamID, ZegoPlayerMediaEvent event) override;

    void onPlayerRecvAudioFirstFrame(const std::string &streamID) override;

    void onPlayerRecvVideoFirstFrame(const std::string &streamID) override;

    void onPlayerRenderVideoFirstFrame(const std::string &streamID) override;

    void onPlayerRenderCameraVideoFirstFrame(const std::string &streamID) override;

    void onPlayerVideoSizeChanged(const std::string &streamID, int width, int height) override;

    void onPlayerRecvSEI(const std::string &streamID, const unsigned char *data,
                         unsigned int dataLength) override;

    void onPlayerRecvAudioSideInfo(const std::string &streamID, const unsigned char *data,
                                   unsigned int dataLength) override;

    void onPlayerLowFpsWarning(ZegoVideoCodecID codecID, const std::string &streamID) override;

    void onPlayerStreamEvent(ZegoStreamEvent eventID, const std::string &streamID,
                             const std::string &extraInfo) override;

#if TARGET_OS_IPHONE || defined(ANDROID)
    void onPlayerVideoSuperResolutionUpdate(const std::string &streamID,
                                            ZegoSuperResolutionState state, int errorCode) override;
#endif

    void onAudioDeviceStateChanged(ZegoUpdateType updateType, ZegoAudioDeviceType deviceType,
                                   const ZegoDeviceInfo &deviceInfo) override;

    void onAudioDeviceVolumeChanged(ZegoAudioDeviceType deviceType, const std::string &deviceID,
                                    int volume) override;

    void onVideoDeviceStateChanged(ZegoUpdateType updateType,
                                   const ZegoDeviceInfo &deviceInfo) override;

    void onCapturedSoundLevelInfoUpdate(const ZegoSoundLevelInfo &soundLevelInfo) override;

    void onRemoteSoundLevelInfoUpdate(
        const std::unordered_map<std::string, ZegoSoundLevelInfo> &soundLevelInfos) override;

    void onCapturedAudioSpectrumUpdate(const ZegoAudioSpectrum &audioSpectrum) override;

    void onRemoteAudioSpectrumUpdate(
        const std::unordered_map<std::string, ZegoAudioSpectrum> &audioSpectrums) override;

    void onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType,
                                        ZegoDeviceType deviceType,
                                        const std::string &deviceID) override;

    void onRemoteCameraStateUpdate(const std::string &streamID,
                                   ZegoRemoteDeviceState state) override;

    void onRemoteMicStateUpdate(const std::string &streamID, ZegoRemoteDeviceState state) override;

    void onRemoteSpeakerStateUpdate(const std::string &streamID,
                                    ZegoRemoteDeviceState state) override;

#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    void onAudioRouteChange(ZegoAudioRoute audioRoute) override;
#endif

    void onAudioVADStateUpdate(ZegoAudioVADStableStateMonitorType type,
                               ZegoAudioVADType state) override;
};

} // namespace zego::cocos
