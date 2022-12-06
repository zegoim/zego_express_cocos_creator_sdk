import { JSB } from 'cc/env'
import * as zego from '../ZegoExpressDefines'
import { ZegoEventHandler, ZegoApiCalledEventHandler } from '../ZegoExpressEventHandler'
import { ZegoTextureRendererController } from './native/ZegoTextureRendererController'

export class ZegoExpressEngineImpl {
  private static _instance: ZegoExpressEngineImpl
  private _bridge: ZegoExpressBridge | undefined
  private _rendererController: ZegoTextureRendererController | undefined

  static get instance(): ZegoExpressEngineImpl {
    if (!this._instance) {
      this._instance = new ZegoExpressEngineImpl()
    }
    return this._instance
  }

  constructor() {
    if (JSB) {
      this._bridge = new ZegoExpressBridge()
      this._rendererController = new ZegoTextureRendererController()
      this._bridge.setJsTextureRendererController(this._rendererController)
    } else {
      // TODO: Web
    }
  }

  createEngine(profile: zego.ZegoEngineProfile, eventHandler?: ZegoEventHandler): void {
    if (this._bridge) {
      this._bridge.createEngine(profile.appID ?? 0, profile.appSign ?? '', profile.scenario ?? 0)
      this._bridge.setEventHandler(eventHandler)
    } else {
      // TODO: Web
    }
  }

  destroyEngine(callback?: zego.ZegoDestroyCompletionCallback): void {
    if (this._bridge) {
      this._bridge.destroyEngine(callback)
    } else {
      // TODO: Web
    }
  }

  setEngineConfig(config: zego.ZegoEngineConfig): void {
    if (this._bridge) {
      this._bridge.setEngineConfig(config?.advancedConfig ?? new Map<string, string>())
    } else {
      // TODO: Web
    }
  }

  setLogConfig(config: zego.ZegoLogConfig): void {
    if (this._bridge) {
      this._bridge.setLogConfig(config.logPath, config.logSize)
    } else {
      // TODO: Web
    }
  }

  setRoomMode(mode: zego.ZegoRoomMode): void {
    if (this._bridge) {
      this._bridge.setRoomMode(mode)
    } else {
      // TODO: Web
    }
  }

  getVersion(): string {
    if (this._bridge) {
      return this._bridge.getVersion()
    } else {
      // TODO: Web
    }
  }

  setApiCalledCallback(callback: ZegoApiCalledEventHandler): void {
    if (this._bridge) {
      this._bridge.setApiCalledCallback(callback)
    } else {
      // TODO: Web
    }
  }

  isFeatureSupported(featureType: zego.ZegoFeatureType): boolean {
    if (this._bridge) {
      return this._bridge.isFeatureSupported(featureType)
    } else {
      // TODO: Web
    }
  }

  setEventHandler(eventHandler?: ZegoEventHandler): void {
    if (this._bridge) {
      this._bridge.setEventHandler(eventHandler)
    } else {
      // TODO: Web
    }
  }

  setRoomScenario(scenario: zego.ZegoScenario): void {
    if (this._bridge) {
      this._bridge.setRoomScenario(scenario)
    } else {
      // TODO: Web
    }
  }

  uploadLog(callback?: zego.ZegoUploadLogResultCallback): void {
    if (this._bridge) {
      this._bridge.uploadLog(callback)
    } else {
      // TODO: Web
    }
  }

  enableDebugAssistant(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableDebugAssistant(enable)
    } else {
      // TODO: Web
    }
  }
  callExperimentalAPI(params: string): string {
    if (this._bridge) {
      return this._bridge.callExperimentalAPI(params)
    } else {
      // TODO: Web
    }
  }

  loginRoom(
    roomID: string,
    user: zego.ZegoUser,
    config?: zego.ZegoRoomConfig,
    callback?: zego.ZegoRoomLoginCallback
  ): void {
    if (this._bridge) {
      this._bridge.loginRoom(
        roomID,
        user.userID ?? '',
        user.userName ?? '',
        config?.maxMemberCount ?? 0,
        config?.isUserStatusNotify ?? false,
        config?.token ?? '',
        callback
      )
    } else {
      // TODO: Web
    }
  }

  logoutRoom(roomID?: string, callback?: zego.ZegoRoomLogoutCallback): void {
    if (this._bridge) {
      this._bridge.logoutRoom(roomID ?? '', callback)
    } else {
      // TODO: Web
    }
  }

  switchRoom(fromRoomID: string, toRoomID: string, config?: zego.ZegoRoomConfig): void {
    if (this._bridge) {
      this._bridge.switchRoom(
        fromRoomID,
        toRoomID,
        config?.maxMemberCount ?? 0,
        config?.isUserStatusNotify ?? false,
        config?.token ?? ''
      )
    } else {
      // TODO: Web
    }
  }

  renewToken(roomID: string, token: string): void {
    if (this._bridge) {
      this._bridge.renewToken(roomID, token)
    } else {
      // TODO: Web
    }
  }

  setRoomExtraInfo(
    roomID: string,
    key: string,
    value: string,
    callback?: zego.ZegoRoomSetRoomExtraInfoCallback
  ): void {
    if (this._bridge) {
      this._bridge.setRoomExtraInfo(roomID, key, value, callback)
    } else {
      // TODO: Web
    }
  }

  startPublishingStream(
    streamID: string,
    config?: zego.ZegoPublisherConfig,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      this._bridge.startPublishingStream(
        streamID,
        config?.roomID ?? '',
        config?.forceSynchronousNetworkTime ?? 0,
        config?.streamCensorshipMode ?? 0,
        channel ?? 0
      )
    } else {
      // TODO: Web
    }
  }

  stopPublishingStream(channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.stopPublishingStream(channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setStreamExtraInfo(
    extraInfo: string,
    channel?: zego.ZegoPublishChannel,
    callback?: zego.ZegoPublisherSetStreamExtraInfoCallback
  ): void {
    if (this._bridge) {
      this._bridge.setStreamExtraInfo(extraInfo, channel ?? 0, callback)
    } else {
      // TODO: Web
    }
  }

  startPreview(canvas?: zego.ZegoCanvas, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.startPreview(channel ?? 0)
      if (canvas) {
        this._rendererController.localViews.set(channel ?? 0, canvas.view)
      }
    } else {
      // TODO: Web
    }
  }

  stopPreview(channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.stopPreview(channel ?? 0)
      this._rendererController.localViews.delete(channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setVideoConfig(config: zego.ZegoVideoConfig, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setVideoConfig(
        config.captureWidth,
        config.captureHeight,
        config.encodeWidth,
        config.encodeHeight,
        config.fps,
        config.bitrate,
        config.codecID,
        config.keyFrameInterval,
        channel ?? 0
      )
    } else {
      // TODO: Web
    }
  }

  getVideoConfig(channel?: zego.ZegoPublishChannel): zego.ZegoVideoConfig {
    if (this._bridge) {
      let config = this._bridge.getVideoConfig(channel ?? 0) as zego.ZegoVideoConfig
      return config
    } else {
      // TODO: Web
    }
  }

  setVideoMirrorMode(
    mirrorMode: zego.ZegoVideoMirrorMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      this._bridge.setVideoMirrorMode(mirrorMode, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setAppOrientation(orientation: zego.ZegoOrientation, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setAppOrientation(orientation, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setAudioConfig(config: zego.ZegoAudioConfig, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setAudioConfig(config.bitrate, config.channel, config.codecID, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  getAudioConfig(channel?: zego.ZegoPublishChannel): zego.ZegoAudioConfig {
    if (this._bridge) {
      let config = this._bridge.getAudioConfig(channel ?? 0) as zego.ZegoAudioConfig
      return config
    } else {
      // TODO: Web
    }
  }

  setPublishStreamEncryptionKey(key: string, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setPublishStreamEncryptionKey(key, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  mutePublishStreamAudio(mute: boolean, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.mutePublishStreamAudio(mute, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  mutePublishStreamVideo(mute: boolean, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.mutePublishStreamVideo(mute, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  enableTrafficControl(enable: boolean, property: number, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.enableTrafficControl(enable, property, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setMinVideoBitrateForTrafficControl(
    bitrate: number,
    mode: zego.ZegoTrafficControlMinVideoBitrateMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      this._bridge.setMinVideoBitrateForTrafficControl(bitrate, mode, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setMinVideoFpsForTrafficControl(fps: number, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setMinVideoFpsForTrafficControl(fps, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setMinVideoResolutionForTrafficControl(
    width: number,
    height: number,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      this._bridge.setMinVideoResolutionForTrafficControl(width, height, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setCaptureVolume(volume: number): void {
    if (this._bridge) {
      this._bridge.setCaptureVolume(volume)
    } else {
      // TODO: Web
    }
  }

  enableHardwareEncoder(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableHardwareEncoder(enable)
    } else {
      // TODO: Web
    }
  }

  setCapturePipelineScaleMode(mode: zego.ZegoCapturePipelineScaleMode): void {
    if (this._bridge) {
      this._bridge.setCapturePipelineScaleMode(mode)
    } else {
      // TODO: Web
    }
  }

  isVideoEncoderSupported(codecID: zego.ZegoVideoCodecID): boolean {
    if (this._bridge) {
      return this._bridge.isVideoEncoderSupported(codecID)
    } else {
      // TODO: Web
    }
  }

  setAppOrientationMode(mode: zego.ZegoOrientationMode): void {
    if (this._bridge) {
      this._bridge.setAppOrientationMode(mode)
    } else {
      // TODO: Web
    }
  }

  startPlayingStream(
    streamID: string,
    canvas?: zego.ZegoCanvas,
    config?: zego.ZegoPlayerConfig
  ): void {
    if (this._bridge) {
      this._bridge.startPlayingStream(streamID, config ?? null)
      if (canvas) {
        this._rendererController.remoteViews.set(streamID, canvas.view)
      }
    } else {
      // TODO: Web
    }
  }

  stopPlayingStream(streamID: string): void {
    if (this._bridge) {
      this._bridge.stopPlayingStream(streamID)
      this._rendererController.remoteViews.delete(streamID)
    } else {
      // TODO: Web
    }
  }

  setPlayStreamDecryptionKey(streamID: string, key: string): void {
    if (this._bridge) {
      this._bridge.setPlayStreamDecryptionKey(streamID, key)
    } else {
      // TODO: Web
    }
  }

  setPlayVolume(streamID: string, volume: number): void {
    if (this._bridge) {
      this._bridge.setPlayVolume(streamID, volume)
    } else {
      // TODO: Web
    }
  }

  setAllPlayStreamVolume(volume: number): void {
    if (this._bridge) {
      this._bridge.setAllPlayStreamVolume(volume)
    } else {
      // TODO: Web
    }
  }

  setPlayStreamVideoType(streamID: string, streamType: zego.ZegoVideoStreamType): void {
    if (this._bridge) {
      this._bridge.setPlayStreamVideoType(streamID, streamType)
    } else {
      // TODO: Web
    }
  }

  setPlayStreamBufferIntervalRange(
    streamID: string,
    minBufferInterval: number,
    maxBufferInterval: number
  ): void {
    if (this._bridge) {
      this._bridge.setPlayStreamBufferIntervalRange(streamID, minBufferInterval, maxBufferInterval)
    } else {
      // TODO: Web
    }
  }

  setPlayStreamFocusOn(streamID: string): void {
    if (this._bridge) {
      this._bridge.setPlayStreamFocusOn(streamID)
    } else {
      // TODO: Web
    }
  }

  mutePlayStreamAudio(streamID: string, mute: boolean): void {
    if (this._bridge) {
      this._bridge.mutePlayStreamAudio(streamID, mute)
    } else {
      // TODO: Web
    }
  }

  mutePlayStreamVideo(streamID: string, mute: boolean): void {
    if (this._bridge) {
      this._bridge.mutePlayStreamVideo(streamID, mute)
    } else {
      // TODO: Web
    }
  }

  muteAllPlayStreamAudio(mute: boolean): void {
    if (this._bridge) {
      this._bridge.muteAllPlayStreamAudio(mute)
    } else {
      // TODO: Web
    }
  }

  muteAllPlayStreamVideo(mute: boolean): void {
    if (this._bridge) {
      this._bridge.muteAllPlayStreamVideo(mute)
    } else {
      // TODO: Web
    }
  }

  enableHardwareDecoder(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableHardwareDecoder(enable)
    } else {
      // TODO: Web
    }
  }

  enableCheckPoc(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableCheckPoc(enable)
    } else {
      // TODO: Web
    }
  }

  isVideoDecoderSupported(codecID: zego.ZegoVideoCodecID): boolean {
    if (this._bridge) {
      return this._bridge.isVideoDecoderSupported(codecID)
    } else {
      // TODO: Web
    }
  }

  muteMicrophone(mute: boolean): void {
    if (this._bridge) {
      this._bridge.muteMicrophone(mute)
    } else {
      // TODO: Web
    }
  }

  isMicrophoneMuted(): boolean {
    if (this._bridge) {
      return this._bridge.isMicrophoneMuted()
    } else {
      // TODO: Web
    }
  }

  muteSpeaker(mute: boolean): void {
    if (this._bridge) {
      this._bridge.muteSpeaker(mute)
    } else {
      // TODO: Web
    }
  }

  isSpeakerMuted(): boolean {
    if (this._bridge) {
      return this._bridge.isSpeakerMuted()
    } else {
      // TODO: Web
    }
  }

  getAudioDeviceList(deviceType: zego.ZegoAudioDeviceType): zego.ZegoDeviceInfo[] {
    if (this._bridge) {
      return this._bridge.getAudioDeviceList(deviceType) as zego.ZegoDeviceInfo[]
    } else {
      // TODO: Web
    }
  }

  getDefaultAudioDeviceID(deviceType: zego.ZegoAudioDeviceType): string {
    if (this._bridge) {
      return this._bridge.getDefaultAudioDeviceID(deviceType)
    } else {
      // TODO: Web
    }
  }

  useAudioDevice(deviceType: zego.ZegoAudioDeviceType, deviceID: string): void {
    if (this._bridge) {
      this._bridge.useAudioDevice(deviceType, deviceID)
    } else {
      // TODO: Web
    }
  }

  getAudioDeviceVolume(deviceType: zego.ZegoAudioDeviceType, deviceID: string): number {
    if (this._bridge) {
      return this._bridge.getAudioDeviceVolume(deviceType, deviceID)
    } else {
      // TODO: Web
    }
  }

  setAudioDeviceVolume(
    deviceType: zego.ZegoAudioDeviceType,
    deviceID: string,
    volume: number
  ): void {
    if (this._bridge) {
      this._bridge.setAudioDeviceVolume(deviceType, deviceID, volume)
    } else {
      // TODO: Web
    }
  }

  startAudioDeviceVolumeMonitor(deviceType: zego.ZegoAudioDeviceType, deviceID: string): void {
    if (this._bridge) {
      this._bridge.startAudioDeviceVolumeMonitor(deviceType, deviceID)
    } else {
      // TODO: Web
    }
  }

  stopAudioDeviceVolumeMonitor(deviceType: zego.ZegoAudioDeviceType, deviceID: string): void {
    if (this._bridge) {
      this._bridge.stopAudioDeviceVolumeMonitor(deviceType, deviceID)
    } else {
      // TODO: Web
    }
  }

  muteAudioDevice(deviceType: zego.ZegoAudioDeviceType, deviceID: string, mute: boolean): void {
    if (this._bridge) {
      this._bridge.muteAudioDevice(deviceType, deviceID, mute)
    } else {
      // TODO: Web
    }
  }

  setAudioDeviceMode(deviceMode: zego.ZegoAudioDeviceMode): void {
    if (this._bridge) {
      this._bridge.setAudioDeviceMode(deviceMode)
    } else {
      // TODO: Web
    }
  }

  isAudioDeviceMuted(deviceType: zego.ZegoAudioDeviceType, deviceID: string): boolean {
    if (this._bridge) {
      return this._bridge.isAudioDeviceMuted(deviceType, deviceID)
    } else {
      // TODO: Web
    }
  }

  enableAudioCaptureDevice(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableAudioCaptureDevice(enable)
    } else {
      // TODO: Web
    }
  }

  getAudioRouteType(): zego.ZegoAudioRoute {
    if (this._bridge) {
      return this._bridge.getAudioRouteType()
    } else {
      // TODO: Web
    }
  }

  setAudioRouteToSpeaker(defaultToSpeaker: boolean): void {
    if (this._bridge) {
      this._bridge.setAudioRouteToSpeaker(defaultToSpeaker)
    } else {
      // TODO: Web
    }
  }

  enableCamera(enable: boolean, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.enableCamera(enable, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  useFrontCamera(enable: boolean, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.useFrontCamera(enable, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  isCameraFocusSupported(channel?: zego.ZegoPublishChannel): boolean {
    if (this._bridge) {
      return this._bridge.isCameraFocusSupported(channel)
    } else {
      // TODO: Web
    }
  }

  setCameraFocusMode(mode: zego.ZegoCameraFocusMode, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setCameraFocusMode(mode, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setCameraFocusPointInPreview(x: number, y: number, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setCameraFocusPointInPreview(x, y, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setCameraExposureMode(
    mode: zego.ZegoCameraExposureMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      this._bridge.setCameraExposureMode(mode, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setCameraExposurePointInPreview(x: number, y: number, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setCameraExposurePointInPreview(x, y, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setCameraExposureCompensation(value: number, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setCameraExposureCompensation(value, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setCameraZoomFactor(factor: number, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.setCameraZoomFactor(factor, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  getCameraMaxZoomFactor(channel?: zego.ZegoPublishChannel): number {
    if (this._bridge) {
      return this._bridge.getCameraMaxZoomFactor(channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  enableCameraAdaptiveFPS(
    enable: boolean,
    minFPS: number,
    maxFPS: number,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      this._bridge.enableCameraAdaptiveFPS(enable, minFPS, maxFPS, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  useVideoDevice(deviceID: string, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.useVideoDevice(deviceID, channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  getVideoDeviceList(): zego.ZegoDeviceInfo[] {
    if (this._bridge) {
      return this._bridge.getVideoDeviceList() as zego.ZegoDeviceInfo[]
    } else {
      // TODO: Web
    }
  }

  getDefaultVideoDeviceID(): string {
    if (this._bridge) {
      return this._bridge.getDefaultVideoDeviceID()
    } else {
      // TODO: Web
    }
  }

  startSoundLevelMonitor(config?: zego.ZegoSoundLevelConfig): void {
    if (this._bridge) {
      this._bridge.startSoundLevelMonitor(config?.millisecond ?? 100, config?.enableVAD ?? false)
    } else {
      // TODO: Web
    }
  }

  stopSoundLevelMonitor(): void {
    if (this._bridge) {
      this._bridge.stopSoundLevelMonitor()
    } else {
      // TODO: Web
    }
  }

  startAudioSpectrumMonitor(millisecond?: number): void {
    if (this._bridge) {
      this._bridge.startAudioSpectrumMonitor(millisecond ?? 100)
    } else {
      // TODO: Web
    }
  }

  stopAudioSpectrumMonitor(): void {
    if (this._bridge) {
      this._bridge.stopAudioSpectrumMonitor()
    } else {
      // TODO: Web
    }
  }

  enableHeadphoneMonitor(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableHeadphoneMonitor(enable)
    } else {
      // TODO: Web
    }
  }

  setHeadphoneMonitorVolume(volume: number): void {
    if (this._bridge) {
      this._bridge.setHeadphoneMonitorVolume(volume)
    } else {
      // TODO: Web
    }
  }

  enableMixSystemPlayout(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableMixSystemPlayout(enable)
    } else {
      // TODO: Web
    }
  }

  setMixSystemPlayoutVolume(volume: number): void {
    if (this._bridge) {
      this._bridge.setMixSystemPlayoutVolume(volume)
    } else {
      // TODO: Web
    }
  }

  enableMixEnginePlayout(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableMixEnginePlayout(enable)
    } else {
      // TODO: Web
    }
  }

  startAudioVADStableStateMonitor(
    type: zego.ZegoAudioVADStableStateMonitorType,
    millisecond: number
  ): void {
    if (this._bridge) {
      this._bridge.startAudioVADStableStateMonitor(type, millisecond)
    } else {
      // TODO: Web
    }
  }

  stopAudioVADStableStateMonitor(type: zego.ZegoAudioVADStableStateMonitorType): void {
    if (this._bridge) {
      this._bridge.stopAudioVADStableStateMonitor(type)
    } else {
      // TODO: Web
    }
  }

  getCurrentAudioDevice(deviceType: zego.ZegoAudioDeviceType): zego.ZegoDeviceInfo {
    if (this._bridge) {
      return this._bridge.getCurrentAudioDevice(deviceType) as zego.ZegoDeviceInfo
    } else {
      // TODO: Web
    }
  }

  enableAEC(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableAEC(enable)
    } else {
      // TODO: Web
    }
  }

  enableHeadphoneAEC(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableHeadphoneAEC(enable)
    } else {
      // TODO: Web
    }
  }

  setAECMode(mode: zego.ZegoAECMode): void {
    if (this._bridge) {
      this._bridge.setAECMode(mode)
    } else {
      // TODO: Web
    }
  }

  enableAGC(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableAGC(enable)
    } else {
      // TODO: Web
    }
  }

  enableANS(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableANS(enable)
    } else {
      // TODO: Web
    }
  }

  enableTransientANS(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableTransientANS(enable)
    } else {
      // TODO: Web
    }
  }

  setANSMode(mode: zego.ZegoANSMode): void {
    if (this._bridge) {
      this._bridge.setANSMode(mode)
    } else {
      // TODO: Web
    }
  }

  startEffectsEnv(): void {
    if (this._bridge) {
      this._bridge.startEffectsEnv()
    } else {
      // TODO: Web
    }
  }

  stopEffectsEnv(): void {
    if (this._bridge) {
      this._bridge.stopEffectsEnv()
    } else {
      // TODO: Web
    }
  }

  enableEffectsBeauty(enable: boolean): void {
    if (this._bridge) {
      this._bridge.enableEffectsBeauty(enable)
    } else {
      // TODO: Web
    }
  }

  setEffectsBeautyParam(param: zego.ZegoEffectsBeautyParam): void {
    if (this._bridge) {
      this._bridge.setEffectsBeautyParam(param)
    } else {
      // TODO: Web
    }
  }

  setAudioEqualizerGain(bandIndex: number, bandGain: number): void {
    if (this._bridge) {
      this._bridge.setAudioEqualizerGain(bandIndex, bandGain)
    } else {
      // TODO: Web
    }
  }

  setVoiceChangerPreset(preset: zego.ZegoVoiceChangerPreset): void {
    if (this._bridge) {
      this._bridge.setVoiceChangerPreset(preset)
    } else {
      // TODO: Web
    }
  }

  setVoiceChangerParam(param: zego.ZegoVoiceChangerParam): void {
    if (this._bridge) {
      this._bridge.setVoiceChangerParam(param)
    } else {
      // TODO: Web
    }
  }

  setReverbPreset(preset: zego.ZegoReverbPreset): void {
    if (this._bridge) {
      this._bridge.setReverbPreset(preset)
    } else {
      // TODO: Web
    }
  }

  setReverbAdvancedParam(param: zego.ZegoReverbAdvancedParam): void {
    if (this._bridge) {
      this._bridge.setReverbAdvancedParam(param)
    } else {
      // TODO: Web
    }
  }

  setReverbEchoParam(param: zego.ZegoReverbEchoParam): void {
    if (this._bridge) {
      this._bridge.setReverbEchoParam(param)
    } else {
      // TODO: Web
    }
  }

  enableVirtualStereo(enable: boolean, angle: number): void {
    if (this._bridge) {
      this._bridge.enableVirtualStereo(enable, angle)
    } else {
      // TODO: Web
    }
  }

  enablePlayStreamVirtualStereo(enable: boolean, angle: number, streamID: string): void {
    if (this._bridge) {
      this._bridge.enablePlayStreamVirtualStereo(enable, angle, streamID)
    } else {
      // TODO: Web
    }
  }

  setElectronicEffects(enable: boolean, mode: zego.ZegoElectronicEffectsMode, tonal: number): void {
    if (this._bridge) {
      this._bridge.setElectronicEffects(enable, mode, tonal)
    } else {
      // TODO: Web
    }
  }

  startPerformanceMonitor(millisecond?: number): void {
    if (this._bridge) {
      this._bridge.startPerformanceMonitor(millisecond ?? 2000)
    } else {
      // TODO: Web
    }
  }

  stopPerformanceMonitor(): void {
    if (this._bridge) {
      this._bridge.stopPerformanceMonitor()
    } else {
      // TODO: Web
    }
  }
}
