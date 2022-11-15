
import * as zd from "./ZegoExpressDefines"

export interface ZegoEventHandler {
  /**
   * The callback for obtaining debugging error information.
   *
   * Available since: 1.1.0
   * Description: When the SDK functions are not used correctly, the callback prompts for detailed error information.
   * Trigger: Notify the developer when an exception occurs in the SDK.
   * Restrictions: None.
   * Caution: None.
   *
   * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
   * @param funcName Function name.
   * @param info Detailed error information.
   */
  onDebugError?(errorCode: number, funcName: string, info: string): void
  /**
   * Method execution result callback
   *
   * Available since: 2.3.0
   * Description: When the monitoring is turned on through [setApiCalledCallback], the results of the execution of all methods will be called back through this callback.
   * Trigger: When the developer calls the SDK method, the execution result of the method is called back.
   * Restrictions: None.
   * Caution: It is recommended to monitor and process this callback in the development and testing phases, and turn off the monitoring of this callback after going online.
   *
   * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
   * @param funcName Function name.
   * @param info Detailed error information.
   */
  onApiCalledResult?(errorCode: number, funcName: string, info: string): void
  /**
   * The callback triggered when the audio/video engine state changes.
   *
   * Available since: 1.1.0
   * Description: Callback notification of audio/video engine status update. When audio/video functions are enabled, such as preview, push streaming, local media player, audio data observering, etc., the audio/video engine will enter the start state. When you exit the room or disable all audio/video functions , The audio/video engine will enter the stop state.
   * Trigger: The developer called the relevant function to change the state of the audio and video engine. For example: 1. Called ZegoExpressEngine's [startPreview], [stopPreview], [startPublishingStream], [stopPublishingStream], [startPlayingStream], [stopPlayingStream], [startAudioDataObserver], [stopAudioDataObserver] and other functions. 2. The related functions of MediaPlayer are called. 3. The [LogoutRoom] function was called. 4. The related functions of RealTimeSequentialDataManager are called.
   * Restrictions: None.
   * Caution:
   *   1. When the developer calls [destroyEngine], this notification will not be triggered because the resources of the SDK are completely released.
   *   2. If there is no special need, the developer does not need to pay attention to this callback.
   *
   * @param state The audio/video engine state.
   */
  onEngineStateUpdate?(state: zd.ZegoEngineState): void
  /**
   * The callback triggered when the room connection state changes.
   *
   * Available since: 1.1.0
   * Description: This callback is triggered when the connection status of the room changes, and the reason for the change is notified.For versions 2.18.0 and above, it is recommended to use the onRoomStateChanged callback instead of the onRoomStateUpdate callback to monitor room state changes.
   * Use cases: Developers can use this callback to determine the status of the current user in the room.
   * When to trigger:
   *  1. The developer will receive this notification when calling the [loginRoom], [logoutRoom], [switchRoom] functions.
   *  2. This notification may also be received when the network condition of the user's device changes (SDK will automatically log in to the room when disconnected, please refer to [Does ZEGO SDK support a fast reconnection for temporary disconnection] for details](https://docs.zegocloud.com/faq/reconnect?product=ExpressVideo&platform=all).
   * Restrictions: None.
   * Caution: If the connection is being requested for a long time, the general probability is that the user's network is unstable.
   * Related APIs: [loginRoom]、[logoutRoom]、[switchRoom]
   *
   * @param roomID Room ID, a string of up to 128 bytes in length.
   * @param state Changed room state.
   * @param errorCode Error code, For details, please refer to [Common Error Codes](https://docs.zegocloud.com/article/5548).
   * @param extendedData Extended Information with state updates. When the room login is successful, the key "room_session_id" can be used to obtain the unique RoomSessionID of each audio and video communication, which identifies the continuous communication from the first user in the room to the end of the audio and video communication. It can be used in scenarios such as call quality scoring and call problem diagnosis.
   */
  onRoomStateUpdate?(roomID: string, state: zd.ZegoRoomState, errorCode: number, extendedData: string): void
  /**
   * The callback triggered when the room connection state changes.
   *
   * Available since: 2.18.0
   * Description: This callback is triggered when the connection status of the room changes, and the reason for the change is notified.For versions 2.18.0 and above, it is recommended to use the onRoomStateChanged callback instead of the onRoomStateUpdate callback to monitor room state changes.
   * Use cases: Developers can use this callback to determine the status of the current user in the room.
   * When to trigger: Users will receive this notification when they call room functions (refer to [Related APIs]). 2. This notification may also be received when the user device's network conditions change (SDK will automatically log in to the room again when the connection is disconnected, refer to https://doc-zh.zego.im/faq/reconnect ).
   * Restrictions: None.
   * Caution: If the connection is being requested for a long time, the general probability is that the user's network is unstable.
   * Related APIs: [loginRoom], [logoutRoom], [switchRoom]
   *
   * @param roomID Room ID, a string of up to 128 bytes in length.
   * @param reason Room state change reason.
   * @param errorCode Error code, please refer to the error codes document https://doc-en.zego.im/en/5548.html for details.
   * @param extendedData Extended Information with state updates. When the room login is successful, the key "room_session_id" can be used to obtain the unique RoomSessionID of each audio and video communication, which identifies the continuous communication from the first user in the room to the end of the audio and video communication. It can be used in scenarios such as call quality scoring and call problem diagnosis.
   */
  onRoomStateChanged?(roomID: string, reason: zd.ZegoRoomStateChangedReason, errorCode: number, extendedData: string): void
  /**
   * The callback triggered when the number of other users in the room increases or decreases.
   *
   * Available since: 1.1.0
   * Description: When other users in the room are online or offline, which causes the user list in the room to change, the developer will be notified through this callback.
   * Use cases: Developers can use this callback to update the user list display in the room in real time.
   * When to trigger:
   *   1. When the user logs in to the room for the first time, if there are other users in the room, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeAdd], and `userList` is the other users in the room at this time.
   *   2. The user is already in the room. If another user logs in to the room through the [loginRoom] or [switchRoom] functions, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeAdd].
   *   3. If other users log out of this room through the [logoutRoom] or [switchRoom] functions, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeDelete].
   *   4. The user is already in the room. If another user is kicked out of the room from the server, the SDK will trigger a callback notification with `updateType` being [ZegoUpdateTypeDelete].
   * Restrictions: If developers need to use ZEGO room users notifications, please ensure that the [ZegoRoomConfig] sent by each user when logging in to the room has the [isUserStatusNotify] property set to true, otherwise the callback notification will not be received.
   * Related APIs: [loginRoom]、[logoutRoom]、[switchRoom]
   *
   * @param roomID Room ID where the user is logged in, a string of up to 128 bytes in length.
   * @param updateType Update type (add/delete).
   * @param userList List of users changed in the current room.
   */
  onRoomUserUpdate?(roomID: string, updateType: zd.ZegoUpdateType, userList: zd.ZegoUser[]): void
}
