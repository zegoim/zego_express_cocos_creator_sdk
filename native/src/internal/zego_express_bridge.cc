//
//  zego_express_bridge.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "zego_express_bridge.h"
#include "zego_express_event_handler.h"
#include "zego_texture_renderer_controller.h"
#include "zego_utils.h"

namespace zego::cocos {

ZegoExpressBridge::ZegoExpressBridge() {
#if defined(ANDROID)
    ZegoExpressSDK::setAndroidEnv(cc::JniHelper::getJavaVM(), cc::JniHelper::getActivity());
#endif
}

void ZegoExpressBridge::setJsTextureRendererController(const se::Value &js_controller) { // NOLINT
    auto controller = ZegoTextureRendererController::GetInstance();
    controller->SetJsController(js_controller);
}

#pragma mark - Main module

void ZegoExpressBridge::createEngine(unsigned int appID, const std::string &appSign, int scenario) {
    auto profile = ZegoEngineProfile{};
    profile.appID = appID;
    profile.appSign = appSign;
    profile.scenario = ZegoScenario(scenario);
    native_engine_ = ZegoExpressSDK::createEngine(profile, ZegoExpressEventHandler::GetInstance());

    ZegoCustomVideoRenderConfig render_config{};
    render_config.bufferType = ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA;
    render_config.frameFormatSeries = ZEGO_VIDEO_FRAME_FORMAT_SERIES_RGB;
    native_engine_->enableCustomVideoRender(true, &render_config);
    native_engine_->setCustomVideoRenderHandler(ZegoTextureRendererController::GetInstance());
}

void ZegoExpressBridge::destroyEngine(const se::Value &callback) {
    if (!native_engine_) {
        return;
    }
    ZegoExpressSDK::destroyEngine(native_engine_, [callback]() {
        RunOnCocosThread([callback]() {
            se::AutoHandleScope hs;
            if (!callback.isObject() || !callback.toObject()->isFunction()) {
                return;
            }
            sebind::callFunction<void>(callback, 0);
        });
    });
    native_engine_ = nullptr;
}

void ZegoExpressBridge::setEngineConfig(const se::Value &advancedConfig) { // NOLINT
    std::unordered_map<std::string, std::string> map;
    sevalue_to_native(advancedConfig, &map);

    auto engineConfig = ZegoEngineConfig{};
    engineConfig.advancedConfig = map;
    ZegoExpressSDK::setEngineConfig(engineConfig);
}

void ZegoExpressBridge::setLogConfig(const std::string &logPath, uint64_t logSize) { // NOLINT
    auto logConfig = ZegoLogConfig{};
    logConfig.logPath = logPath;
    logConfig.logSize = logSize;
    ZegoExpressSDK::setLogConfig(logConfig);
}

void ZegoExpressBridge::setRoomMode(int mode) { // NOLINT
    ZegoExpressSDK::setRoomMode(ZegoRoomMode(mode));
}

std::string ZegoExpressBridge::getVersion() { // NOLINT
    return ZegoExpressSDK::getVersion();
}

void ZegoExpressBridge::setApiCalledCallback(const se::Value &callback) { // NOLINT
    se::AutoHandleScope hs;
    if (callback.isObject()) {
        ZegoExpressSDK::setApiCalledCallback(ZegoExpressEventHandler::GetInstance());
        ZegoExpressEventHandler::GetInstance()->SetJsApiCalledCallback(callback);
    } else {
        // Clear the callback handler when developers set it to "undefind" or "null"
        ZegoExpressEventHandler::GetInstance()->ClearJsApiCalledCallback();
        ZegoExpressSDK::setApiCalledCallback(nullptr);
    }
}

bool ZegoExpressBridge::isFeatureSupported(int featureType) { // NOLINT
    return ZegoExpressSDK::isFeatureSupported(ZegoFeatureType(featureType));
}

void ZegoExpressBridge::setEventHandler(const se::Value &handler) { // NOLINT
    se::AutoHandleScope hs;
    if (handler.isObject()) {
        ZegoExpressEventHandler::GetInstance()->SetJsEventHandler(handler);
    } else {
        // Clear the callback handler when developers set it to "undefined" or "null"
        ZegoExpressEventHandler::GetInstance()->ClearJsEventHandler();
    }
}

void ZegoExpressBridge::setRoomScenario(int scenario) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setRoomScenario(ZegoScenario(scenario));
}

void ZegoExpressBridge::uploadLog(const se::Value &callback) {
    if (!native_engine_) {
        return;
    }
    native_engine_->uploadLog([callback](int errorCode) {
        RunOnCocosThread([callback]() {
            se::AutoHandleScope hs;
            if (!callback.isObject() || !callback.toObject()->isFunction()) {
                return;
            }
            sebind::callFunction<void>(callback, 0);
        });
    });
}

void ZegoExpressBridge::enableDebugAssistant(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableDebugAssistant(enable);
}

std::string ZegoExpressBridge::callExperimentalAPI(const std::string &params) {
    if (!native_engine_) {
        return "";
    }
    return native_engine_->callExperimentalAPI(params);
}

#pragma mark - Room module

void ZegoExpressBridge::loginRoom(const std::string &roomID, const std::string &userID,
                                  const std::string &userName, unsigned int maxMemberCount,
                                  bool isUserStatusNotify, const std::string &token,
                                  const se::Value &callback) {
    if (!native_engine_) {
        return;
    }
    ZegoRoomConfig room_config{};
    room_config.maxMemberCount = maxMemberCount;
    room_config.isUserStatusNotify = isUserStatusNotify;
    room_config.token = token;

    auto job = [callback](int errorCode, const std::string &extendedData) {
        RunOnCocosThread([callback, errorCode, extendedData]() {
            se::AutoHandleScope hs;
            if (!callback.isObject() || !callback.toObject()->isFunction()) {
                return;
            }
            sebind::callFunction<void>(callback, errorCode, extendedData);
        });
    };

    native_engine_->loginRoom(roomID, ZegoUser(userID, userName), room_config, job);
}

void ZegoExpressBridge::logoutRoom(const std::string &roomID, const se::Value &callback) {
    if (!native_engine_) {
        return;
    }

    auto job = [callback](int errorCode, const std::string &extendedData) {
        RunOnCocosThread([callback, errorCode, extendedData]() {
            se::AutoHandleScope hs;
            if (!callback.isObject() || !callback.toObject()->isFunction()) {
                return;
            }
            sebind::callFunction<void>(callback, errorCode, extendedData);
        });
    };

    if (roomID.empty()) {
        native_engine_->logoutRoom(job);
    } else {
        native_engine_->logoutRoom(roomID, job);
    }
}

void ZegoExpressBridge::switchRoom(const std::string &fromRoomID, const std::string &toRoomID,
                                   int maxMemberCount, bool isUserStatusNotify,
                                   const std::string &token) {
    if (!native_engine_) {
        return;
    }
    ZegoRoomConfig room_config{};
    room_config.maxMemberCount = maxMemberCount;
    room_config.isUserStatusNotify = isUserStatusNotify;
    room_config.token = token;

    native_engine_->switchRoom(fromRoomID, toRoomID, &room_config);
}

void ZegoExpressBridge::renewToken(const std::string &roomID, const std::string &token) {
    if (!native_engine_) {
        return;
    }

    native_engine_->renewToken(roomID, token);
}

void ZegoExpressBridge::setRoomExtraInfo(const std::string &roomID, const std::string &key,
                                         const std::string &value, const se::Value &callback) {
    if (!native_engine_) {
        return;
    }

    auto job = [callback](int errorCode) {
        RunOnCocosThread([callback, errorCode]() {
            se::AutoHandleScope hs;
            if (!callback.isObject() || !callback.toObject()->isFunction()) {
                return;
            }
            sebind::callFunction<void>(callback, errorCode);
        });
    };

    native_engine_->setRoomExtraInfo(roomID, key, value, job);
}

#pragma mark - Publisher module

void ZegoExpressBridge::startPublishingStream(const std::string &streamID,
                                              const std::string &roomID,
                                              int forceSynchronousNetworkTime,
                                              int streamCensorshipMode, int channel) {
    if (!native_engine_) {
        return;
    }
    auto config = ZegoPublisherConfig{};
    config.roomID = roomID;
    config.forceSynchronousNetworkTime = forceSynchronousNetworkTime;
    config.streamCensorshipMode = ZegoStreamCensorshipMode(streamCensorshipMode);
    native_engine_->startPublishingStream(streamID, config, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::stopPublishingStream(int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPublishingStream(ZegoPublishChannel(channel));
}

void ZegoExpressBridge::setStreamExtraInfo(const std::string &extraInfo, int channel,
                                           const se::Value &callback) {
    if (!native_engine_) {
        return;
    }

    auto job = [callback](int errorCode) {
        RunOnCocosThread([callback, errorCode]() {
            se::AutoHandleScope hs;
            if (!callback.isObject() || !callback.toObject()->isFunction()) {
                return;
            }
            sebind::callFunction<void>(callback, errorCode);
        });
    };

    native_engine_->setStreamExtraInfo(extraInfo, job, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::startPreview(int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startPreview(nullptr, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::stopPreview(int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPreview(ZegoPublishChannel(channel));
}

void ZegoExpressBridge::setVideoConfig(int captureWidth, int captureHeight, int encodeWidth,
                                       int encodeHeight, int fps, int bitrate, int codecID,
                                       int keyFrameInterval, int channel) {
    if (!native_engine_) {
        return;
    }
    auto config = ZegoVideoConfig{};
    config.captureWidth = captureWidth;
    config.captureHeight = captureHeight;
    config.encodeWidth = encodeWidth;
    config.encodeHeight = encodeHeight;
    config.fps = fps;
    config.bitrate = bitrate;
    config.codecID = ZegoVideoCodecID(codecID);
    config.keyFrameInterval = keyFrameInterval;
    native_engine_->setVideoConfig(config, ZegoPublishChannel(channel));
}

se::Object *ZegoExpressBridge::getVideoConfig(int channel) {
    if (!native_engine_) {
        return se::Object::createPlainObject();
    }
    auto config = native_engine_->getVideoConfig(ZegoPublishChannel(channel));
    auto jsConfig = se::Object::createPlainObject();
    jsConfig->setProperty("captureWidth", se::Value(config.captureWidth));
    jsConfig->setProperty("captureHeight", se::Value(config.captureHeight));
    jsConfig->setProperty("encodeWidth", se::Value(config.encodeWidth));
    jsConfig->setProperty("encodeHeight", se::Value(config.encodeHeight));
    jsConfig->setProperty("fps", se::Value(config.fps));
    jsConfig->setProperty("bitrate", se::Value(config.bitrate));
    jsConfig->setProperty("codecID", se::Value(config.codecID));
    jsConfig->setProperty("keyFrameInterval", se::Value(config.keyFrameInterval));
    return jsConfig;
}

void ZegoExpressBridge::setAppOrientation(int orientation, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setAppOrientation(ZegoOrientation(orientation), ZegoPublishChannel(channel));
#endif
}

void ZegoExpressBridge::setAudioConfig(int bitrate, int audioChannel, int codecID, int channel) {
    if (!native_engine_) {
        return;
    }
    auto config = ZegoAudioConfig{};
    config.bitrate = bitrate;
    config.channel = ZegoAudioChannel(audioChannel);
    config.codecID = ZegoAudioCodecID(codecID);
    native_engine_->setAudioConfig(config, ZegoPublishChannel(channel));
}

se::Object *ZegoExpressBridge::getAudioConfig(int channel) {
    if (!native_engine_) {
        return se::Object::createPlainObject();
    }
    auto config = native_engine_->getAudioConfig(ZegoPublishChannel(channel));
    auto jsConfig = se::Object::createPlainObject();
    jsConfig->setProperty("bitrate", se::Value(config.bitrate));
    jsConfig->setProperty("channel", se::Value(config.channel));
    jsConfig->setProperty("codecID", se::Value(config.codecID));
    return jsConfig;
}

void ZegoExpressBridge::setPublishStreamEncryptionKey(const std::string &key, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setPublishStreamEncryptionKey(key, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::mutePublishStreamAudio(bool mute, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->mutePublishStreamAudio(mute, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::mutePublishStreamVideo(bool mute, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->mutePublishStreamVideo(mute, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::enableTrafficControl(bool enable, int property, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableTrafficControl(enable, property, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::setMinVideoBitrateForTrafficControl(int bitrate, int mode, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setMinVideoBitrateForTrafficControl(
        bitrate, ZegoTrafficControlMinVideoBitrateMode(mode), ZegoPublishChannel(channel));
}

void ZegoExpressBridge::setMinVideoFpsForTrafficControl(int fps, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setMinVideoFpsForTrafficControl(fps, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::setMinVideoResolutionForTrafficControl(int width, int height, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setMinVideoResolutionForTrafficControl(width, height,
                                                           ZegoPublishChannel(channel));
}

void ZegoExpressBridge::setCaptureVolume(int volume) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setCaptureVolume(volume);
}

void ZegoExpressBridge::enableHardwareEncoder(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableHardwareEncoder(enable);
}

void ZegoExpressBridge::setCapturePipelineScaleMode(int mode) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setCapturePipelineScaleMode(ZegoCapturePipelineScaleMode(mode));
}

bool ZegoExpressBridge::isVideoEncoderSupported(int codecID) {
    if (!native_engine_) {
        return false;
    }
    return native_engine_->isVideoEncoderSupported(ZegoVideoCodecID(codecID));
}

void ZegoExpressBridge::setAppOrientationMode(int mode) {
    if (!native_engine_) {
        return;
    }
    // TODO: Use express standard c++ api
    zego_express_set_app_orientation_mode(zego_orientation_mode(mode));
}

#pragma mark - Player module

void ZegoExpressBridge::startPlayingStream(const std::string &streamID, const se::Value &config) {
    if (!native_engine_) {
        return;
    }

    if (!config.isObject()) {
        native_engine_->startPlayingStream(streamID);
    } else {
        auto playerConfig = ZegoPlayerConfig{};

        se::Value js_resource_mode;
        if (config.toObject()->getProperty("resourceMode", &js_resource_mode) &&
            js_resource_mode.isNumber()) {
            playerConfig.resourceMode = ZegoStreamResourceMode(js_resource_mode.toInt32());
        }

        se::Value js_cdn_config;
        if (config.toObject()->getProperty("cdnConfig", &js_cdn_config)) {
            if (js_cdn_config.isObject()) {
                auto cdnConfig = ZegoCDNConfig{};
                se::Value js_url, js_auth_param, js_protocol, js_quic_version;
                if (js_cdn_config.toObject()->getProperty("url", &js_url) && js_url.isString()) {
                    cdnConfig.url = js_url.toString();
                }
                if (js_cdn_config.toObject()->getProperty("authParam", &js_auth_param) &&
                    js_auth_param.isString()) {
                    cdnConfig.authParam = js_auth_param.toString();
                }
                if (js_cdn_config.toObject()->getProperty("protocol", &js_protocol) &&
                    js_protocol.isString()) {
                    cdnConfig.protocol = js_protocol.toString();
                }
                if (js_cdn_config.toObject()->getProperty("quicVersion", &js_quic_version) &&
                    js_quic_version.isString()) {
                    cdnConfig.quicVersion = js_quic_version.toString();
                }
            }
        }

        se::Value js_video_layer;
        if (config.toObject()->getProperty("videoLayer", &js_video_layer) &&
            js_video_layer.isNumber()) {
            playerConfig.videoLayer = ZegoPlayerVideoLayer(js_video_layer.toInt32());
        }

        se::Value js_room_id;
        if (config.toObject()->getProperty("roomID", &js_room_id) && js_room_id.isString()) {
            playerConfig.roomID = js_room_id.toString();
        }

        se::Value js_video_codec_id;
        if (config.toObject()->getProperty("videoCodecID", &js_video_codec_id) &&
            js_video_codec_id.isNumber()) {
            playerConfig.videoCodecID = ZegoVideoCodecID(js_video_codec_id.toInt32());
        }

        se::Value js_source_resourceType;
        if (config.toObject()->getProperty("sourceResourceType", &js_source_resourceType) &&
            js_source_resourceType.isNumber()) {
            playerConfig.sourceResourceType = ZegoResourceType(js_source_resourceType.toInt32());
        }

        se::Value js_codec_template_id;
        if (config.toObject()->getProperty("codecTemplateID", &js_codec_template_id) &&
            js_codec_template_id.isNumber()) {
            playerConfig.codecTemplateID = js_codec_template_id.toInt32();
        }

        native_engine_->startPlayingStream(streamID, playerConfig);
    }
}

void ZegoExpressBridge::stopPlayingStream(const std::string &streamID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPlayingStream(streamID);
}

void ZegoExpressBridge::setPlayStreamDecryptionKey(const std::string &streamID,
                                                   const std::string &key) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setPlayStreamDecryptionKey(streamID, key);
}

void ZegoExpressBridge::setPlayVolume(const std::string &streamID, int volume) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setPlayVolume(streamID, volume);
}

void ZegoExpressBridge::setAllPlayStreamVolume(int volume) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setAllPlayStreamVolume(volume);
}

void ZegoExpressBridge::setPlayStreamVideoType(const std::string &streamID, int streamType) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setPlayStreamVideoType(streamID, ZegoVideoStreamType(streamType));
}

void ZegoExpressBridge::setPlayStreamBufferIntervalRange(const std::string &streamID,
                                                         int minBufferInterval,
                                                         int maxBufferInterval) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setPlayStreamBufferIntervalRange(streamID, minBufferInterval,
                                                     maxBufferInterval);
}

void ZegoExpressBridge::setPlayStreamFocusOn(const std::string &streamID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setPlayStreamFocusOn(streamID);
}

void ZegoExpressBridge::mutePlayStreamAudio(const std::string &streamID, bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->mutePlayStreamAudio(streamID, mute);
}

void ZegoExpressBridge::mutePlayStreamVideo(const std::string &streamID, bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->mutePlayStreamVideo(streamID, mute);
}

void ZegoExpressBridge::muteAllPlayStreamAudio(bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->muteAllPlayStreamAudio(mute);
}

void ZegoExpressBridge::muteAllPlayStreamVideo(bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->muteAllPlayStreamVideo(mute);
}

void ZegoExpressBridge::enableHardwareDecoder(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableHardwareDecoder(enable);
}

void ZegoExpressBridge::enableCheckPoc(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableCheckPoc(enable);
}

bool ZegoExpressBridge::isVideoDecoderSupported(int codecID) {
    if (!native_engine_) {
        return false;
    }
    return native_engine_->isVideoDecoderSupported(ZegoVideoCodecID(codecID));
}

#pragma mark - Device module

void ZegoExpressBridge::muteMicrophone(bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->muteMicrophone(mute);
}

bool ZegoExpressBridge::isMicrophoneMuted() {
    if (!native_engine_) {
        return false;
    }
    return native_engine_->isMicrophoneMuted();
}

void ZegoExpressBridge::muteSpeaker(bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->muteSpeaker(mute);
}

bool ZegoExpressBridge::isSpeakerMuted() {
    if (!native_engine_) {
        return false;
    }
    return native_engine_->isSpeakerMuted();
}

ccstd::vector<se::Object *> ZegoExpressBridge::getAudioDeviceList(int deviceType) {
    if (!native_engine_) {
        return {};
    }
    auto list = native_engine_->getAudioDeviceList(ZegoAudioDeviceType(deviceType));
    auto se_list = ccstd::vector<se::Object *>();
    for (auto &item : list) {
        auto se_item = se::Object::createPlainObject();
        se_item->setProperty("deviceID", se::Value(item.deviceID));
        se_item->setProperty("deviceName", se::Value(item.deviceName));
        se_list.push_back(se_item);
    }
    return se_list;
}

std::string ZegoExpressBridge::getDefaultAudioDeviceID(int deviceType) {
    if (!native_engine_) {
        return "";
    }
    return native_engine_->getDefaultAudioDeviceID(ZegoAudioDeviceType(deviceType));
}

void ZegoExpressBridge::useAudioDevice(int deviceType, const std::string &deviceID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->useAudioDevice(ZegoAudioDeviceType(deviceType), deviceID);
}

int ZegoExpressBridge::getAudioDeviceVolume(int deviceType, const std::string &deviceID) {
    if (!native_engine_) {
        return 0;
    }
    return native_engine_->getAudioDeviceVolume(ZegoAudioDeviceType(deviceType), deviceID);
}

void ZegoExpressBridge::setAudioDeviceVolume(int deviceType, const std::string &deviceID,
                                             int volume) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setAudioDeviceVolume(ZegoAudioDeviceType(deviceType), deviceID, volume);
}

void ZegoExpressBridge::startAudioDeviceVolumeMonitor(int deviceType, const std::string &deviceID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startAudioDeviceVolumeMonitor(ZegoAudioDeviceType(deviceType), deviceID);
}

void ZegoExpressBridge::stopAudioDeviceVolumeMonitor(int deviceType, const std::string &deviceID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopAudioDeviceVolumeMonitor(ZegoAudioDeviceType(deviceType), deviceID);
}

void ZegoExpressBridge::muteAudioDevice(int deviceType, const std::string &deviceID, bool mute) {
    if (!native_engine_) {
        return;
    }
    native_engine_->muteAudioDevice(ZegoAudioDeviceType(deviceType), deviceID, mute);
}

void ZegoExpressBridge::setAudioDeviceMode(int deviceMode) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setAudioDeviceMode(ZegoAudioDeviceMode(deviceMode));
#endif
}

bool ZegoExpressBridge::isAudioDeviceMuted(int deviceType, const std::string &deviceID) {
    if (!native_engine_) {
        return false;
    }
    return native_engine_->isAudioDeviceMuted(ZegoAudioDeviceType(deviceType), deviceID);
}

void ZegoExpressBridge::enableAudioCaptureDevice(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableAudioCaptureDevice(enable);
}

int ZegoExpressBridge::getAudioRouteType() {
    if (!native_engine_) {
        return 0;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    return native_engine_->getAudioRouteType();
#else
    return 0;
#endif
}

void ZegoExpressBridge::setAudioRouteToSpeaker(bool defaultToSpeaker) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setAudioRouteToSpeaker(defaultToSpeaker);
#endif
}

void ZegoExpressBridge::enableCamera(bool enable, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableCamera(enable, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::useFrontCamera(bool enable, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->useFrontCamera(enable, ZegoPublishChannel(channel));
#endif
}

bool ZegoExpressBridge::isCameraFocusSupported(int channel) {
    if (!native_engine_) {
        return false;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    return native_engine_->isCameraFocusSupported(ZegoPublishChannel(channel));
#else
    return false;
#endif
}

void ZegoExpressBridge::setCameraFocusMode(int mode, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setCameraFocusMode(ZegoCameraFocusMode(mode), ZegoPublishChannel(channel));
#endif
}

void ZegoExpressBridge::setCameraFocusPointInPreview(float x, float y, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setCameraFocusPointInPreview(x, y, ZegoPublishChannel(channel));
#endif
}

void ZegoExpressBridge::setCameraExposureMode(int mode, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setCameraExposureMode(ZegoCameraExposureMode(mode),
                                          ZegoPublishChannel(channel));
#endif
}

void ZegoExpressBridge::setCameraExposurePointInPreview(float x, float y, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setCameraExposurePointInPreview(x, y, ZegoPublishChannel(channel));
#endif
}

void ZegoExpressBridge::setCameraExposureCompensation(float value, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setCameraExposureCompensation(value, ZegoPublishChannel(channel));
#endif
}

void ZegoExpressBridge::setCameraZoomFactor(float factor, int channel) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->setCameraZoomFactor(factor, ZegoPublishChannel(channel));
#endif
}

float ZegoExpressBridge::getCameraMaxZoomFactor(int channel) {
    if (!native_engine_) {
        return 0;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    return native_engine_->getCameraMaxZoomFactor(ZegoPublishChannel(channel));
#else
    return 0;
#endif
}

void ZegoExpressBridge::enableCameraAdaptiveFPS(bool enable, int minFPS, int maxFPS, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableCameraAdaptiveFPS(enable, minFPS, maxFPS, ZegoPublishChannel(channel));
}

void ZegoExpressBridge::useVideoDevice(const std::string &deviceID, int channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->useVideoDevice(deviceID, ZegoPublishChannel(channel));
}

ccstd::vector<se::Object *> ZegoExpressBridge::getVideoDeviceList() {
    if (!native_engine_) {
        return {};
    }
    auto list = native_engine_->getVideoDeviceList();
    auto se_list = ccstd::vector<se::Object *>();
    for (auto &item : list) {
        auto se_item = se::Object::createPlainObject();
        se_item->setProperty("deviceID", se::Value(item.deviceID));
        se_item->setProperty("deviceName", se::Value(item.deviceName));
        se_list.push_back(se_item);
    }
    return se_list;
}

std::string ZegoExpressBridge::getDefaultVideoDeviceID() {
    if (!native_engine_) {
        return "";
    }
    return native_engine_->getDefaultVideoDeviceID();
}

void ZegoExpressBridge::startSoundLevelMonitor(int millisecond, bool enableVAD) {
    if (!native_engine_) {
        return;
    }
    auto config = ZegoSoundLevelConfig{};
    config.millisecond = millisecond;
    config.enableVAD = enableVAD;
    native_engine_->startSoundLevelMonitor(config);
}

void ZegoExpressBridge::stopSoundLevelMonitor() {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopSoundLevelMonitor();
}

void ZegoExpressBridge::startAudioSpectrumMonitor(int millisecond) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startAudioSpectrumMonitor(millisecond);
}

void ZegoExpressBridge::stopAudioSpectrumMonitor() {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopAudioSpectrumMonitor();
}

void ZegoExpressBridge::enableHeadphoneMonitor(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableHeadphoneMonitor(enable);
}

void ZegoExpressBridge::setHeadphoneMonitorVolume(int volume) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setHeadphoneMonitorVolume(volume);
}

void ZegoExpressBridge::enableMixSystemPlayout(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableMixSystemPlayout(enable);
}

void ZegoExpressBridge::setMixSystemPlayoutVolume(int volume) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setMixSystemPlayoutVolume(volume);
}

void ZegoExpressBridge::enableMixEnginePlayout(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableMixEnginePlayout(enable);
}

void ZegoExpressBridge::startAudioVADStableStateMonitor(int type, int millisecond) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startAudioVADStableStateMonitor(ZegoAudioVADStableStateMonitorType(type),
                                                    millisecond);
}

void ZegoExpressBridge::stopAudioVADStableStateMonitor(int type) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopAudioVADStableStateMonitor(ZegoAudioVADStableStateMonitorType(type));
}

se::Object *ZegoExpressBridge::getCurrentAudioDevice(int deviceType) {
    if (!native_engine_) {
        return se::Object::createPlainObject();
    }
    auto device = native_engine_->getCurrentAudioDevice(ZegoAudioDeviceType(deviceType));
    auto se_device = se::Object::createPlainObject();
    se_device->setProperty("deviceID", se::Value(device.deviceID));
    se_device->setProperty("deviceName", se::Value(device.deviceName));
    return se_device;
}

void ZegoExpressBridge::enableAEC(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableAEC(enable);
}

void ZegoExpressBridge::enableHeadphoneAEC(bool enable) {
    if (!native_engine_) {
        return;
    }
#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
    native_engine_->enableHeadphoneAEC(enable);
#endif
}

void ZegoExpressBridge::setAECMode(int mode) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setAECMode(ZegoAECMode(mode));
}

void ZegoExpressBridge::enableAGC(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableAGC(enable);
}

void ZegoExpressBridge::enableANS(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableANS(enable);
}

void ZegoExpressBridge::enableTransientANS(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableTransientANS(enable);
}

void ZegoExpressBridge::setANSMode(int mode) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setANSMode(ZegoANSMode(mode));
}

void ZegoExpressBridge::startEffectsEnv() {
    if (!native_engine_) {
        return;
    }
    native_engine_->startEffectsEnv();
}

void ZegoExpressBridge::stopEffectsEnv() {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopEffectsEnv();
}

void ZegoExpressBridge::enableEffectsBeauty(bool enable) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableEffectsBeauty(enable);
}

void ZegoExpressBridge::setEffectsBeautyParam(const se::Value &param) {
    if (!native_engine_) {
        return;
    }
    auto beauty_param = ZegoEffectsBeautyParam{};
    se::Value js_whiten, js_rosy, js_smooth, js_sharpen;
    if (param.toObject()->getProperty("whitenIntensity", &js_whiten) && js_whiten.isNumber()) {
        beauty_param.whitenIntensity = js_whiten.toInt32();
    }
    if (param.toObject()->getProperty("rosyIntensity", &js_rosy) && js_rosy.isNumber()) {
        beauty_param.rosyIntensity = js_rosy.toInt32();
    }
    if (param.toObject()->getProperty("smoothIntensity", &js_smooth) && js_smooth.isNumber()) {
        beauty_param.smoothIntensity = js_smooth.toInt32();
    }
    if (param.toObject()->getProperty("sharpenIntensity", &js_sharpen) && js_sharpen.isNumber()) {
        beauty_param.sharpenIntensity = js_sharpen.toInt32();
    }
    native_engine_->setEffectsBeautyParam(beauty_param);
}

void ZegoExpressBridge::setAudioEqualizerGain(int bandIndex, float bandGain) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setAudioEqualizerGain(bandIndex, bandGain);
}

void ZegoExpressBridge::setVoiceChangerPreset(int preset) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setVoiceChangerPreset(ZegoVoiceChangerPreset(preset));
}

void ZegoExpressBridge::setVoiceChangerParam(const se::Value &param) {
    if (!native_engine_) {
        return;
    }
    auto voice_changer_param = ZegoVoiceChangerParam{};
    se::Value js_pitch;
    if (param.toObject()->getProperty("pitch", &js_pitch) && js_pitch.isNumber()) {
        voice_changer_param.pitch = js_pitch.toFloat();
    }
    native_engine_->setVoiceChangerParam(voice_changer_param);
}

void ZegoExpressBridge::setReverbPreset(int preset) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setReverbPreset(ZegoReverbPreset(preset));
}

void ZegoExpressBridge::setReverbAdvancedParam(const se::Value &param) {
    if (!native_engine_) {
        return;
    }
    auto reverb_param = ZegoReverbAdvancedParam{};
    se::Value js_room_size, js_reverberance, js_damping, js_wet_only, js_wet_gain, js_dry_gain,
        js_tone_low, js_tone_high, js_pre_delay, js_stereo_width;
    if (param.toObject()->getProperty("roomSize", &js_room_size) && js_room_size.isNumber()) {
        reverb_param.roomSize = js_room_size.toFloat();
    }
    if (param.toObject()->getProperty("reverberance", &js_reverberance) &&
        js_reverberance.isNumber()) {
        reverb_param.reverberance = js_reverberance.toFloat();
    }
    if (param.toObject()->getProperty("damping", &js_damping) && js_damping.isNumber()) {
        reverb_param.damping = js_damping.toFloat();
    }
    if (param.toObject()->getProperty("wetOnly", &js_wet_only) && js_wet_only.isBoolean()) {
        reverb_param.wetOnly = js_wet_only.toBoolean();
    }
    if (param.toObject()->getProperty("wetGain", &js_wet_gain) && js_wet_gain.isNumber()) {
        reverb_param.wetGain = js_wet_gain.toFloat();
    }
    if (param.toObject()->getProperty("dryGain", &js_dry_gain) && js_dry_gain.isNumber()) {
        reverb_param.dryGain = js_dry_gain.toFloat();
    }
    if (param.toObject()->getProperty("toneLow", &js_tone_low) && js_tone_low.isNumber()) {
        reverb_param.toneLow = js_tone_low.toFloat();
    }
    if (param.toObject()->getProperty("toneHigh", &js_tone_high) && js_tone_high.isNumber()) {
        reverb_param.toneHigh = js_tone_high.toFloat();
    }
    if (param.toObject()->getProperty("preDelay", &js_pre_delay) && js_pre_delay.isNumber()) {
        reverb_param.preDelay = js_pre_delay.toFloat();
    }
    if (param.toObject()->getProperty("stereoWidth", &js_stereo_width) &&
        js_stereo_width.isNumber()) {
        reverb_param.stereoWidth = js_stereo_width.toFloat();
    }
    native_engine_->setReverbAdvancedParam(reverb_param);
}

void ZegoExpressBridge::setReverbEchoParam(const se::Value &param) {
    if (!native_engine_) {
        return;
    }
    auto echo_param = ZegoReverbEchoParam{};
    se::Value js_in_gain, js_out_gain, js_num_delays, js_delay, js_decay;
    if (param.toObject()->getProperty("inGain", &js_in_gain) && js_in_gain.isNumber()) {
        echo_param.inGain = js_in_gain.toFloat();
    }
    if (param.toObject()->getProperty("outGain", &js_out_gain) && js_out_gain.isNumber()) {
        echo_param.outGain = js_out_gain.toFloat();
    }
    if (param.toObject()->getProperty("numDelays", &js_num_delays) && js_num_delays.isNumber()) {
        echo_param.numDelays = js_num_delays.toInt32();
    }
    if (param.toObject()->getProperty("delay", &js_delay) && js_delay.isObject() &&
        js_delay.toObject()->isArray()) {
        auto delay = ccstd::vector<int>();
        sevalue_to_native(js_delay, &delay);
        for (int i = 0; i < delay.size(); i++) {
            echo_param.delay[i] = delay[i];
        }
    }
    if (param.toObject()->getProperty("decay", &js_decay) && js_decay.isObject() &&
        js_decay.toObject()->isArray()) {
        auto decay = ccstd::vector<float>();
        sevalue_to_native(js_decay, &decay);
        for (int i = 0; i < decay.size(); i++) {
            echo_param.decay[i] = decay[i];
        }
    }
    native_engine_->setReverbEchoParam(echo_param);
}

void ZegoExpressBridge::enableVirtualStereo(bool enable, int angle) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enableVirtualStereo(enable, angle);
}

void ZegoExpressBridge::enablePlayStreamVirtualStereo(bool enable, int angle,
                                                      const std::string &streamID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->enablePlayStreamVirtualStereo(enable, angle, streamID);
}

void ZegoExpressBridge::setElectronicEffects(bool enable, int mode, int tonal) {
    if (!native_engine_) {
        return;
    }
    native_engine_->setElectronicEffects(enable, ZegoElectronicEffectsMode(mode), tonal);
}

void ZegoExpressBridge::startPerformanceMonitor(unsigned int millisecond) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startPerformanceMonitor(millisecond);
}

void ZegoExpressBridge::stopPerformanceMonitor() {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPerformanceMonitor();
}

} // namespace zego::cocos
