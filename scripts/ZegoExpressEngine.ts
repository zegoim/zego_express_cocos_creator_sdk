import { JSB } from 'cc/env'
import {
  ZegoEngineProfile,
  ZegoUser,
  ZegoPublishChannel,
  ZegoCanvas,
  ZegoPublisherConfig,
} from './native/ZegoExpressDefines'
import { ZegoExpressEventHandler } from './native/ZegoExpressEventHandler'
import { ZegoTextureRendererController } from './native/ZegoTextureRendererController'
import { ZegoTextureRenderer } from './ZegoTextureRenderer'

export class ZegoExpressEngine {
  private _bridge: ZegoExpressBridge
  private _rendererController: ZegoTextureRendererController

  constructor() {
    this._bridge = new ZegoExpressBridge()
    this._rendererController = new ZegoTextureRendererController()
    this._bridge.setJsTextureRendererController(this._rendererController)
  }

  createEngine(profile: ZegoEngineProfile): void {
    if (JSB) {
      console.log('[ZegoExpressEngine] create engine', this._bridge)
      this._bridge.createEngine(profile.appID, profile.appSign, profile.scenario ?? 0)
      console.log('[ZegoExpressEngine] bridge:', this._bridge)
    } else {
      // TODO: Web
    }
  }

  destroyEngine(): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.destroyEngine()
    } else {
      // TODO: Web
    }
  }

  setEventHandler(handler: ZegoExpressEventHandler): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.setEventHandler(handler)
    } else {
      // TODO: Web
    }
  }

  loginRoom(roomID: string, user: ZegoUser): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.loginRoom(roomID, user.userID, user.userName)
    } else {
      // TODO: Web
    }
  }

  logoutRoom(roomID?: string): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.logoutRoom(roomID ?? '')
    } else {
      // TODO: Web
    }
  }

  startPreview(channel?: ZegoPublishChannel, canvas?: ZegoCanvas): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      console.log('[startPreview] channel:', channel, ' canvas:', canvas)
      this._bridge.startPreview(channel ?? 0, canvas ? canvas.view : -1)
    } else {
      // TODO: Web
    }
  }

  stopPreview(channel?: ZegoPublishChannel): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.stopPreview(channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  startPublishingStream(
    streamID: string,
    config?: ZegoPublisherConfig,
    channel?: ZegoPublishChannel
  ) {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      console.log('[startPublishingStream] streamID:', streamID, ' channel:', channel)
      this._bridge.startPublishingStream(
        streamID,
        config.roomID ?? '',
        config.forceSynchronousNetworkTime ?? 0,
        config.streamCensorshipMode ?? 0,
        channel ?? 0
      )
    } else {
      // TODO: Web
    }
  }

  stopPublishingStream(channel?: ZegoPublishChannel) {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.stopPublishingStream(channel ?? 0)
    } else {
      // TODO: Web
    }
  }

  startPlayingStream(streamID: string, canvas?: ZegoCanvas) {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.startPlayingStream(streamID, canvas ? canvas.view : -1)
    } else {
      // TODO: Web
    }
  }

  stopPlayingStream(streamID: string) {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.stopPlayingStream(streamID)
    } else {
      // TODO: Web
    }
  }

  createTextureRenderer(): ZegoTextureRenderer {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      let textureId = this._bridge.createTextureRenderer()
      console.log('[createTextureRenderer] texture id:', textureId)
      let renderer = this._rendererController.createTextureRenderer(textureId)
      return renderer
    } else {
      // TODO: Web
      return null
    }
  }

  destroyTextureRenderer(textureId: number): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      console.log('[destroyTextureRenderer] texture id:', textureId)
      this._bridge.destroyTextureRenderer(textureId)
      this._rendererController.destroyTextureRenderer(textureId)
    } else {
      // TODO: Web
    }
  }
}
