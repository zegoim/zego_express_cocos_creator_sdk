// Native JSB

declare class ZegoExpressBridge {
  // Private: Render methods
  setJsTextureRendererController(controller: Object): void

  createEngine(appID: number, appSign: string, scenario: number): void
  destroyEngine(callback: Object): void

  setEngineConfig(advancedConfig: Map<string, string>): void
  setLogConfig(logPath: string, logSize: number): void
  setRoomMode(mode: number): void
  getVersion(): string
  setApiCalledCallback(callback: Object): void
  isFeatureSupported(featureType: number): boolean

  setEventHandler(handler: Object): void
  setRoomScenario(scenario: number): void
  uploadLog(callback: Object): void
  enableDebugAssistant(enable: boolean): void
  callExperimentalAPI(params: string): string

  loginRoom(
    roomID: string,
    userID: string,
    userName: string,
    maxMemberCount: number,
    isUserStatusNotify: boolean,
    token: string,
    callback: Object
  ): void
  logoutRoom(roomID: string, callback: Object): void

  startPreview(channel: number): void
  stopPreview(channel: number): void

  startPublishingStream(
    streamID: string,
    roomID: string,
    forceSynchronousNetworkTime: number,
    streamCensorshipMode: number,
    channel: number
  ): void

  stopPublishingStream(channel: number): void

  startPlayingStream(streamID: string): void
  stopPlayingStream(streamID: string): void
}
