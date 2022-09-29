// Native JSB

declare class ZegoExpressBridge {
  static getVersion(): string

  createEngine(profile: ZegoEngineProfile): void
  destroyEngine(): void

  setEventHandler(handler: ZegoExpressEventHandler): void

  loginRoom(roomID: string, user: ZegoUser): void
  logoutRoom(roomID: string): void
  logoutRoom(): void

  startPreview(): void
  startPreview(channel: ZegoPublishChannel): void

  stopPreview(): void
  stopPreview(channel: ZegoPublishChannel): void

  // Callbacks

  // onRoomStateUpdate: Function
}
