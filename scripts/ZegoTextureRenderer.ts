import { _decorator, Sprite, SpriteFrame, Texture2D, __private } from 'cc'

const { ccclass } = _decorator

@ccclass('ZegoTextureRenderer')
export class ZegoTextureRenderer extends Sprite {

  private _textureId: number
  private texture: Texture2D = null

  constructor(textureId: number) {
    super()
    this._textureId = textureId
    this.texture = new Texture2D()
    this.spriteFrame = new SpriteFrame()
    this.spriteFrame.texture = this.texture
  }

  textureId(): number {
    return this._textureId
  }

  updateSize(width: number, height: number) {
    this.texture.reset({
      width: width,
      height: height,
      format: __private._cocos_core_assets_asset_enum__PixelFormat.RGBA8888
    })
  }

  updateFrameBuffer(data: Uint8Array) {
    this.texture.uploadData(data)
  }
}
