//
//  zego_express_bridge.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "zego_express_bridge.h"
#include "zego_texture_renderer_controller.h"

JSB_REGISTER_OBJECT_TYPE(ZegoEngineProfile);
JSB_REGISTER_OBJECT_TYPE(ZegoUser);
JSB_REGISTER_OBJECT_TYPE(ZegoPublisherConfig);

namespace zego::cocos {

#pragma mark - API

ZegoExpressBridge::ZegoExpressBridge() {
#if defined(ANDROID)
    ZegoExpressSDK::setAndroidEnv(cc::JniHelper::getJavaVM(), cc::JniHelper::getActivity());
#endif
}

std::string ZegoExpressBridge::getVersion() { return ZegoExpressSDK::getVersion(); }

void ZegoExpressBridge::createEngine(ZegoEngineProfile profile) {
    printf("appID: %d, appSign:%s, scenario: %d\n", profile.appID, profile.appSign.c_str(),
           profile.scenario);
    native_engine_ = ZegoExpressSDK::createEngine(profile, shared_from_this());

    ZegoCustomVideoRenderConfig render_config;
    render_config.bufferType = ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA;
    render_config.frameFormatSeries = ZEGO_VIDEO_FRAME_FORMAT_SERIES_RGB;
    native_engine_->enableCustomVideoRender(true, &render_config);
    native_engine_->setCustomVideoRenderHandler(shared_from_this());
}

void ZegoExpressBridge::destroyEngine() {
    if (!native_engine_) {
        return;
    }
    ZegoExpressSDK::destroyEngine(native_engine_);
    native_engine_ = nullptr;
}

void ZegoExpressBridge::setEventHandler(const se::Value &handler) {
    event_handler_ = std::make_shared<se::Value>(handler);
}

void ZegoExpressBridge::loginRoom(const std::string &roomID, ZegoUser user) {
    if (!native_engine_) {
        return;
    }
    printf("roomID: %s\n", roomID.c_str());
    native_engine_->loginRoom(roomID, user);
}

void ZegoExpressBridge::logoutRoom(const std::string &roomID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->logoutRoom(roomID);
}

void ZegoExpressBridge::logoutRoom() {
    if (!native_engine_) {
        return;
    }
    native_engine_->logoutRoom();
}

//void ZegoExpressBridge::startPreview() {
//    if (!native_engine_) {
//        return;
//    }
//    native_engine_->startPreview();
//}

void ZegoExpressBridge::startPreview(ZegoPublishChannel channel, int viewID) {
    if (!native_engine_) {
        return;
    }

    if (viewID < 0) {
        // Preview audio only
        native_engine_->startPreview(nullptr, channel);
    } else {
        auto controller = ZegoTextureRendererController::GetInstance();
        if (!controller->BindCapturedChannel(channel, viewID)) {
            // Preview video without creating TextureRenderer in advance
            // Need to invoke dart `createTextureRenderer` method in advance to create TextureRenderer and get viewID (TextureID)
            // TODO: Print error message
            return;
        }

        native_engine_->startPreview(nullptr, channel);
    }
}

//void ZegoExpressBridge::stopPreview() {
//    if (!native_engine_) {
//        return;
//    }
//    native_engine_->stopPreview();
//}

void ZegoExpressBridge::stopPreview(ZegoPublishChannel channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPreview(channel);
}

void ZegoExpressBridge::startPublishingStream(const std::string &streamID,
                                              ZegoPublisherConfig config,
                                              ZegoPublishChannel channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->startPublishingStream(streamID, config, channel);
}

void ZegoExpressBridge::stopPublishingStream(ZegoPublishChannel channel) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPublishingStream(channel);
}

void ZegoExpressBridge::startPlayingStream(const std::string &streamID, int viewID) {
    if (!native_engine_) {
        return;
    }

    if (viewID < 0) {
        // Play audio only
        native_engine_->startPlayingStream(streamID);
    } else {
        auto controller = ZegoTextureRendererController::GetInstance();
        if (!controller->BindRemoteStreamId(streamID, viewID)) {
            // Play video without creating TextureRenderer in advance
            // Need to invoke dart `createTextureRenderer` method in advance to create TextureRenderer and get viewID (TextureID)
            // TODO: Print error message
            return;
        }

        native_engine_->startPlayingStream(streamID);
    }

    native_engine_->startPlayingStream(streamID);
}

void ZegoExpressBridge::stopPlayingStream(const std::string &streamID) {
    if (!native_engine_) {
        return;
    }
    native_engine_->stopPlayingStream(streamID);
}

#pragma mark - TextureRenderer

int64_t ZegoExpressBridge::createTextureRenderer() {
    auto controller = ZegoTextureRendererController::GetInstance();
    return controller->CreateTextureRenderer();
}

void ZegoExpressBridge::destroyTextureRenderer(int64_t textureId) {
    auto controller = ZegoTextureRendererController::GetInstance();
    controller->DestroyTextureRenderer(textureId);
}

void ZegoExpressBridge::setJsTextureRendererController(const se::Value &js_controller) {
    auto controller = ZegoTextureRendererController::GetInstance();
    controller->SetJsController(js_controller);
}

#pragma mark - Callback

void ZegoExpressBridge::onDebugError(int errorCode, const std::string &funcName,
                                     const std::string &info) {
    printf("[onDebugError] code:%d, func:%s\n", errorCode, funcName.c_str());
}

void ZegoExpressBridge::onRoomStateUpdate(const std::string &roomID, ZegoRoomState state,
                                          int errorCode, const std::string &extendedData) {
    printf("[onRoomStonRoomStateUpdateateChanged] roomID:%s, state:%d, code:%d\n", roomID.c_str(),
           state, errorCode);
    if (event_handler_) {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomStateUpdate", &method)) {
            if (!method.isObject()) {
                return;
            }
            auto func = method.toObject();
            if (!func->isFunction()) {
                return;
            }

            se::Value js_room_id;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            se::Value js_state;
            nativevalue_to_se(state, js_state, nullptr);
            se::Value js_error_code;
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            se::Value js_extended_data;
            nativevalue_to_se(extendedData, js_extended_data, nullptr);

            se::ValueArray args;
            args.push_back(js_room_id);
            args.push_back(js_state);
            args.push_back(js_error_code);
            args.push_back(js_extended_data);

            func->call(args, event_handler_->toObject());
        }
    }
}

void ZegoExpressBridge::onRoomStateChanged(const std::string &roomID,
                                           ZegoRoomStateChangedReason reason, int errorCode,
                                           const std::string &extendedData) {
    printf("[onRoomStateChanged] roomID:%s, reason:%d, code:%d\n", roomID.c_str(), reason,
           errorCode);
}
} // namespace zego::cocos

namespace zego::cocos {

bool RegisterExpressBridge(se::Object *ns) {

    using namespace zego::cocos;

    sebind::class_<ZegoEngineProfile> engine_profile_class("ZegoEngineProfile");
    //    engine_profile_class.constructor<>();
    engine_profile_class.property("appID", &ZegoEngineProfile::appID);
    engine_profile_class.property("appSign", &ZegoEngineProfile::appSign);
    engine_profile_class.property("scenario", &ZegoEngineProfile::scenario);
    engine_profile_class.install(ns);

    sebind::class_<ZegoUser> user_class("ZegoUser");
    user_class.constructor<>();
    user_class.constructor<std::string, std::string>();
    user_class.property("userID", &ZegoUser::userID);
    user_class.property("userName", &ZegoUser::userName);
    user_class.install(ns);

    sebind::class_<ZegoPublisherConfig> publisher_config_class("ZegoPublisherConfig");
    publisher_config_class.constructor<>();
    //    publisher_config_class.constructor<std::string, int, ZegoStreamCensorshipMode>();
    publisher_config_class.property("roomID", &ZegoPublisherConfig::roomID);
    publisher_config_class.property("forceSynchronousNetworkTime",
                                    &ZegoPublisherConfig::forceSynchronousNetworkTime);
    publisher_config_class.property("streamCensorshipMode",
                                    &ZegoPublisherConfig::streamCensorshipMode);
    publisher_config_class.install(ns);

    sebind::class_<ZegoExpressBridge> bridge("ZegoExpressBridge");

    bridge.constructor<>();

    bridge.finalizer(
        [](ZegoExpressBridge *bridge) { printf("[ZegoExpressBridge] finalizer:%p\n", bridge); });

    bridge.staticFunction("getVersion", &ZegoExpressBridge::getVersion);
    bridge.function("createEngine", &ZegoExpressBridge::createEngine);
    bridge.function("destroyEngine", &ZegoExpressBridge::destroyEngine);
    bridge.function("setEventHandler", &ZegoExpressBridge::setEventHandler);

    bridge.function("loginRoom", &ZegoExpressBridge::loginRoom);
    bridge.function("logoutRoom",
                    static_cast<void (ZegoExpressBridge::*)()>(&ZegoExpressBridge::logoutRoom));
    bridge.function("logoutRoom", static_cast<void (ZegoExpressBridge::*)(const std::string &)>(
                                      &ZegoExpressBridge::logoutRoom));

    //    bridge.function("startPreview",
    //                    static_cast<void (ZegoExpressBridge::*)()>(&ZegoExpressBridge::startPreview));
    //    bridge.function("startPreview", static_cast<void (ZegoExpressBridge::*)(ZegoPublishChannel)>(
    //                                        &ZegoExpressBridge::startPreview));
    bridge.function("startPreview", &ZegoExpressBridge::startPreview);
    //    bridge.function("stopPreview",
    //                    static_cast<void (ZegoExpressBridge::*)()>(&ZegoExpressBridge::stopPreview));
    //    bridge.function("stopPreview", static_cast<void (ZegoExpressBridge::*)(ZegoPublishChannel)>(
    //                                       &ZegoExpressBridge::stopPreview));
    bridge.function("stopPreview", &ZegoExpressBridge::stopPreview);

    bridge.function("startPublishingStream", &ZegoExpressBridge::startPublishingStream);
    bridge.function("stopPublishingStream", &ZegoExpressBridge::stopPublishingStream);

    bridge.function("startPlayingStream", &ZegoExpressBridge::startPlayingStream);
    bridge.function("stopPlayingStream", &ZegoExpressBridge::stopPlayingStream);

    bridge.function("createTextureRenderer", &ZegoExpressBridge::createTextureRenderer);
    bridge.function("destroyTextureRenderer", &ZegoExpressBridge::destroyTextureRenderer);
    bridge.function("setJsTextureRendererController",
                    &ZegoExpressBridge::setJsTextureRendererController);

    bridge.install(ns);
    return true;
}

} // namespace zego::cocos
