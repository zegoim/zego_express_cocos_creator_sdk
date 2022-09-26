#include "bindings/sebind/sebind.h"
#include "bindings/manual/jsb_conversions.h"
#include "plugins/Plugins.h"
#include "plugins/bus/EventBus.h"

#include <memory>

#include "ZegoExpressSDK.h"

using namespace ZEGO::EXPRESS;

namespace zego {
namespace cocos {

class ZegoExpressBridge: public std::enable_shared_from_this<ZegoExpressBridge>, public IZegoEventHandler, public IZegoCustomVideoRenderHandler {

public:
    ZegoExpressBridge() {
    }
    
    ~ZegoExpressBridge() {
    }
    
public:
    static std::string getVersion() {
        return ZegoExpressSDK::getVersion();
    }
    
public:
    void createEngine(ZegoEngineProfile profile) {
        printf("appID: %d, appSign:%s, scenario: %d\n", profile.appID, profile.appSign.c_str(), profile.scenario);
        native_engine_ = ZegoExpressSDK::createEngine(profile, shared_from_this());

        ZegoCustomVideoRenderConfig render_config;
        render_config.bufferType = ZEGO_VIDEO_BUFFER_TYPE_RAW_DATA;
        render_config.frameFormatSeries = ZEGO_VIDEO_FRAME_FORMAT_SERIES_RGB;
        native_engine_->enableCustomVideoRender(true, &render_config);
        native_engine_->setCustomVideoRenderHandler(shared_from_this());
    }
    
    void destroyEngine() {
        if (!native_engine_) { return; }
        ZegoExpressSDK::destroyEngine(native_engine_);
        native_engine_ = nullptr;
    }
    
    void setEventHandler(const se::Value &handler) {
        event_handler_ = std::make_shared<se::Value>(handler);
    }
    
    void loginRoom(const std::string& roomID, ZegoUser user) {
        if (!native_engine_) { return; }
        printf("roomID: %s\n", roomID.c_str());
        native_engine_->loginRoom(roomID, user);
    }
    
    void logoutRoom(const std::string& roomID) {
        if (!native_engine_) { return; }
        native_engine_->logoutRoom(roomID);
    }
    
    void logoutRoom() {
        if (!native_engine_) { return; }
        native_engine_->logoutRoom();
    }
    
    void startPreview() {
        if (!native_engine_) { return; }
        native_engine_->startPreview();
    }
    
    void startPreview(ZegoPublishChannel channel) {
        if (!native_engine_) { return; }
        native_engine_->startPreview(nullptr, channel);
    }
    
    void stopPreview() {
        if (!native_engine_) { return; }
        native_engine_->stopPreview();
    }
    
    void stopPreview(ZegoPublishChannel channel) {
        if (!native_engine_) { return; }
        native_engine_->stopPreview(channel);
    }
    
public:
    
    void onDebugError(int errorCode, const std::string &funcName, const std::string &info) override {
        printf("[onDebugError] code:%d, func:%s\n", errorCode, funcName.c_str());
    }
    
    void onRoomStateUpdate(const std::string &roomID, ZegoRoomState state, int errorCode, const std::string &extendedData) override {
        printf("[onRoomStonRoomStateUpdateateChanged] roomID:%s, state:%d, code:%d\n", roomID.c_str(), state, errorCode);
        if (event_handler_) {
            se::AutoHandleScope hs;
            se::Value method;
            if (event_handler_->toObject()->getProperty("onRoomStateUpdate", &method)) {
                if (!method.isObject()) { return; }
                auto func = method.toObject();
                if (!func->isFunction()) { return; }
                    
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
    
    void onRoomStateChanged(const std::string &roomID, ZegoRoomStateChangedReason reason, int errorCode, const std::string &extendedData) override {
        printf("[onRoomStateChanged] roomID:%s, reason:%d, code:%d\n", roomID.c_str(), reason, errorCode);
    }
    
public:
    void onCapturedVideoFrameRawData(unsigned char **data, unsigned int *dataLength, ZegoVideoFrameParam param, ZegoVideoFlipMode flipMode, ZegoPublishChannel channel) override {
        printf("[onCapturedVideoFrameRawData] data:%p, length:%u, w:%d, h:%d, format:%d, flip:%d, channel:%d\n", data[0], dataLength[0], param.width, param.height, param.format, flipMode, channel);
    }
    
    void onRemoteVideoFrameRawData(unsigned char **data, unsigned int *dataLength, ZegoVideoFrameParam param, const std::string &streamID) override {
        printf("[onRemoteVideoFrameRawData] streamID:%s, data:%p, length:%u, w:%d, h:%d, format:%d\n", streamID.c_str(), data[0], dataLength[0], param.width, param.height, param.format);
    }
    
private:
    IZegoExpressEngine *native_engine_ = nullptr;
    std::shared_ptr<se::Value> event_handler_;
};


}
}

JSB_REGISTER_OBJECT_TYPE(ZegoEngineProfile);
JSB_REGISTER_OBJECT_TYPE(ZegoUser);

// export c++ methods to JS
static bool register_sdk(se::Object *ns) {
    
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
        
    sebind::class_<ZegoExpressBridge> bridge("ZegoExpressBridge");
    
    bridge.constructor<>();
    
    bridge.finalizer([](ZegoExpressBridge *bridge) {
        printf("[ZegoExpressBridge] finalizer:%p\n", bridge);
    });

    bridge.staticFunction("getVersion", &ZegoExpressBridge::getVersion);
    bridge.function("createEngine", &ZegoExpressBridge::createEngine);
    bridge.function("destroyEngine", &ZegoExpressBridge::destroyEngine);
    bridge.function("setEventHandler", &ZegoExpressBridge::setEventHandler);
    
    bridge.function("loginRoom", &ZegoExpressBridge::loginRoom);
    bridge.function("logoutRoom", static_cast<void(ZegoExpressBridge::*)()>(&ZegoExpressBridge::logoutRoom));
    bridge.function("logoutRoom", static_cast<void(ZegoExpressBridge::*)(const std::string&)>(&ZegoExpressBridge::logoutRoom));
    
    bridge.function("startPreview", static_cast<void(ZegoExpressBridge::*)()>(&ZegoExpressBridge::startPreview));
    bridge.function("startPreview", static_cast<void(ZegoExpressBridge::*)(ZegoPublishChannel)>(&ZegoExpressBridge::startPreview));
    bridge.function("stopPreview", static_cast<void(ZegoExpressBridge::*)()>(&ZegoExpressBridge::stopPreview));
    bridge.function("stopPreview", static_cast<void(ZegoExpressBridge::*)(ZegoPublishChannel)>(&ZegoExpressBridge::stopPreview));

    bridge.install(ns);
    return true;
}

void load_zego_express_engine_plugin() {
    using namespace cc::plugin;
    static Listener listener(BusType::SCRIPT_ENGINE);
    listener.receive([](ScriptEngineEvent event) {
        if (event == ScriptEngineEvent::POST_INIT) {
            se::ScriptEngine::getInstance()->addRegisterCallback(register_sdk);
        }
    });
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(zego_express_engine_plugin, load_zego_express_engine_plugin);
