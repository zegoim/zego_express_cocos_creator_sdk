import {
  ZegoEngineState,
  ZegoRoomState,
  ZegoRoomStateChangedReason,
  ZegoUpdateType,
} from './ZegoExpressEnums'

declare interface ZegoExpressEventHandler {
  onDebugError?(errorCode: number, funcName: string, info: string): void

  onEngineStateUpdate?(state: ZegoEngineState): void

  onRoomStateUpdate?(
    roomID: string,
    state: ZegoRoomState,
    errorCode: number,
    extendedData: string
  ): void

  onRoomStateChanged?(
    roomID: string,
    reason: ZegoRoomStateChangedReason,
    errorCode: number,
    extendedData: string
  ): void

  onRoomUserUpdate?(roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]): void
}
