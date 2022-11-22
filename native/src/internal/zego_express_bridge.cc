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

void ZegoExpressBridge::logoutRoom(const std::string &roomID) {
    // TODO: Callback
    if (!native_engine_) {
        return;
    }
    if (roomID.empty()) {
        native_engine_->logoutRoom();
    } else {
        native_engine_->logoutRoom(roomID);
    }
}

#pragma mark - Publisher module

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

se::Object *ZegoExpressBridge::getVideoConfig(int channel) {
    if (!native_engine_) {
        return se::Object::createPlainObject();
    }
    auto config = native_engine_->getVideoConfig();
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
