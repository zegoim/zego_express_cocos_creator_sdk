import { JSB } from 'cc/env'
import * as zego from '../ZegoExpressDefines'
import { ZegoExpressEngine } from '../ZegoExpressEngine'
import { ZegoEventHandler, ZegoApiCalledEventHandler } from '../ZegoExpressEventHandler'
import { ZegoTextureRendererController } from './native/ZegoTextureRendererController'

export class ZegoExpressEngineImpl extends ZegoExpressEngine {
  private static _instance: ZegoExpressEngineImpl | undefined
  private _bridge: ZegoExpressBridge | undefined
  private _rendererController: ZegoTextureRendererController | undefined

  static get instance(): ZegoExpressEngineImpl {
    if (!ZegoExpressEngineImpl._instance) {
      ZegoExpressEngineImpl._instance = new ZegoExpressEngineImpl()
    }
    return ZegoExpressEngineImpl._instance
  }

  constructor() {
    super()
    if (JSB) {
      this._bridge = new ZegoExpressBridge()
      this._rendererController = new ZegoTextureRendererController()
      this._bridge.setJsTextureRendererController(this._rendererController)
    } else {
      // TODO: Web
    }
  }

  static createEngine(
    profile: zego.ZegoEngineProfile,
    eventHandler?: ZegoEventHandler
  ): ZegoExpressEngine {
    console.log('[ZegoExpressEngineImpl] create engine')
    if (ZegoExpressEngineImpl.instance._bridge) {
      ZegoExpressEngineImpl.instance._bridge.createEngine(
        profile.appID ?? 0,
        profile.appSign ?? '',
        profile.scenario ?? 0
      )
      ZegoExpressEngineImpl.instance._bridge.setEventHandler(eventHandler)
    } else {
      // TODO: Web
    }
    return ZegoExpressEngineImpl.instance
  }

  static destroyEngine(callback?: zego.ZegoDestroyCompletionCallback): void {
    if (ZegoExpressEngineImpl.instance._bridge) {
      ZegoExpressEngineImpl.instance._bridge.destroyEngine(callback)
    } else {
      // TODO: Web
    }
  }

  static setEngineConfig(config: zego.ZegoEngineConfig): void {
    if (ZegoExpressEngineImpl.instance._bridge) {
      ZegoExpressEngineImpl.instance._bridge.setEngineConfig(config.advancedConfig)
    } else {
      // TODO: Web
    }
  }

  static setLogConfig(config: zego.ZegoLogConfig): void {
    if (ZegoExpressEngineImpl.instance._bridge) {
      ZegoExpressEngineImpl.instance._bridge.setLogConfig(config.logPath, config.logSize)
    } else {
      // TODO: Web
    }
  }

  static setRoomMode(mode: zego.ZegoRoomMode): void {
    if (ZegoExpressEngineImpl.instance._bridge) {
      ZegoExpressEngineImpl.instance._bridge.setRoomMode(mode)
    } else {
      // TODO: Web
    }
  }

  static getVersion(): string {
    if (ZegoExpressEngineImpl.instance._bridge) {
      return ZegoExpressEngineImpl.instance._bridge.getVersion()
    } else {
      // TODO: Web
    }
  }

  static setApiCalledCallback(callback: ZegoApiCalledEventHandler): void {
    if (ZegoExpressEngineImpl.instance._bridge) {
      ZegoExpressEngineImpl.instance._bridge.setApiCalledCallback(callback)
    } else {
      // TODO: Web
    }
  }

  static isFeatureSupported(featureType: zego.ZegoFeatureType): boolean {
    if (ZegoExpressEngineImpl.instance._bridge) {
      return ZegoExpressEngineImpl.instance._bridge.isFeatureSupported(featureType)
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
  uploadLog(callback: zego.ZegoUploadLogResultCallback): void {
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
      if (!this._bridge) {
        return
      }
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
      if (!this._bridge) {
        return
      }
      this._bridge.logoutRoom(roomID ?? '', callback)
    } else {
      // TODO: Web
    }
  }

  switchRoom(fromRoomID: string, toRoomID: string, config?: zego.ZegoRoomConfig): void {
    throw new Error('Method not implemented.')
  }

  renewToken(roomID: string, token: string): void {
    throw new Error('Method not implemented.')
  }

  setRoomExtraInfo(
    roomID: string,
    key: string,
    value: string,
    callback: zego.ZegoRoomSetRoomExtraInfoCallback
  ): void {
    throw new Error('Method not implemented.')
  }

  startPublishingStream(
    streamID: string,
    config?: zego.ZegoPublisherConfig,
    channel?: zego.ZegoPublishChannel
  ): void {
    if (this._bridge) {
      console.log('[startPublishingStream] streamID:', streamID, ' channel:', channel)
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
    throw new Error('Method not implemented.')
  }
  startPreview(canvas?: zego.ZegoCanvas, channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      console.log('[startPreview] channel:', channel, ' canvas:', canvas)
      this._bridge.startPreview(channel ?? 0)
      if (canvas) {
        this._rendererController.localViews.set(channel, canvas.view)
      }
    } else {
      // TODO: Web
    }
  }

  stopPreview(channel?: zego.ZegoPublishChannel): void {
    if (this._bridge) {
      this._bridge.stopPreview(channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  setVideoConfig(config: zego.ZegoVideoConfig, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  getVideoConfig(channel?: zego.ZegoPublishChannel): zego.ZegoVideoConfig {
    throw new Error('Method not implemented.')
  }
  setVideoMirrorMode(
    mirrorMode: zego.ZegoVideoMirrorMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    throw new Error('Method not implemented.')
  }
  setAppOrientation(orientation: zego.ZegoOrientation, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  setAudioConfig(config: zego.ZegoAudioConfig, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  getAudioConfig(channel?: zego.ZegoPublishChannel): zego.ZegoAudioConfig {
    throw new Error('Method not implemented.')
  }
  setPublishStreamEncryptionKey(key: string, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  mutePublishStreamAudio(mute: boolean, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  mutePublishStreamVideo(mute: boolean, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  enableTrafficControl(enable: boolean, property: number, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  setMinVideoBitrateForTrafficControl(
    bitrate: number,
    mode: zego.ZegoTrafficControlMinVideoBitrateMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    throw new Error('Method not implemented.')
  }
  setMinVideoFpsForTrafficControl(fps: number, channel?: zego.ZegoPublishChannel): void {
    throw new Error('Method not implemented.')
  }
  setMinVideoResolutionForTrafficControl(
    width: number,
    height: number,
    channel?: zego.ZegoPublishChannel
  ): void {
    throw new Error('Method not implemented.')
  }
  setCaptureVolume(volume: number): void {
    throw new Error('Method not implemented.')
  }
  enableHardwareEncoder(enable: boolean): void {
    throw new Error('Method not implemented.')
  }
  setCapturePipelineScaleMode(mode: zego.ZegoCapturePipelineScaleMode): void {
    throw new Error('Method not implemented.')
  }
  isVideoEncoderSupported(codecID: zego.ZegoVideoCodecID): boolean {
    throw new Error('Method not implemented.')
  }
  setAppOrientationMode(mode: zego.ZegoOrientationMode): void {
    throw new Error('Method not implemented.')
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
    } else {
      // TODO: Web
    }
  }

  setPlayStreamDecryptionKey(streamID: string, key: string): void {
    throw new Error('Method not implemented.')
  }
  setPlayVolume(streamID: string, volume: number): void {
    throw new Error('Method not implemented.')
  }
  setAllPlayStreamVolume(volume: number): void {
    throw new Error('Method not implemented.')
  }
  setPlayStreamVideoType(streamID: string, streamType: zego.ZegoVideoStreamType): void {
    throw new Error('Method not implemented.')
  }
  setPlayStreamBufferIntervalRange(
    streamID: string,
    minBufferInterval: number,
    maxBufferInterval: number
  ): void {
    throw new Error('Method not implemented.')
  }
  setPlayStreamFocusOn(streamID: string): void {
    throw new Error('Method not implemented.')
  }
  mutePlayStreamAudio(streamID: string, mute: boolean): void {
    throw new Error('Method not implemented.')
  }
  mutePlayStreamVideo(streamID: string, mute: boolean): void {
    throw new Error('Method not implemented.')
  }
  muteAllPlayStreamAudio(mute: boolean): void {
    throw new Error('Method not implemented.')
  }
  muteAllPlayStreamVideo(mute: boolean): void {
    throw new Error('Method not implemented.')
  }
  enableHardwareDecoder(enable: boolean): void {
    throw new Error('Method not implemented.')
  }
  enableCheckPoc(enable: boolean): void {
    throw new Error('Method not implemented.')
  }
  isVideoDecoderSupported(codecID: zego.ZegoVideoCodecID): boolean {
    throw new Error('Method not implemented.')
  }
}
