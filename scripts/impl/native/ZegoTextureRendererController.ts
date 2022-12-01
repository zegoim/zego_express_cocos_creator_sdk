import { gfx, Sprite, SpriteFrame, Texture2D } from 'cc'
import { ZegoPublishChannel } from '../../ZegoExpressDefines'

export class ZegoTextureRendererController {
  onCapturedVideoFrameRawData(
    channel: ZegoPublishChannel,
    data: Uint8Array,
    dataLength: number,
    width: number,
    height: number,
    rotation: number,
    flipMode: number
  ) {
    let sprite = this.localViews.get(channel)
    if (!sprite) {
      return
    }

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

  onRemoteVideoFrameRawData(
    streamID: String,
    data: Uint8Array,
    dataLength: number,
    width: number,
    height: number,
    rotation: number
  ) {
    let sprite = this.remoteViews.get(streamID)
    if (!sprite) {
      return
    }

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

  localViews = new Map<ZegoPublishChannel, Sprite>()
  remoteViews = new Map<String, Sprite>()
}
