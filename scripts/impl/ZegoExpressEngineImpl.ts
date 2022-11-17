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
      this._bridge.startPlayingStream(streamID)
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
}
