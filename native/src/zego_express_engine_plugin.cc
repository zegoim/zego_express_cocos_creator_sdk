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
    bridge.function("setAppOrientationMode", &ZegoExpressBridge::setAppOrientationMode);

    bridge.function("startPlayingStream", &ZegoExpressBridge::startPlayingStream);
    bridge.function("stopPlayingStream", &ZegoExpressBridge::stopPlayingStream);
    bridge.function("setPlayStreamDecryptionKey", &ZegoExpressBridge::setPlayStreamDecryptionKey);
    bridge.function("setPlayVolume", &ZegoExpressBridge::setPlayVolume);
    bridge.function("setAllPlayStreamVolume", &ZegoExpressBridge::setAllPlayStreamVolume);
    bridge.function("setPlayStreamVideoType", &ZegoExpressBridge::setPlayStreamVideoType);
    bridge.function("setPlayStreamBufferIntervalRange",
                    &ZegoExpressBridge::setPlayStreamBufferIntervalRange);
    bridge.function("setPlayStreamFocusOn", &ZegoExpressBridge::setPlayStreamFocusOn);
    bridge.function("mutePlayStreamAudio", &ZegoExpressBridge::mutePlayStreamAudio);
    bridge.function("mutePlayStreamVideo", &ZegoExpressBridge::mutePlayStreamVideo);
    bridge.function("muteAllPlayStreamAudio", &ZegoExpressBridge::muteAllPlayStreamAudio);
    bridge.function("muteAllPlayStreamVideo", &ZegoExpressBridge::muteAllPlayStreamVideo);
    bridge.function("enableHardwareDecoder", &ZegoExpressBridge::enableHardwareDecoder);
    bridge.function("enableCheckPoc", &ZegoExpressBridge::enableCheckPoc);
    bridge.function("isVideoDecoderSupported", &ZegoExpressBridge::isVideoDecoderSupported);

    bridge.function("muteMicrophone", &ZegoExpressBridge::muteMicrophone);
    bridge.function("isMicrophoneMuted", &ZegoExpressBridge::isMicrophoneMuted);
    bridge.function("muteSpeaker", &ZegoExpressBridge::muteSpeaker);
    bridge.function("isSpeakerMuted", &ZegoExpressBridge::isSpeakerMuted);
    bridge.function("getAudioDeviceList", &ZegoExpressBridge::getAudioDeviceList);
    bridge.function("getDefaultAudioDeviceID", &ZegoExpressBridge::getDefaultAudioDeviceID);
    bridge.function("useAudioDevice", &ZegoExpressBridge::useAudioDevice);
    bridge.function("getAudioDeviceVolume", &ZegoExpressBridge::getAudioDeviceVolume);
    bridge.function("setAudioDeviceVolume", &ZegoExpressBridge::setAudioDeviceVolume);
    bridge.function("startAudioDeviceVolumeMonitor",
                    &ZegoExpressBridge::startAudioDeviceVolumeMonitor);
    bridge.function("stopAudioDeviceVolumeMonitor",
                    &ZegoExpressBridge::stopAudioDeviceVolumeMonitor);
    bridge.function("muteAudioDevice", &ZegoExpressBridge::muteAudioDevice);
    bridge.function("setAudioDeviceMode", &ZegoExpressBridge::setAudioDeviceMode);
    bridge.function("isAudioDeviceMuted", &ZegoExpressBridge::isAudioDeviceMuted);
    bridge.function("enableAudioCaptureDevice", &ZegoExpressBridge::enableAudioCaptureDevice);
    bridge.function("getAudioRouteType", &ZegoExpressBridge::getAudioRouteType);
    bridge.function("setAudioRouteToSpeaker", &ZegoExpressBridge::setAudioRouteToSpeaker);
    bridge.function("enableCamera", &ZegoExpressBridge::enableCamera);
    bridge.function("useFrontCamera", &ZegoExpressBridge::useFrontCamera);
    bridge.function("isCameraFocusSupported", &ZegoExpressBridge::isCameraFocusSupported);
    bridge.function("setCameraFocusMode", &ZegoExpressBridge::setCameraFocusMode);
    bridge.function("setCameraFocusPointInPreview",
                    &ZegoExpressBridge::setCameraFocusPointInPreview);
    bridge.function("setCameraExposureMode", &ZegoExpressBridge::setCameraExposureMode);
    bridge.function("setCameraExposurePointInPreview",
                    &ZegoExpressBridge::setCameraExposurePointInPreview);
    bridge.function("setCameraExposureCompensation",
                    &ZegoExpressBridge::setCameraExposureCompensation);
    bridge.function("setCameraZoomFactor", &ZegoExpressBridge::setCameraZoomFactor);
    bridge.function("getCameraMaxZoomFactor", &ZegoExpressBridge::getCameraMaxZoomFactor);
    bridge.function("enableCameraAdaptiveFPS", &ZegoExpressBridge::enableCameraAdaptiveFPS);
    bridge.function("useVideoDevice", &ZegoExpressBridge::useVideoDevice);
    bridge.function("getVideoDeviceList", &ZegoExpressBridge::getVideoDeviceList);
    bridge.function("getDefaultVideoDeviceID", &ZegoExpressBridge::getDefaultVideoDeviceID);
    bridge.function("startSoundLevelMonitor", &ZegoExpressBridge::startSoundLevelMonitor);
    bridge.function("stopSoundLevelMonitor", &ZegoExpressBridge::stopSoundLevelMonitor);
    bridge.function("startAudioSpectrumMonitor", &ZegoExpressBridge::startAudioSpectrumMonitor);
    bridge.function("stopAudioSpectrumMonitor", &ZegoExpressBridge::stopAudioSpectrumMonitor);
    bridge.function("enableHeadphoneMonitor", &ZegoExpressBridge::enableHeadphoneMonitor);
    bridge.function("setHeadphoneMonitorVolume", &ZegoExpressBridge::setHeadphoneMonitorVolume);
    bridge.function("enableMixSystemPlayout", &ZegoExpressBridge::enableMixSystemPlayout);
    bridge.function("setMixSystemPlayoutVolume", &ZegoExpressBridge::setMixSystemPlayoutVolume);
    bridge.function("enableMixEnginePlayout", &ZegoExpressBridge::enableMixEnginePlayout);
    bridge.function("startAudioVADStableStateMonitor",
                    &ZegoExpressBridge::startAudioVADStableStateMonitor);
    bridge.function("stopAudioVADStableStateMonitor",
                    &ZegoExpressBridge::stopAudioVADStableStateMonitor);
    bridge.function("getCurrentAudioDevice", &ZegoExpressBridge::getCurrentAudioDevice);

    bridge.function("enableAEC", &ZegoExpressBridge::enableAEC);
    bridge.function("enableHeadphoneAEC", &ZegoExpressBridge::enableHeadphoneAEC);
    bridge.function("setAECMode", &ZegoExpressBridge::setAECMode);
    bridge.function("enableAGC", &ZegoExpressBridge::enableAGC);
    bridge.function("enableANS", &ZegoExpressBridge::enableANS);
    bridge.function("enableTransientANS", &ZegoExpressBridge::enableTransientANS);
    bridge.function("setANSMode", &ZegoExpressBridge::setANSMode);
    bridge.function("startEffectsEnv", &ZegoExpressBridge::startEffectsEnv);
    bridge.function("stopEffectsEnv", &ZegoExpressBridge::stopEffectsEnv);
    bridge.function("enableEffectsBeauty", &ZegoExpressBridge::enableEffectsBeauty);
    bridge.function("setEffectsBeautyParam", &ZegoExpressBridge::setEffectsBeautyParam);
    bridge.function("setAudioEqualizerGain", &ZegoExpressBridge::setAudioEqualizerGain);
    bridge.function("setVoiceChangerPreset", &ZegoExpressBridge::setVoiceChangerPreset);
    bridge.function("setVoiceChangerParam", &ZegoExpressBridge::setVoiceChangerParam);
    bridge.function("setReverbPreset", &ZegoExpressBridge::setReverbPreset);
    bridge.function("setReverbAdvancedParam", &ZegoExpressBridge::setReverbAdvancedParam);
    bridge.function("setReverbEchoParam", &ZegoExpressBridge::setReverbEchoParam);
    bridge.function("enableVirtualStereo", &ZegoExpressBridge::enableVirtualStereo);
    bridge.function("enablePlayStreamVirtualStereo",
                    &ZegoExpressBridge::enablePlayStreamVirtualStereo);
    bridge.function("setElectronicEffects", &ZegoExpressBridge::setElectronicEffects);

    bridge.function("startPerformanceMonitor", &ZegoExpressBridge::startPerformanceMonitor);
    bridge.function("stopPerformanceMonitor", &ZegoExpressBridge::stopPerformanceMonitor);

    bridge.install(ns);
    return true;
}
