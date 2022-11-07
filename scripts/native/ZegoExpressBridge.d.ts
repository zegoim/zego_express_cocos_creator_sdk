// Native JSB

declare class ZegoExpressBridge {
  static getVersion(): string

  createEngine(appID: number, appSign: string, scenario: number): void
  destroyEngine(): void

  setEventHandler(handler: Object): void

  loginRoom(roomID: string, userID: string, userName: string): void
  logoutRoom(roomID: string): void

  startPreview(channel: number, viewID: number): void
  stopPreview(channel: number): void

  startPublishingStream(
    streamID: string,
    roomID: string,
    forceSynchronousNetworkTime: number,
    streamCensorshipMode: number,
    channel: number
  ): void

  stopPublishingStream(channel: number): void

  startPlayingStream(streamID: string, viewID: number): void
  stopPlayingStream(streamID: string): void

  // Private: Render methods
  setJsTextureRendererController(controller: Object): void
}
