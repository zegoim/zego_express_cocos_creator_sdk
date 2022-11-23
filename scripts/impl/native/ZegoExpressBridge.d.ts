// Native JSB

declare class ZegoExpressBridge {
  // Private
  setJsTextureRendererController(controller: Object): void

  // #region Main module
  createEngine(appID: number, appSign: string, scenario: number): void
  destroyEngine(callback: Function): void
  setEngineConfig(advancedConfig: Map<string, string>): void
  setLogConfig(logPath: string, logSize: number): void
  setRoomMode(mode: number): void
  getVersion(): string
  setApiCalledCallback(callback: Object): void
  isFeatureSupported(featureType: number): boolean
  setEventHandler(handler: Object): void
  setRoomScenario(scenario: number): void
  uploadLog(callback: Function): void
  enableDebugAssistant(enable: boolean): void
  callExperimentalAPI(params: string): string
  // #endregion

  // #region Room module
  loginRoom(
    roomID: string,
    userID: string,
    userName: string,
    maxMemberCount: number,
    isUserStatusNotify: boolean,
    token: string,
    callback: Function
  ): void
  logoutRoom(roomID: string, callback: Function): void
  switchRoom(
    fromRoomID: string,
    toRoomID: string,
    maxMemberCount: number,
    isUserStatusNotify: boolean,
    token: string
  ): void
  renewToken(roomID: string, token: string): void
  setRoomExtraInfo(roomID: string, key: string, value: string, callback: Function): void
  // #endregion

  // #region Publisher module
  startPublishingStream(
    streamID: string,
    roomID: string,
    forceSynchronousNetworkTime: number,
    streamCensorshipMode: number,
    channel: number
  ): void
  stopPublishingStream(channel: number): void
  setStreamExtraInfo(extraInfo: string, channel: number, callback: Function): void
  startPreview(channel: number): void
  stopPreview(channel: number): void
  setVideoConfig(
    captureWidth: number,
    captureHeight: number,
    encodeWidth: number,
    encodeHeight: number,
    fps: number,
    bitrate: number,
    codecID: number,
    keyFrameInterval: number,
    channel: number
  ): void
  getVideoConfig(channel: number): Object
  setVideoMirrorMode(mirrorMode: number, channel: number): void
  setAppOrientation(orientation: number, channel: number): void
  setAudioConfig(bitrate: number, audioChannel: number, codecID: number, channel: number): void
  getAudioConfig(channel: number): Object
  setPublishStreamEncryptionKey(key: string, channel: number): void
  mutePublishStreamAudio(mute: boolean, channel: number): void
  mutePublishStreamVideo(mute: boolean, channel: number): void
  enableTrafficControl(enable: boolean, property: number, channel: number): void
  setMinVideoBitrateForTrafficControl(bitrate: number, mode: number, channel: number): void
  setMinVideoFpsForTrafficControl(fps: number, channel: number): void
  setMinVideoResolutionForTrafficControl(width: number, height: number, channel: number): void
  setCaptureVolume(volume: number): void
  enableHardwareEncoder(enable: boolean): void
  setCapturePipelineScaleMode(mode: number): void
  isVideoEncoderSupported(codecID: number): boolean
  setAppOrientationMode(mode: number): void
  // #endregion

  // #region Player module
  startPlayingStream(streamID: string, config: Object | null): void
  stopPlayingStream(streamID: string): void
  setPlayStreamDecryptionKey(streamID: string, key: string): void
  setPlayVolume(streamID: string, volume: number): void
  setAllPlayStreamVolume(volume: number): void
  setPlayStreamVideoType(streamID: string, streamType: number): void
  setPlayStreamBufferIntervalRange(
    streamID: string,
    minBufferInterval: number,
    maxBufferInterval: number
  ): void
  setPlayStreamFocusOn(streamID: string): void
  mutePlayStreamAudio(streamID: string, mute: boolean): void
  mutePlayStreamVideo(streamID: string, mute: boolean): void
  muteAllPlayStreamAudio(mute: boolean): void
  muteAllPlayStreamVideo(mute: boolean): void
  enableHardwareDecoder(enable: boolean): void
  enableCheckPoc(enable: boolean): void
  isVideoDecoderSupported(codecID: number): boolean
  // #endregion
}
