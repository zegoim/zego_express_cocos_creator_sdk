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

void ZegoExpressBridge::setJsTextureRendererController(const se::Value &js_controller) {
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

    ZegoCustomVideoRenderConfig render_config;
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

void ZegoExpressBridge::setEngineConfig(const se::Value &advancedConfig) {
    std::unordered_map<std::string, std::string> map;
    sevalue_to_native(advancedConfig, &map);

    auto engineConfig = ZegoEngineConfig{};
    engineConfig.advancedConfig = map;
    ZegoExpressSDK::setEngineConfig(engineConfig);
}

void ZegoExpressBridge::setLogConfig(const std::string &logPath, uint64_t logSize) {
    auto logConfig = ZegoLogConfig{};
    logConfig.logPath = logPath;
    logConfig.logSize = logSize;
    ZegoExpressSDK::setLogConfig(logConfig);
}

void ZegoExpressBridge::setRoomMode(int mode) { ZegoExpressSDK::setRoomMode(ZegoRoomMode(mode)); }

std::string ZegoExpressBridge::getVersion() { return ZegoExpressSDK::getVersion(); }

void ZegoExpressBridge::setApiCalledCallback(const se::Value &callback) {
    se::AutoHandleScope hs;
    if (callback.isObject()) {
        ZegoExpressEventHandler::GetInstance()->SetJsApiCalledCallback(callback);
    } else {
        // Clear the callback handler when developers set it to "undefind" or "null"
        ZegoExpressEventHandler::GetInstance()->ClearJsApiCalledCallback();
    }
}

bool ZegoExpressBridge::isFeatureSupported(int featureType) {
    return ZegoExpressSDK::isFeatureSupported(ZegoFeatureType(featureType));
}

void ZegoExpressBridge::setEventHandler(const se::Value &handler) {
    se::AutoHandleScope hs;
    if (handler.isObject()) {
        ZegoExpressEventHandler::GetInstance()->SetJsEventHandler(handler);
    } else {
        // Clear the callback handler when developers set it to "undefind" or "null"
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

    auto job = [callback](int errorCode, std::string extendedData) {
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

    auto job = [callback](int errorCode, std::string extendedData) {
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

    native_engine_->setStreamExtraInfo(extraInfo, job);
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
        return;
    }
    return native_engine_->isVideoEncoderSupported(ZegoVideoCodecID(codecID));
}

#pragma mark - Player module

void ZegoExpressBridge::startPlayingStream(const std::string &streamID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startPlayingStream(streamID);
}

void ZegoExpressBridge::stopPlayingStream(const std::string &streamID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPlayingStream(streamID);
}

} // namespace zego::cocos
