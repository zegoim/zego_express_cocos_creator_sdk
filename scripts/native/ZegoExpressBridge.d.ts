// Native JSB

import { ZegoPublishChannel } from './ZegoExpressEnums'
import { ZegoExpressEventHandler } from './ZegoExpressEventHandler'
import { ZegoTextureRendererController } from './ZegoTextureRendererController'

declare class ZegoExpressBridge {
  static getVersion(): string

  createEngine(profile: ZegoEngineProfile): void
  destroyEngine(): void

  setEventHandler(handler: ZegoExpressEventHandler): void

  loginRoom(roomID: string, user: ZegoUser): void
  logoutRoom(roomID: string): void
  logoutRoom(): void

  startPreview(): void
  startPreview(channel: ZegoPublishChannel, viewID: number): void

  stopPreview(): void
  stopPreview(channel: ZegoPublishChannel): void

  // startPublishingStream(streamID: string): void
  startPublishingStream(
    streamID: string,
    config: ZegoPublisherConfig,
    channel: ZegoPublishChannel
  ): void

  // stopPublishingStream(): void
  stopPublishingStream(channel: ZegoPublishChannel): void

  // startPlayingStream(streamID: string): void
  startPlayingStream(streamID: string, viewID: number): void

  stopPlayingStream(streamID: string): void

  // Private: Render methods

  createTextureRenderer(): number
  destroyTextureRenderer(textureId: number): void
  setJsTextureRendererController(controller: ZegoTextureRendererController): void
}
