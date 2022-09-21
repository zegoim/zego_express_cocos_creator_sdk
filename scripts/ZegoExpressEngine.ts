import {JSB} from 'cc/env'

export class ZegoExpressEngine {

    private _bridge: ZegoExpressBridge

    constructor() {
        this._bridge = new ZegoExpressBridge()
    }

    createEngine(profile: ZegoEngineProfile): void {
        if (JSB) {
            console.log('[ZegoExpressEngine] create engine', this._bridge)
            this._bridge.createEngine(profile)
            console.log('[ZegoExpressEngine] bridge:', this._bridge)
        } else {
            // TODO: Web
        }
    }

    destroyEngine(): void {
        if (JSB) {
            if (!this._bridge) { return }
            this._bridge.destroyEngine()
        } else {
            // TODO: Web
        }
    }

    setEventHandler(handler: ZegoExpressEventHandler): void {
        if (JSB) {
            if (!this._bridge) { return }
            this._bridge.setEventHandler(handler)
        } else {
            // TODO: Web
        }
    }

    loginRoom(roomID: string, user: ZegoUser): void {
        if (JSB) {
            if (!this._bridge) { return }
            this._bridge.loginRoom(roomID, user)
        } else {
            // TODO: Web
        }
    }

    logoutRoom(roomID?: string): void {
        if (JSB) {
            if (!this._bridge) { return }
            this._bridge.logoutRoom(roomID)
        } else {
            // TODO: Web
        }
    }

    startPreview(channel?: ZegoPublishChannel): void {
        if (JSB) {
            if (!this._bridge) { return }
            this._bridge.startPreview(channel)
        } else {
            // TODO: Web
        }
    }

    stopPreview(channel?: ZegoPublishChannel): void {
        if (JSB) {
            if (!this._bridge) { return }
            this._bridge.stopPreview(channel)
        } else {
            // TODO: Web
        }
    }
}
