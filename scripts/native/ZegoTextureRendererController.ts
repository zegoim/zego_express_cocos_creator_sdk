import { gfx, Sprite, SpriteFrame, Texture2D } from 'cc'
import { ZegoTextureRenderer } from '../ZegoTextureRenderer'
import { ZegoPublishChannel } from './ZegoExpressDefines'

export class ZegoTextureRendererController {
  createTextureRenderer(textureId: number): ZegoTextureRenderer {
    let renderer = new ZegoTextureRenderer(textureId)
    // this._renderers[textureId] = renderer
    this._renderers.set(textureId, renderer)
    return renderer
  }

  destroyTextureRenderer(textureId: number): void {
    this._renderers.delete(textureId)
  }

  updateRendererSize(textureId: number, width: number, height: number): void {
    let renderer = this._renderers.get(textureId)
    if (renderer) {
      renderer.updateSize(width, height)
    }
  }

  // frameBufferAvailable(textureId: number) {

  // }

  onCapturedVideoFrameRawData(channel: ZegoPublishChannel, data: Uint8Array, dataLength: number, width: number, height: number, rotation: number, flipMode: number) {
    console.log("js onCapturedVideoFrameRawData!!! dataLength:", dataLength, "w:", width, "h:", height)

    let sprite = this.localViews.get(channel)
    let texture = new Texture2D()
    texture.reset({
      width: width,
      height: height,
      format: gfx.Format.RGBA8,
    })
    texture.uploadData(data)
    sprite.spriteFrame = new SpriteFrame()
    sprite.spriteFrame.texture = texture
  }

  onRemoteVideoFrameRawData(streamID: String, data: Uint8Array, dataLength: number, width: number, height: number, rotation: number) {
    console.log("js onRemoteVideoFrameRawData!!! dataLength:", dataLength, "w:", width, "h:", height)

    let sprite = this.remoteViews.get(streamID)
    let texture = new Texture2D()
    texture.reset({
      width: width,
      height: height,
      format: gfx.Format.RGBA8,
    })
    texture.uploadData(data)
    sprite.spriteFrame = new SpriteFrame()
    sprite.spriteFrame.texture = texture
  }
  private _renderers = new Map<number, ZegoTextureRenderer>()

  localViews = new Map<ZegoPublishChannel, Sprite>()
  remoteViews = new Map<String, Sprite>()
}
