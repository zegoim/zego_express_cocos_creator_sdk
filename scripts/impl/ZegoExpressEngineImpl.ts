import { JSB } from 'cc/env'
import {
  ZegoEngineProfile,
  ZegoUser,
  ZegoPublishChannel,
  ZegoCanvas,
  ZegoPublisherConfig,
} from './native/ZegoExpressDefines'
import { ZegoExpressEventHandler } from '../native/ZegoExpressEventHandler'
import { ZegoTextureRendererController } from '../native/ZegoTextureRendererController'
import ZegoExpressEngine from '../ZegoExpressEngine'
import { ZegoEventHandler } from '../ZegoExpressEventHandler'
import {
  ZegoRoomConfig,
  ZegoRoomLoginCallback,
  ZegoRoomLogoutCallback,
  ZegoUser,
} from '../ZegoExpressDefines'

export class ZegoExpressEngineImpl extends ZegoExpressEngine {
  private _instance: ZegoExpressEngineImpl
  private _bridge: ZegoExpressBridge
  private _rendererController: ZegoTextureRendererController

  get instance(): ZegoExpressEngineImpl {
    if (!this._instance) {
      this._instance = new ZegoExpressEngineImpl()
    }
    return this._instance
  }

  constructor() {
    super()
    this._bridge = new ZegoExpressBridge()
    this._rendererController = new ZegoTextureRendererController()
    this._bridge.setJsTextureRendererController(this._rendererController)
  }

  createEngine(profile: ZegoEngineProfile, evnetHandler?: ZegoEventHandler): void {
    if (JSB) {
      console.log('[ZegoExpressEngine] create engine', this._bridge)
      this._bridge.createEngine(profile.appID, profile.appSign, profile.scenario ?? 0)
      console.log('[ZegoExpressEngine] bridge:', this._bridge)
      if (evnetHandler) {
        this._bridge.setEventHandler(evnetHandler)
      }
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

  loginRoom(
    roomID: string,
    user: ZegoUser,
    config?: ZegoRoomConfig | undefined,
    callback?: ZegoRoomLoginCallback | undefined
  ): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.loginRoom(roomID, user.userID, user.userName)
    } else {
      // TODO: Web
    }
  }

  logoutRoom(roomID?: string | undefined, callback?: ZegoRoomLogoutCallback | undefined): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      this._bridge.logoutRoom(roomID ?? '')
    } else {
      // TODO: Web
    }
  }

  switchRoom(fromRoomID: string, toRoomID: string, config?: ZegoRoomConfig | undefined): void {
    throw new Error('Method not implemented.')
  }

  startPreview(channel?: ZegoPublishChannel, canvas?: ZegoCanvas): void {
    if (JSB) {
      if (!this._bridge) {
        return
      }
      console.log('[startPreview] channel:', channel, ' canvas:', canvas)
      this._bridge.startPreview(channel ?? 0)
      if (canvas) {
        this._rendererController.localViews.set(channel, canvas.view)
      }
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
        config ? config.roomID ?? '' : '',
        config ? config.forceSynchronousNetworkTime ?? 0 : 0,
        config ? config.streamCensorshipMode ?? 0 : 0,
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
      this._bridge.startPlayingStream(streamID)

      if (canvas) {
        this._rendererController.remoteViews.set(streamID, canvas.view)
      }
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
}
