import { _decorator, Sprite, SpriteFrame, Texture2D, gfx } from 'cc'

const { ccclass } = _decorator

@ccclass('ZegoTextureRenderer')
export class ZegoTextureRenderer {
  private _textureId: number
  private _texture: Texture2D = null
  private _sprite: Sprite = null

  constructor(textureId: number) {
    this._textureId = textureId
    this._texture = new Texture2D()
    this._texture.setFilters(Texture2D.Filter.LINEAR, Texture2D.Filter.LINEAR)
    this._texture.setMipFilter(Texture2D.Filter.LINEAR)
    this._texture.setWrapMode(Texture2D.WrapMode.CLAMP_TO_EDGE, Texture2D.WrapMode.CLAMP_TO_EDGE)
    this.updateSize(0, 0)
  }

  set sprite(value: Sprite) {
    this._sprite = value
    this._sprite.spriteFrame = new SpriteFrame()
    this._sprite.spriteFrame.texture = this._texture
  }

  get textureId(): number {
    return this._textureId
  }

  updateSize(width: number, height: number) {
    this._texture.reset({
      width: width,
      height: height,
      format: gfx.Format.RGBA8,
    })
  }

  updateFrameBuffer(data: Uint8Array) {
    this._texture.uploadData(data)
  }
}
