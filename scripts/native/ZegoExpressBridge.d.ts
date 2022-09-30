// Native JSB

import { ZegoTextureRendererController } from "./ZegoTextureRendererController";

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


  // Private: Render methods

  createTextureRenderer(): number
  destroyTextureRenderer(textureId: number): void
  setJsTextureRendererController(controller: ZegoTextureRendererController): void
}
