import * as zd from './ZegoExpressDefines'
import { ZegoEventHandler } from './ZegoExpressEventHandler'
import { ZegoExpressEngineImpl } from './impl/ZegoExpressEngineImpl'

export default abstract class ZegoExpressEngine {
  /**
   * Create ZegoExpressEngine singleton object and initialize SDK.
   *
   * Available since: 2.14.0
   * Description: Create ZegoExpressEngine singleton object and initialize SDK.
   * When to call: The engine needs to be created before calling other functions.
   * Restrictions: None.
   * Caution: The SDK only supports the creation of one instance of ZegoExpressEngine. Multiple calls to this function return the same object.
   *
   * @param profile The basic configuration information is used to create the engine.
   * @param eventHandler Event notification callback. [null] means not receiving any callback notifications.It can also be managed later via [setEventHandler]. If [createEngine] is called repeatedly and the [destroyEngine] function is not called to destroy the engine before the second call, the eventHandler will not be updated.
   * @return engine singleton instance.
   */
  static createEngine(
    profile: zd.ZegoEngineProfile,
    eventHandler?: ZegoEventHandler
  ): ZegoExpressEngine {
    return ZegoExpressEngineImpl.createEngine(profile, eventHandler)
  }

  /**
   * Destroy the ZegoExpressEngine singleton object and deinitialize the SDK.
   *
   * Available since: 1.1.0
   * Description: Destroy the ZegoExpressEngine singleton object and deinitialize the SDK.
   * When to call: When the SDK is no longer used, the resources used by the SDK can be released through this interface
   * Restrictions: None.
   * Caution: After using [createEngine] to create a singleton, if the singleton object has not been created or has been destroyed, you will not receive related callbacks when calling this function.
   *
   * @param callback Notification callback for destroy engine completion. Developers can listen to this callback to ensure that device hardware resources are released. If the developer only uses SDK to implement audio and video functions, this parameter can be passed [null].
   */
  static destroyEngine(callback?: zd.ZegoDestroyCompletionCallback): void {
    return ZegoExpressEngineImpl.destroyEngine(callback)
  }

  /**
   * Log in to the room by configuring advanced properties, and return the login result through the callback parameter. You must log in to the room before pushing or pulling the stream.
   *
   * Available since: 2.18.0
   * Description: If the room does not exist, [loginRoom] creates and logs in the room. SDK uses the 'room' to organize users. After users log in to a room, they can use interface such as push stream [startPublishingStream], pull stream [startPlayingStream], send and receive broadcast messages [sendBroadcastMessage], etc. To prevent the app from being impersonated by a malicious user, you can add authentication before logging in to the room, that is, the [token] parameter in the ZegoRoomConfig object passed in by the [config] parameter.
   * Use cases: In the same room, users can conduct live broadcast, audio and video calls, etc.
   * When to call /Trigger: This interface is called after [createEngine] initializes the SDK.
   * Restrictions: For restrictions on the use of this function, please refer to https://docs.zegocloud.com/article/7611 or contact ZEGO technical support.
   * Caution:
   *   1. Apps that use different appIDs cannot intercommunication with each other.
   *   2. SDK supports startPlayingStream audio and video streams from different rooms under the same appID, that is, startPlayingStream audio and video streams across rooms. Since ZegoExpressEngine's room related callback notifications are based on the same room, when developers want to startPlayingStream streams across rooms, developers need to maintain related messages and signaling notifications by themselves.
   *   3. It is strongly recommended that userID corresponds to the user ID of the business APP, that is, a userID and a real user are fixed and unique, and should not be passed to the SDK in a random userID. Because the unique and fixed userID allows ZEGO technicians to quickly locate online problems.
   *   4. After the first login failure due to network reasons or the room is disconnected, the default time of SDK reconnection is 20min.
   *   5. After the user has successfully logged in to the room, if the application exits abnormally, after restarting the application, the developer needs to call the logoutRoom interface to log out of the room, and then call the loginRoom interface to log in to the room again.
   * Privacy reminder: Please do not fill in sensitive user information in this interface, including but not limited to mobile phone number, ID number, passport number, real name, etc.
   * Related callbacks:
   *   1. When the user starts to log in to the room, the room is successfully logged in, or the room fails to log in, the [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback will be triggered to notify the developer of the status of the current user connected to the room.
   *   2. Different users who log in to the same room can get room related notifications in the same room (eg [onRoomUserUpdate], [onRoomStreamUpdate], etc.), and users in one room cannot receive room signaling notifications in another room.
   *   3. If the network is temporarily interrupted due to network quality reasons, the SDK will automatically reconnect internally. You can get the current connection status of the local room by listening to the [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback method, and other users in the same room will receive [onRoomUserUpdate] callback notification.
   *   4. Messages sent in one room (e.g. [setStreamExtraInfo], [sendBroadcastMessage], [sendBarrageMessage], [sendCustomCommand], etc.) cannot be received callback ((eg [onRoomStreamExtraInfoUpdate], [onIMRecvBroadcastMessage], [onIMRecvBarrageMessage], [onIMRecvCustomCommand], etc) in other rooms. Currently, SDK does not provide the ability to send messages across rooms. Developers can integrate the SDK of third-party IM to achieve.
   * Related APIs:
   *   1. Users can call [logoutRoom] to log out. In the case that a user has successfully logged in and has not logged out, if the login interface is called again, the console will report an error and print the error code 1002001.
   *   2. SDK supports multi-room login, please call [setRoomMode] function to select multi-room mode before engine initialization, and then call [loginRoom] to log in to multi-room.
   *   3. Calling [destroyEngine] will also automatically log out.
   *
   * @param roomID Room ID, a string of up to 128 bytes in length.
   *   Caution:
   *   1. room ID is defined by yourself.
   *   2. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
   *   3. If you need to communicate with the Web SDK, please do not use '%'.
   * @param user User object instance, configure userID, userName. Note that the userID needs to be globally unique with the same appID, otherwise the user who logs in later will kick out the user who logged in first.
   * @param config Advanced room configuration.
   * @param callback The callback of this login result, if you need detailed room status, please pay attention to the [onRoomStateChanged] callback. Required: No. Default value: null.Caution: If the connection is retried multiple times due to network problems, the retry status will not be thrown by this callback.
   */
  abstract loginRoom(
    roomID: string,
    user: zd.ZegoUser,
    config?: zd.ZegoRoomConfig,
    callback?: zd.ZegoRoomLoginCallback
  ): void

  /**
   * Logs out of a room.
   *
   * Available since: 1.1.0
   * Description: This API will log out the room named roomID.
   * Use cases: In the same room, users can conduct live broadcast, audio and video calls, etc.
   * When to call /Trigger: After successfully logging in to the room, if the room is no longer used, the user can call the function [logoutRoom].
   * Restrictions: None.
   * Caution: 1. Exiting the room will stop all publishing and playing streams for user, and inner audio and video engine will stop, and then SDK will auto stop local preview UI. If you want to keep the preview ability when switching rooms, please use the [switchRoom] method. 2. If the user logs in to the room, but the incoming 'roomID' is different from the logged-in room name, SDK will return failure.
   * Related callbacks: After calling this function, you will receive [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback notification successfully exits the room, while other users in the same room will receive the [onRoomUserUpdate] callback notification(On the premise of enabling isUserStatusNotify configuration).
   * Related APIs: Users can use [loginRoom], [switchRoom] functions to log in or switch rooms.
   *
   * @param roomID Room ID, a string of up to 128 bytes in length.
   *   Caution:
   *   1. Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.
   *   2. If you need to communicate with the Web SDK, please do not use '%'.
   * @param callback The callback of this logout room result, if you need detailed room status, please pay attention to the [onRoomStateChanged] callback.. Required: No. Default value: null.
   */
  abstract logoutRoom(roomID?: string, callback?: zd.ZegoRoomLogoutCallback): void

  /**
   * Switch the room with advanced room configurations.
   *
   * Available since: 1.15.0
   * Description: Using this interface allows users to quickly switch from one room to another room.
   * Use cases: if you need to quickly switch to the next room, you can call this function.
   * When to call /Trigger: After successfully login room.
   * Restrictions: None.
   * Caution:
   *   1. When this function is called, all streams currently publishing or playing will stop (but the local preview will not stop).
   *   2. To prevent the app from being impersonated by a malicious user, you can add authentication before logging in to the room, that is, the [token] parameter in the ZegoRoomConfig object passed in by the [config] parameter. This parameter configuration affects the room to be switched over. 3. When the function [setRoomMode] is used to set ZegoRoomMode to ZEGO_ROOM_MODE_MULTI_ROOM, this function is not available.
   * Privacy reminder: Please do not fill in sensitive user information in this interface, including but not limited to mobile phone number, ID number, passport number, real name, etc.
   * Related callbacks: When the user call the [switchRoom] function, the [onRoomStateChanged] (Not supported before 2.18.0, please use [onRoomStateUpdate]) callback will be triggered to notify the developer of the status of the current user connected to the room.
   * Related APIs: Users can use the [logoutRoom] function to log out of the room.
   *
   * @param fromRoomID Current roomID.
   * @param toRoomID The next roomID.
   * @param config Advanced room configuration.
   */
  abstract switchRoom(fromRoomID: string, toRoomID: string, config?: zd.ZegoRoomConfig): void
}
