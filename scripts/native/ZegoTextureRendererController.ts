import { ZegoTextureRenderer } from "../ZegoTextureRenderer";

export class ZegoTextureRendererController {
    createTextureRenderer(textureId: number): ZegoTextureRenderer {
        let renderer = new ZegoTextureRenderer(textureId)
        this._renderers[textureId] = renderer
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

    updateRendererFrameBuffer(textureId: number, data: Uint8Array) {
        let renderer = this._renderers.get(textureId)
        if (renderer) {
            renderer.updateFrameBuffer(data)
        }
    }

    private _renderers = new Map()
}
