//
//  zego_express_engine_plugin.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"

#include "internal/zego_express_bridge.h"

bool RegisterExpressBridge(se::Object *ns);

void load_zego_express_engine_plugin() {
    using namespace cc::plugin;
    static Listener listener(BusType::SCRIPT_ENGINE);
    listener.receive([](ScriptEngineEvent event) {
        if (event == ScriptEngineEvent::POST_INIT) {
            se::ScriptEngine::getInstance()->addRegisterCallback(RegisterExpressBridge);
        }
    });
}

CC_PLUGIN_ENTRY(zego_express_engine_plugin, load_zego_express_engine_plugin);

bool RegisterExpressBridge(se::Object *ns) {
    using namespace zego::cocos;
    sebind::class_<ZegoExpressBridge> bridge("ZegoExpressBridge");

    bridge.constructor<>();
    bridge.finalizer(
        [](ZegoExpressBridge *bridge) { printf("[ZegoExpressBridge] finalizer:%p\n", bridge); });

    bridge.function("setJsTextureRendererController",
                    &ZegoExpressBridge::setJsTextureRendererController);

    bridge.function("createEngine", &ZegoExpressBridge::createEngine);
    bridge.function("destroyEngine", &ZegoExpressBridge::destroyEngine);
    bridge.function("setEngineConfig", &ZegoExpressBridge::setEngineConfig);
    bridge.function("setLogConfig", &ZegoExpressBridge::setLogConfig);
    bridge.function("setRoomMode", &ZegoExpressBridge::setRoomMode);
    bridge.function("getVersion", &ZegoExpressBridge::getVersion);
    bridge.function("setApiCalledCallback", &ZegoExpressBridge::setApiCalledCallback);
    bridge.function("isFeatureSupported", &ZegoExpressBridge::isFeatureSupported);
    bridge.function("setEventHandler", &ZegoExpressBridge::setEventHandler);
    bridge.function("setRoomScenario", &ZegoExpressBridge::setRoomScenario);
    bridge.function("uploadLog", &ZegoExpressBridge::uploadLog);
    bridge.function("enableDebugAssistant", &ZegoExpressBridge::enableDebugAssistant);
    bridge.function("callExperimentalAPI", &ZegoExpressBridge::callExperimentalAPI);

    bridge.function("loginRoom", &ZegoExpressBridge::loginRoom);
    bridge.function("logoutRoom", &ZegoExpressBridge::logoutRoom);
    bridge.function("switchRoom", &ZegoExpressBridge::switchRoom);
    bridge.function("renewToken", &ZegoExpressBridge::renewToken);
    bridge.function("setRoomExtraInfo", &ZegoExpressBridge::setRoomExtraInfo);

    bridge.function("startPublishingStream", &ZegoExpressBridge::startPublishingStream);
    bridge.function("stopPublishingStream", &ZegoExpressBridge::stopPublishingStream);
    bridge.function("setStreamExtraInfo", &ZegoExpressBridge::setStreamExtraInfo);
    bridge.function("startPreview", &ZegoExpressBridge::startPreview);
    bridge.function("stopPreview", &ZegoExpressBridge::stopPreview);
    bridge.function("setVideoConfig", &ZegoExpressBridge::setVideoConfig);
    bridge.function("getVideoConfig", &ZegoExpressBridge::getVideoConfig);
    bridge.function("setAppOrientation", &ZegoExpressBridge::setAppOrientation);
    bridge.function("setAudioConfig", &ZegoExpressBridge::setAudioConfig);
    bridge.function("getAudioConfig", &ZegoExpressBridge::getAudioConfig);
    bridge.function("setPublishStreamEncryptionKey",
                    &ZegoExpressBridge::setPublishStreamEncryptionKey);
    bridge.function("mutePublishStreamAudio", &ZegoExpressBridge::mutePublishStreamAudio);
    bridge.function("mutePublishStreamVideo", &ZegoExpressBridge::mutePublishStreamVideo);
    bridge.function("enableTrafficControl", &ZegoExpressBridge::enableTrafficControl);
    bridge.function("setMinVideoBitrateForTrafficControl",
                    &ZegoExpressBridge::setMinVideoBitrateForTrafficControl);
    bridge.function("setMinVideoFpsForTrafficControl",
                    &ZegoExpressBridge::setMinVideoFpsForTrafficControl);
    bridge.function("setMinVideoResolutionForTrafficControl",
                    &ZegoExpressBridge::setMinVideoResolutionForTrafficControl);
    bridge.function("setCaptureVolume", &ZegoExpressBridge::setCaptureVolume);
    bridge.function("enableHardwareEncoder", &ZegoExpressBridge::enableHardwareEncoder);
    bridge.function("setCapturePipelineScaleMode", &ZegoExpressBridge::setCapturePipelineScaleMode);
    bridge.function("isVideoEncoderSupported", &ZegoExpressBridge::isVideoEncoderSupported);

    bridge.function("startPlayingStream", &ZegoExpressBridge::startPlayingStream);
    bridge.function("stopPlayingStream", &ZegoExpressBridge::stopPlayingStream);

    bridge.install(ns);
    return true;
}
