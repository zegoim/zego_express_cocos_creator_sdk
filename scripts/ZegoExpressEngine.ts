import * as zego from './ZegoExpressDefines'
import { ZegoEventHandler, ZegoApiCalledEventHandler } from './ZegoExpressEventHandler'
import { ZegoExpressEngineImpl } from './impl/ZegoExpressEngineImpl'

export class ZegoExpressEngine {
  private constructor() {}
  private static _instance: ZegoExpressEngine

  /**
   * Engine singleton instance
   */
  static get instance(): ZegoExpressEngine {
    if (!this._instance) {
      this._instance = new ZegoExpressEngine()
    }
    return this._instance
  }

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
    profile: zego.ZegoEngineProfile,
    eventHandler?: ZegoEventHandler
  ): ZegoExpressEngine {
    ZegoExpressEngineImpl.instance.createEngine(profile, eventHandler)
    return ZegoExpressEngine.instance
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
  static destroyEngine(callback?: zego.ZegoDestroyCompletionCallback): void {
    return ZegoExpressEngineImpl.instance.destroyEngine(callback)
  }

  /**
   * Set advanced engine configuration.
   *
   * Available since: 1.1.0
   * Description: Used to enable advanced functions.
   * When to call: Different configurations have different call timing requirements. For details, please consult ZEGO technical support.
   * Restrictions: None.
   *
   * @param config Advanced engine configuration
   */
  static setEngineConfig(config: zego.ZegoEngineConfig): void {
    return ZegoExpressEngineImpl.instance.setEngineConfig(config)
  }

  /**
   * Set log configuration.
   *
   * Available since: 2.3.0
   * Description: If you need to customize the log file size and path, please call this function to complete the configuration.
   * When to call: It must be set before calling [createEngine] to take effect. If it is set after [createEngine], it will take effect at the next [createEngine] after [destroyEngine].
   * Restrictions: None.
   * Caution: Once this interface is called, the method of setting log size and path via [setEngineConfig] will be invalid.Therefore, it is not recommended to use [setEngineConfig] to set the log size and path.
   *
   * @param config log configuration.
   */
  static setLogConfig(config: zego.ZegoLogConfig): void {
    return ZegoExpressEngineImpl.instance.setLogConfig(config)
  }

  /**
   * Set room mode.
   *
   * Available since: 2.9.0
   * Description: If you need to use the multi-room feature, please call this function to complete the configuration.
   * When to call: Must be set before calling [createEngine] to take effect, otherwise it will fail.
   * Restrictions: If you need to use the multi-room feature, please contact the instant technical support to configure the server support.
   * Caution: None.
   *
   * @param mode Room mode. Description: Used to set the room mode. Use cases: If you need to enter multiple rooms at the same time for publish-play stream, please turn on the multi-room mode through this interface. Required: True. Default value: ZEGO_ROOM_MODE_SINGLE_ROOM.
   */
  static setRoomMode(mode: zego.ZegoRoomMode): void {
    return ZegoExpressEngineImpl.instance.setRoomMode(mode)
  }

  /**
   * Gets the SDK's version number.
   *
   * Available since: 1.1.0
   * Description: If you encounter an abnormality during the running of the SDK, you can submit the problem, log and other information to the ZEGO technical staff to locate and troubleshoot. Developers can also collect current SDK version information through this API, which is convenient for App operation statistics and related issues.
   * When to call: Any time.
   * Restrictions: None.
   * Caution: None.
   *
   * @return SDK version.
   */
  static getVersion(): string {
    return ZegoExpressEngineImpl.instance.getVersion()
  }

  /**
   * Set method execution result callback.
   *
   * Available since: 2.3.0
   * Description: Set the setting of the execution result of the calling method. After setting, you can get the detailed information of the result of each execution of the ZEGO SDK method.
   * When to call: Any time.
   * Restrictions: None.
   * Caution: It is recommended that developers call this interface only when they need to obtain the call results of each interface. For example, when troubleshooting and tracing problems. Developers generally do not need to pay attention to this interface.
   *
   * @param callback Method execution result callback.
   */
  static setApiCalledCallback(callback: ZegoApiCalledEventHandler): void {
    return ZegoExpressEngineImpl.instance.setApiCalledCallback(callback)
  }

  /**
   * Query whether the current SDK supports the specified feature.
   *
   * Available since: 2.22.0
   * Description:
   *   Since the SDK supports feature trimming, some features may be trimmed;
   *   you can use this function to quickly determine whether the current SDK supports the specified features,
   *   such as querying whether the media player feature is supported.
   * When to call: Any time.
   *
   * @param featureType Type of feature to query.
   * @return Whether the specified feature is supported. true: supported; false: not supported.
   */
  static isFeatureSupported(featureType: zego.ZegoFeatureType): boolean {
    return ZegoExpressEngineImpl.instance.isFeatureSupported(featureType)
  }

  /**
   * Sets up the event notification callbacks that need to be handled. If the eventHandler is set to [null], all the callbacks set previously will be cleared.
   *
   * Available since: 1.1.0
   * Description: Set up event notification callbacks, used to monitor callbacks such as engine status changes, room status changes, etc.
   * When to call: After [createEngine].
   * Restrictions: None.
   * Caution: Invoke this function will overwrite the handler set in [createEngine] or the handler set by the last call to this method. After calling [destroyEngine], the event handler that has been set will be invalid and need to be reset after next calling of [createEngine].
   *
   * @param eventHandler Event notification callback. If the eventHandler is set to [null], all the callbacks set previously will be cleared. Developers should monitor the corresponding callbacks according to their own business scenarios. The main callback functions of the SDK are here.
   */
  setEventHandler(eventHandler?: ZegoEventHandler): void {
    return ZegoExpressEngineImpl.instance.setEventHandler(eventHandler)
  }

  /**
   * Set room scenario.
   *
   * Available since: 3.0.0
   * Description: You can set the scenario of the room, and the SDK will adopt different optimization strategies for different scenarios in order to obtain better effects; this function does exactly the same thing as the [scenario] parameter in the [profile] configuration of [createEngine].
   * Use cases: This function is suitable for apps in various audio and video business scenarios, such as 1v1 video call (or voice call) scenario and live show scenario; this function can be used to switch scenarios without destroying the engine through [destroyEngine].
   * When to call: Must be set before calling [loginRoom] AND after calling [createEngine].
   * Restrictions: Once you log in to the room, you are no longer allowed to modify the room scenario. If you need to modify the scenario, you need to log out of the room first. If you log in to multiple rooms, you need to log out of all rooms before you can modify it.
   * Caution:
   *   1. Users in the same room are recommended to use the same room scenario for best results.
   *   2. Setting the scenario will affect the audio and video bit rate, frame rate, resolution, codec id, audio device mode, audio route type, traffic control, 3A, ear return and other audio and video configurations. If you have special needs, you can call various other APIs to set the above configuration after calling this API.
   *   3. Calling this function will override the scenario specified on [createEngine] or the scenario set by the last call to this function.
   *   4. Calling this function will overwrite the audio and video related configuration you set through APIs such as [setVideoConfig], [setAudioConfig], so it is recommended to set the scenario first and then adjust the audio and video configuration through other APIs.
   *
   * @param scenario Room scenario.
   */
  setRoomScenario(scenario: zego.ZegoScenario): void {
    return ZegoExpressEngineImpl.instance.setRoomScenario(scenario)
  }

  /**
   * Uploads logs to the ZEGO server.
   *
   * Available since: 2.4.0
   * Description: By default, SDK creates and prints log files in the App's default directory. Each log file defaults to a maximum of 5MB. Three log files are written over and over in a circular fashion. When calling this function, SDK will auto package and upload the log files to the ZEGO server.
   * Use cases: Developers can provide a business “feedback” channel in the App. When users feedback problems, they can call this function to upload the local log information of SDK to help locate user problems.
   * When to call: After [createEngine].
   * Restrictions: If you call this interface repeatedly within 10 minutes, only the last call will take effect.
   * Caution: After calling this interface to upload logs, if you call [destroyEngine] or exit the App too quickly, there may be a failure.It is recommended to wait a few seconds, and then call [destroyEngine] or exit the App after receiving the upload success callback..
   *
   * @param callback Log upload result callback.
   */
  uploadLog(callback?: zego.ZegoUploadLogResultCallback): void {
    return ZegoExpressEngineImpl.instance.uploadLog(callback)
  }

  /**
   * Enable the debug assistant. Note, do not enable this feature in the online version! Use only during development phase!
   *
   * Available since: 2.17.0
   * Description: After enabled, the SDK will print logs to the console, and will pop-up an alert (toast) UI message when there is a problem with calling other SDK functions.
   * Default value: This function is disabled by default.
   * When to call: This function can be called right after [createEngine].
   * Platform differences: The pop-up alert function only supports Android / iOS / macOS / Windows, and the console log function supports all platforms.
   * Caution: Be sure to confirm that this feature is turned off before the app is released to avoid pop-up UI alert when an error occurs in your release version's app. It is recommended to associate the [enable] parameter of this function with the DEBUG variable of the app, that is, only enable the debug assistant in the DEBUG environment.
   * Restrictions: None.
   *
   * @param enable Whether to enable the debug assistant.
   */
  enableDebugAssistant(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableDebugAssistant(enable)
  }

  /**
   * Call the experimental API.
   *
   * Available since: 2.7.0
   * Description: ZEGO provides some technical previews or special customization functions in RTC business through this API. If you need to get the use of the function or the details, please consult ZEGO technical support.
   * When to call: After [createEngine].
   *
   * @param params Parameters in the format of a JSON string, please consult ZEGO technical support for details.
   * @return Returns an argument in the format of a JSON string, please consult ZEGO technical support for details.
   */
  callExperimentalAPI(params: string): string {
    return ZegoExpressEngineImpl.instance.callExperimentalAPI(params)
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
  loginRoom(
    roomID: string,
    user: zego.ZegoUser,
    config?: zego.ZegoRoomConfig,
    callback?: zego.ZegoRoomLoginCallback
  ): void {
    return ZegoExpressEngineImpl.instance.loginRoom(roomID, user, config, callback)
  }

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
  logoutRoom(roomID?: string, callback?: zego.ZegoRoomLogoutCallback): void {
    return ZegoExpressEngineImpl.instance.logoutRoom(roomID, callback)
  }

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
  switchRoom(fromRoomID: string, toRoomID: string, config?: zego.ZegoRoomConfig): void {
    return ZegoExpressEngineImpl.instance.switchRoom(fromRoomID, toRoomID, config)
  }

  /**
   * Renew token.
   *
   * Available since: 2.8.0
   * Description: After the developer receives [onRoomTokenWillExpire], they can use this API to update the token to ensure that the subsequent RTC functions are normal.
   * Use cases: Used when the token is about to expire.
   * When to call /Trigger: After the developer receives [onRoomTokenWillExpire].
   * Restrictions: None.
   * Caution: The token contains important information such as the user's room permissions, publish stream permissions, and effective time, please refer to https://docs.zegocloud.com/article/11649.
   * Related callbacks: None.
   * Related APIs: None.
   *
   * @param roomID Room ID.
   * @param token The token that needs to be renew.
   */
  renewToken(roomID: string, token: string): void {
    return ZegoExpressEngineImpl.instance.renewToken(roomID, token)
  }

  /**
   * Set room extra information.
   *
   * Available since: 1.13.0
   * Description: The user can call this function to set the extra info of the room.
   * Use cases: You can set some room-related business attributes, such as whether someone is Co-hosting.
   * When to call /Trigger: After logging in the room successful.
   * Restrictions: For restrictions on the use of this function, please refer to https://docs.zegocloud.com/article/7611 or contact ZEGO technical support.
   * Caution: 'key' is non null. The length of key and value is limited, please refer to Restrictions. The newly set key and value will overwrite the old setting.
   * Related callbacks: Other users in the same room will be notified through the [onRoomExtraInfoUpdate] callback function.
   * Related APIs: None.
   *
   * @param roomID Room ID.
   * @param key key of the extra info.
   * @param value value if the extra info.
   * @param callback Callback for setting room extra information.
   */
  setRoomExtraInfo(
    roomID: string,
    key: string,
    value: string,
    callback?: zego.ZegoRoomSetRoomExtraInfoCallback
  ): void {
    return ZegoExpressEngineImpl.instance.setRoomExtraInfo(roomID, key, value, callback)
  }

  /**
   * Starts publishing a stream. Support multi-room mode.
   *
   * Available since: 1.1.0
   * Description: Users push their local audio and video streams to the ZEGO RTC server or CDN, and other users in the same room can pull the audio and video streams to watch through the `streamID` or CDN pull stream address.
   * Use cases: It can be used to publish streams in real-time connecting wheat, live broadcast and other scenarios.
   * When to call: After [loginRoom].
   * Restrictions: None.
   * Caution:
   *   1. Before start to publish the stream, the user can choose to call [setVideoConfig] to set the relevant video parameters, and call [startPreview] to preview the video.
   *   2. Other users in the same room can get the streamID by monitoring the [onRoomStreamUpdate] event callback after the local user publishing stream successfully.
   *   3. In the case of poor network quality, user publish may be interrupted, and the SDK will attempt to reconnect. You can learn about the current state and error information of the stream published by monitoring the [onPublisherStateUpdate] event.
   *   4. To call [SetRoomMode] function to select multiple rooms, the room ID must be specified explicitly.
   *
   * @param streamID Stream ID, a string of up to 256 characters.
   *   Caution:
   *   1. Stream ID is defined by you.
   *   2. needs to be globally unique within the entire AppID. If in the same AppID, different users publish each stream and the stream ID is the same, which will cause the user to publish the stream failure. You cannot include URL keywords, otherwise publishing stream and playing stream will fails.
   *   3. Only support numbers, English characters and '-', ' '.
   * @param config Advanced publish configuration.
   * @param channel Publish stream channel.
   */
  startPublishingStream(
    streamID: string,
    config?: zego.ZegoPublisherConfig,
    channel?: zego.ZegoPublishChannel
  ): void {
    return ZegoExpressEngineImpl.instance.startPublishingStream(streamID, config, channel)
  }

  /**
   * Stops publishing a stream (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: The user stops sending local audio and video streams, and other users in the room will receive a stream deletion notification.
   * Use cases: It can be used to stop publish streams in real-time connecting wheat, live broadcast and other scenarios.
   * When to call: After [startPublishingStream].
   * Restrictions: None.
   * Caution:
   *   1. After stopping the streaming, other users in the same room can receive the delete notification of the stream by listening to the [onRoomStreamUpdate] callback.
   *   2. If the user has initiated publish flow, this function must be called to stop the publish of the current stream before publishing the new stream (new streamID), otherwise the new stream publish will return a failure.
   *   3. After stopping streaming, the developer should stop the local preview based on whether the business situation requires it.
   *
   * @param channel Publish stream channel.
   */
  stopPublishingStream(channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.stopPublishingStream(channel)
  }

  /**
   * Sets the extra information of the stream being published for the specified publish channel.
   *
   * Available since: 1.1.0
   * Description: Use this function to set the extra info of the stream. The stream extra information is an extra information identifier of the stream ID. Unlike the stream ID, which cannot be modified during the publishing process, the stream extra information can be modified midway through the stream corresponding to the stream ID. Developers can synchronize variable content related to stream IDs based on stream additional information.
   * When to call: After the engine is created [createEngine], Called before and after [startPublishingStream] can both take effect.
   * Restrictions: None.
   * Related callbacks: Users can obtain the execution result of the function through [ZegoPublisherSetStreamExtraInfoCallback] callback.
   *
   * @param extraInfo Stream extra information, a string of up to 1024 characters.
   * @param channel Publish stream channel.
   * @param callback Set stream extra information execution result notification.
   */
  setStreamExtraInfo(
    extraInfo: string,
    channel?: zego.ZegoPublishChannel,
    callback?: zego.ZegoPublisherSetStreamExtraInfoCallback
  ): void {
    return ZegoExpressEngineImpl.instance.setStreamExtraInfo(extraInfo, channel, callback)
  }

  /**
   * Starts/Updates the local video preview (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: The user can see his own local image by calling this function.
   * Use cases: It can be used for local preview in real-time connecting wheat, live broadcast and other scenarios.
   * When to call: After [createEngine].
   * Restrictions: None.
   * Caution: 1. The preview function does not require you to log in to the room or publish the stream first. But after exiting the room, SDK internally actively stops previewing by default. 2. Local view and preview modes can be updated by calling this function again. The user can only preview on one view. If you call [startPreview] again to pass in a new view, the preview screen will only be displayed in the new view. 3. You can set the mirror mode of the preview by calling the [setVideoMirrorMode] function. The default preview setting is image mirrored. 4. When this function is called, the audio and video engine module inside SDK will start really, and it will start to try to collect audio and video..
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param canvas The view used to display the preview image. If the view is set to null, no preview will be made.
   * @param channel Publish stream channel
   */
  startPreview(canvas?: zego.ZegoCanvas, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.startPreview(canvas, channel)
  }

  /**
   * Stops the local preview (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: This function can be called to stop the preview when the preview is not needed locally.
   * Caution: Stopping the preview will not affect the publish stream and playing stream functions.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param channel Publish stream channel
   */
  stopPreview(channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.stopPreview(channel)
  }

  /**
   * Sets up the video configurations (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: Set the video frame rate, bit rate, video capture resolution, and video encoding output resolution.
   * Default value: The default video capture resolution is 360p, the video encoding output resolution is 360p, the bit rate is 600 kbps, and the frame rate is 15 fps.
   * When to call: After [createEngine].
   * Restrictions: It is necessary to set the relevant video configuration before publishing the stream or startPreview, and only support the modification of the encoding resolution and the bit rate after publishing the stream.
   * Caution: Developers should note that the wide and high resolution of the mobile end is opposite to the wide and high resolution of the PC. For example, in the case of 360p, the resolution of the mobile end is 360x640, and the resolution of the PC end is 640x360.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param config Video configuration, the SDK provides a common setting combination of resolution, frame rate and bit rate, they also can be customized.
   * @param channel Publish stream channel.
   */
  setVideoConfig(config: zego.ZegoVideoConfig, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setVideoConfig(config, channel)
  }

  /**
   * Gets the current video configurations (for the specified channel).
   *
   * This function can be used to get the specified publish channel's current video frame rate, bit rate, video capture resolution, and video encoding output resolution.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param channel Publish stream channel
   * @return Video configuration object
   */
  getVideoConfig(channel?: zego.ZegoPublishChannel): zego.ZegoVideoConfig {
    return ZegoExpressEngineImpl.instance.getVideoConfig(channel)
  }

  /**
   * Sets the video mirroring mode (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: Set whether the local preview video and the published video have mirror mode enabled. For specific mirroring mode.
   * When to call: After [createEngine].
   * Restrictions: This setting only works if the SDK is responsible for rendering.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param mirrorMode Mirror mode for previewing or publishing the stream.
   * @param channel Publish stream channel.
   */
  setVideoMirrorMode(
    mirrorMode: zego.ZegoVideoMirrorMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    return ZegoExpressEngineImpl.instance.setVideoMirrorMode(mirrorMode, channel)
  }

  /**
   * Sets the video orientation (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: Set the video orientation.
   * Use cases: When users use mobile devices to conduct live broadcasts or video calls, they can set different video directions according to the scene.
   * When to call: After [createEngine].
   * Restrictions: None.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param orientation Video orientation.
   * @param channel Publish stream channel.
   */
  setAppOrientation(orientation: zego.ZegoOrientation, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setAppOrientation(orientation, channel)
  }

  /**
   * Sets up the audio configurations for the specified publish channel.
   *
   * Available since: 1.3.4
   * Description: You can set the combined value of the audio codec, bit rate, and audio channel through this function. If the preset value cannot meet the developer's scenario, the developer can set the parameters according to the business requirements.
   * Default value: The default audio config refers to the default value of [ZegoAudioConfig].
   * When to call: After the engine is created [createEngine], and before publishing [startPublishingStream].
   * Restrictions: None.
   * Related APIs: [getAudioConfig].
   *
   * @param config Audio config.
   * @param channel Publish stream channel.
   */
  setAudioConfig(config: zego.ZegoAudioConfig, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setAudioConfig(config, channel)
  }

  /**
   * Gets the current audio configurations from the specified publish channel.
   *
   * Available since: 1.8.0
   * Description: You can get the current audio codec, bit rate, and audio channel through this function.
   * When to call: After the engine is created [createEngine].
   * Restrictions: None.
   * Related APIs: [setAudioConfig].
   *
   * @param channel Publish stream channel.
   * @return Audio config.
   */
  getAudioConfig(channel?: zego.ZegoPublishChannel): zego.ZegoAudioConfig {
    return ZegoExpressEngineImpl.instance.getAudioConfig(channel)
  }

  /**
   * Set encryption key for the publishing stream for the specified publish channel.
   *
   * Available since: 1.19.0
   * Description: Support calling this function to update the encryption key while publishing stream.
   * When to call: After the engine is created [createEngine], Called before and after [startPublishingStream] can both take effect.
   * Restrictions: This function is only valid when publishing stream to the Zego RTC server.
   * Caution: Note that developers need to update the player's decryption key before updating the publisher's encryption key.
   * Related APIs: Calling [stopPublishingStream] or [logoutRoom] will clear the encryption key.
   *
   * @param key The encryption key, note that the key length only supports 16/24/32 bytes.
   * @param channel Publish stream channel.
   */
  setPublishStreamEncryptionKey(key: string, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setPublishStreamEncryptionKey(key, channel)
  }

  /**
   * Stops or resumes sending the audio part of a stream for the specified channel.
   *
   * Available since: 1.1.0
   * Description: This function can be called when publishing the stream to realize not publishing the audio data stream. The SDK still collects and processes the audio, but send muted audio frame packets to the network.
   * When to call: Called after the engine is created [createEngine] can take effect.
   * Restrictions: None.
   * Related callbacks: If you stop sending audio streams, the remote user that play stream of local user publishing stream can receive `Mute` status change notification by monitoring [onRemoteMicStateUpdate] callbacks.
   * Related APIs: [mutePublishStreamVideo].
   *
   * @param mute Whether to stop sending audio streams, true means not to send audio stream, and false means sending audio stream. The default is false.
   * @param channel Publish stream channel.
   */
  mutePublishStreamAudio(mute: boolean, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.mutePublishStreamAudio(mute, channel)
  }

  /**
   * Stops or resumes sending the video part of a stream for the specified channel.
   *
   * Available since: 1.1.0
   * Description: This function can be called when publishing the stream to realize not publishing the video stream. The local camera can still work normally, can capture, preview and process video images normally, but does not send the video data to the network.
   * When to call: Called after the engine is created [createEngine] can take effect.
   * Restrictions: None.
   * Related callbacks: If you stop sending video streams locally, the remote user that play stream of local user publishing stream can receive `Mute` status change notification by monitoring [onRemoteCameraStateUpdate] callbacks.
   * Related APIs: [mutePublishStreamAudio].
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param mute Whether to stop sending video streams, true means not to send video stream, and false means sending video stream. The default is false.
   * @param channel Publish stream channel.
   */
  mutePublishStreamVideo(mute: boolean, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.mutePublishStreamVideo(mute, channel)
  }

  /**
   * Enables or disables the traffic control for the specified publish channel.
   *
   * Available since: 1.5.0
   * Description: Enabling traffic control allows the SDK to adjust the audio and video streaming bitrate according to the current upstream network environment conditions, or according to the counterpart's downstream network environment conditions in a one-to-one interactive scenario, to ensure smooth results. At the same time, you can further specify the attributes of traffic control to adjust the corresponding control strategy.
   * Default value: Enable.
   * When to call: After the engine is created [createEngine], Called before [startPublishingStream] can take effect.
   * Restrictions: Only support RTC publish.
   *
   * @param enable Whether to enable traffic control. The default is ture.
   * @param property Adjustable property of traffic control, bitmask format. Should be one or the combinations of [ZegoTrafficControlProperty] enumeration. [AdaptiveFPS] as default.
   * @param channel Publish stream channel.
   */
  enableTrafficControl(enable: boolean, property: number, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.enableTrafficControl(enable, property, channel)
  }

  /**
   * Sets the minimum video bitrate for traffic control for the specified publish channel.
   *
   * Available since: 1.1.0
   * Description: Set the control strategy when the video bitrate reaches the lowest threshold during flow control. When the bitrate is lower than the minimum threshold, you can choose not to send video data or send it at a very low frame bitrate.
   * Default value: There is no control effect of the lowest threshold of video bitrate.
   * When to call: After the engine is created [createEngine], Called before [startPublishingStream] can take effect.
   * Restrictions: The traffic control must be turned on [enableTrafficControl].
   * Related APIs: [enableTrafficControl].
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param bitrate Minimum video bitrate (kbps).
   * @param mode Video sending mode below the minimum bitrate.
   * @param channel Publish stream channel.
   */
  setMinVideoBitrateForTrafficControl(
    bitrate: number,
    mode: zego.ZegoTrafficControlMinVideoBitrateMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    return ZegoExpressEngineImpl.instance.setMinVideoBitrateForTrafficControl(
      bitrate,
      mode,
      channel
    )
  }

  /**
   * Sets the minimum video frame rate threshold for traffic control.
   *
   * Available since: 2.17.0
   * Description: Set the control policy when the video frame rate reaches the lowest threshold when flow control.
   * Default value: There is no control effect of the lowest threshold of video frame rate.
   * When to call: The call takes effect after the engine [createEngine] is created.
   * Restrictions: The traffic control must be turned on [enableTrafficControl]. And its parameter [property] must contain AdaptiveFPS, Please refer to [ZegoTrafficControlProperty] for details.
   * Related APIs: [enableTrafficControl].
   * Caution: If you need to cancel the limit of the setting value, you can set it to 0.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param fps The minimum video frame rate threshold for traffic control(fps).
   * @param channel Publish stream channel.
   */
  setMinVideoFpsForTrafficControl(fps: number, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setMinVideoFpsForTrafficControl(fps, channel)
  }

  /**
   * Sets the minimum video resolution threshold for traffic control.
   *
   * Available since: 2.17.0
   * Description: Set the control policy when the video resolution reaches the lowest threshold when flow control.
   * Default value: There is no control effect of the lowest threshold of video resolution.
   * When to call: The call takes effect after the engine [createEngine] is created.
   * Restrictions: The traffic control must be turned on [enableTrafficControl]. And its parameter [property] must contain AdaptiveResolution, Please refer to [ZegoTrafficControlProperty] for details.
   * Related APIs: [enableTrafficControl].
   * Caution: If you need to cancel the limit of the setting value, you can set width and height to 0.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param width The flow controls the width of the lowest video resolution.
   * @param height The flow controls the height of the lowest video resolution.
   * @param channel Publish stream channel.
   */
  setMinVideoResolutionForTrafficControl(
    width: number,
    height: number,
    channel?: zego.ZegoPublishChannel
  ): void {
    return ZegoExpressEngineImpl.instance.setMinVideoResolutionForTrafficControl(
      width,
      height,
      channel
    )
  }

  /**
   * Sets the audio recording volume for stream publishing.
   *
   * Available since: 1.13.0
   * Description: This function is used to perform gain processing based on the device's collected volume. The local user can control the sound level of the audio stream sent to the remote end.
   * Default value: Default is 100.
   * When to call: After creating the engine [createEngine].
   * Restrictions: The capture volume can be dynamically set during publishing.
   * Related APIs: Set the playing stream volume [setPlayVolume].
   *
   * @param volume The volume gain percentage, the range is 0 ~ 200, and the default value is 100, which means 100% of the original collection volume of the device.
   */
  setCaptureVolume(volume: number): void {
    return ZegoExpressEngineImpl.instance.setCaptureVolume(volume)
  }

  /**
   * Enables or disables hardware encoding.
   *
   * Available since: 1.1.0
   * Description: Whether to use the hardware encoding function when publishing the stream, the GPU is used to encode the stream and to reduce the CPU usage.
   * When to call: The setting can take effect before the stream published. If it is set after the stream published, the stream should be stopped first before it takes effect.
   * Caution: Because hard-coded support is not particularly good for a few models, SDK uses software encoding by default. If the developer finds that the device is hot when publishing a high-resolution audio and video stream during testing of some models, you can consider calling this function to enable hard coding.
   *
   * @param enable Whether to enable hardware encoding, true: enable hardware encoding, false: disable hardware encoding.
   */
  enableHardwareEncoder(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableHardwareEncoder(enable)
  }

  /**
   * Sets the timing of video scaling in the video capture workflow. You can choose to do video scaling right after video capture (the default value) or before encoding.
   *
   * Available since: 1.1.0
   * When to call: This function needs to be set before call [startPreview] or [startPublishingStream].
   * Caution: The main effect is Whether the local preview is affected when the acquisition resolution is different from the encoding resolution.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param mode The capture scale timing mode.
   */
  setCapturePipelineScaleMode(mode: zego.ZegoCapturePipelineScaleMode): void {
    return ZegoExpressEngineImpl.instance.setCapturePipelineScaleMode(mode)
  }

  /**
   * Whether the specified video encoding type is supported.
   *
   * Available since: 2.12.0 and above
   * Description: Whether the specified video encoding is supported depends on the following aspects, whether the hardware model supports hard encoding, whether the performance of the hardware model supports soft encoding, and whether the SDK has the encoding module.
   * When to call: After creating the engine.
   * Caution: It is recommended that users call this interface to obtain H.265 encoding support capability before publish stream with H.265 encoding, if not supported, you can use other encodings for publish, such as H.264.On the mobile platform, the SDK only supports H.265 hardware encoding, and it is affected by the model and hardware capabilities. You need to call the [enableHardwareEncoder] function to enable hardware encoding, and then use this function to determine whether H.265 hardware encoding is supported.
   *
   * @param codecID Video codec id. Required: Yes.
   * @return Whether the specified video encoding is supported.Value range: true means support, you can use this encoding format for publish; false means the is not supported, and the encoding format cannot be used for publish.
   */
  isVideoEncoderSupported(codecID: zego.ZegoVideoCodecID): boolean {
    return ZegoExpressEngineImpl.instance.isVideoEncoderSupported(codecID)
  }

  /**
   * Set the orientation mode of the video.
   *
   * Available since: 2.23.0
   * Description: In order to simplify the complexity of processing video screen rotation for mobile developers, the SDK supports setting multiple video orientation modes, and developers can choose different modes according to the needs of the scene.
   * Use cases: Scenarios for live streaming or video calls using mobile devices.
   * Default value: Custom mode.
   * When to call: This function needs to be valid after calling [createEngine] and before calling preview [startPreview] or push stream [startPublishingStream].
   * Caution:
   *   1. It is valid for all channels.
   *   2. The adaptive mode takes effect in preview, streaming, and mixed streaming scenarios. It does not support external video capture, media player, cloud recording, local recording, or publishing/playing stream through CDN.
   * Related APIs: You can call the [setAppOrientation] function to set the orientation of the App in custom mode.
   *
   * @param mode Orientation mode of the video.
   */
  setAppOrientationMode(mode: zego.ZegoOrientationMode): void {
    return ZegoExpressEngineImpl.instance.setAppOrientationMode(mode)
  }

  /**
   * Starts playing a stream from ZEGO RTC server or from third-party CDN. Support multi-room mode.
   *
   * Available since: 1.1.0
   * Description: Play audio and video streams from the ZEGO RTC server or CDN.
   * Use cases: In real-time or live broadcast scenarios, developers can listen to the [onRoomStreamUpdate] event callback to obtain the new stream information in the room where they are located, and call this interface to pass in streamID for play streams.
   * When to call: After [loginRoom].
   * Restrictions: None.
   * Caution: 1. The developer can update the player canvas by calling this function again (the streamID must be the same). 2. After the first play stream failure due to network reasons or the play stream is interrupted, the default time for SDK reconnection is 20min. 3. In the case of poor network quality, user play may be interrupted, the SDK will try to reconnect, and the current play status and error information can be obtained by listening to the [onPlayerStateUpdate] event. please refer to https://docs.zegocloud.com/faq/reconnect. 4. Playing the stream ID that does not exist, the SDK continues to try to play after calling this function. After the stream ID is successfully published, the audio and video stream can be actually played.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param streamID Stream ID, a string of up to 256 characters.
   *   Caution:
   *   1. Only support numbers, English characters and '-', ' '.
   * @param canvas The view used to display the play audio and video stream's image. When the view is set to [null], no video is displayed, only audio is played.
   * @param config Advanced player configuration.
   */
  startPlayingStream(
    streamID: string,
    canvas?: zego.ZegoCanvas,
    config?: zego.ZegoPlayerConfig
  ): void {
    return ZegoExpressEngineImpl.instance.startPlayingStream(streamID, canvas, config)
  }

  /**
   * Stops playing a stream.
   *
   * Available since: 1.1.0
   * Description: Play audio and video streams from the ZEGO RTC server.
   * Use cases: In the real-time scenario, developers can listen to the [onRoomStreamUpdate] event callback to obtain the delete stream information in the room where they are located, and call this interface to pass in streamID for stop play streams.
   * When to call: After [loginRoom].
   * Restrictions: None.
   * Caution: When stopped, the attributes set for this stream previously, such as [setPlayVolume], [mutePlayStreamAudio], [mutePlayStreamVideo], etc., will be invalid and need to be reset when playing the the stream next time.
   *
   * @param streamID Stream ID.
   */
  stopPlayingStream(streamID: string): void {
    return ZegoExpressEngineImpl.instance.stopPlayingStream(streamID)
  }

  /**
   * Set decryption key for the playing stream.
   *
   * Available since: 1.19.0
   * Description: When streaming, the audio and video data will be decrypted according to the set key.
   * Use cases: Usually used in scenarios that require high security for audio and video calls.
   * When to call: after [createEngine], after the play stream can be changed at any time.
   * Restrictions: This function is only valid when calling from Zego RTC or L3 server.
   * Related APIs: [setPublishStreamEncryptionKey]Set the publish stream encryption key.
   * Caution: This interface can only be called if encryption is set on the publish. Calling [stopPlayingStream] or [logoutRoom] will clear the decryption key.
   *
   * @param streamID Stream ID.
   * @param key The decryption key, note that the key length only supports 16/24/32 bytes.
   */
  setPlayStreamDecryptionKey(streamID: string, key: string): void {
    return ZegoExpressEngineImpl.instance.setPlayStreamDecryptionKey(streamID, key)
  }

  /**
   * Sets the stream playback volume.
   *
   * Available since: 1.16.0
   * Description: Set the sound size of the stream, the local user can control the playback volume of the audio stream.
   * When to call: after called [startPlayingStream].
   * Restrictions: None.
   * Related APIs: [setAllPlayStreamVolume] Set all stream volume.
   * Caution: You need to reset after [stopPlayingStream] and [startPlayingStream]. This function and the [setAllPlayStreamVolume] function overwrite each other, and the last call takes effect.
   *
   * @param streamID Stream ID.
   * @param volume Volume percentage. The value ranges from 0 to 200, and the default value is 100.
   */
  setPlayVolume(streamID: string, volume: number): void {
    return ZegoExpressEngineImpl.instance.setPlayVolume(streamID, volume)
  }

  /**
   * Sets the all stream playback volume.
   *
   * Available since: 2.3.0
   * Description: Set the sound size of the stream, the local user can control the playback volume of the audio stream.
   * When to call: after called [startPlayingStream].
   * Restrictions: None.
   * Related APIs: [setPlayVolume] Set the specified streaming volume.
   * Caution: You need to reset after [stopPlayingStream] and [startPlayingStream]. Set the specified streaming volume and [setAllPlayStreamVolume] interface to override each other, and the last call takes effect.
   *
   * @param volume Volume percentage. The value ranges from 0 to 200, and the default value is 100.
   */
  setAllPlayStreamVolume(volume: number): void {
    return ZegoExpressEngineImpl.instance.setAllPlayStreamVolume(volume)
  }

  /**
   * Set play video stream type.
   *
   * Available since: 2.3.0
   * Description: When the publish stream sets the codecID to SVC through [setVideoConfig], the puller can dynamically set and select different stream types (small resolution is one-half of the standard layer).
   * Use cases: In general, when the network is weak or the rendered UI window is small, you can choose to pull videos with small resolutions to save bandwidth.
   * When to call: before or after called [startPlayingStream].
   * Restrictions: None.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param streamID Stream ID.
   * @param streamType Video stream type.
   */
  setPlayStreamVideoType(streamID: string, streamType: zego.ZegoVideoStreamType): void {
    return ZegoExpressEngineImpl.instance.setPlayStreamVideoType(streamID, streamType)
  }

  /**
   * Set the adaptive adjustment interval range of the buffer for playing stream.
   *
   * Available since: 2.1.0
   * Description: Set the range of adaptive adjustment of the internal buffer of the sdk when streaming is 0-4000ms.
   * Use cases: Generally, in the case of a poor network environment, adjusting and increasing the playback buffer of the pull stream will significantly reduce the audio and video freezes, but will increase the delay.
   * When to call: after called [createEngine].
   * Restrictions: None.
   * Caution: When the upper limit of the cache interval set by the developer exceeds 4000ms, the value will be 4000ms. When the upper limit of the cache interval set by the developer is less than the lower limit of the cache interval, the upper limit will be automatically set as the lower limit.
   *
   * @param streamID Stream ID.
   * @param minBufferInterval The lower limit of the buffer adaptation interval, in milliseconds. The default value is 0ms.
   * @param maxBufferInterval The upper limit of the buffer adaptation interval, in milliseconds. The default value is 4000ms.
   */
  setPlayStreamBufferIntervalRange(
    streamID: string,
    minBufferInterval: number,
    maxBufferInterval: number
  ): void {
    return ZegoExpressEngineImpl.instance.setPlayStreamBufferIntervalRange(
      streamID,
      minBufferInterval,
      maxBufferInterval
    )
  }

  /**
   * Set the weight of the pull stream priority.
   *
   * Available since: 1.1.0
   * Description: Set the weight of the streaming priority.
   * Use cases: This interface can be used when developers need to prioritize the quality of a stream in business. For example: in class scene, if students pull multiple streams, you can set high priority for teacher stream.
   * When to call: after called [startPlayingStream].
   * Restrictions: None.
   * Caution: By default, all streams have the same weight. Only one stream can be set with high priority, whichever is set last. After the flow is stopped, the initial state is automatically restored, and all flows have the same weight.When the local network is not good, while ensuring the focus flow, other stalls may be caused more.
   *
   * @param streamID Stream ID.
   */
  setPlayStreamFocusOn(streamID: string): void {
    return ZegoExpressEngineImpl.instance.setPlayStreamFocusOn(streamID)
  }

  /**
   * Whether the pull stream can receive the specified audio data.
   *
   * Available since: 1.1.0
   * Description: In the process of real-time audio and video interaction, local users can use this function to control whether to receive audio data from designated remote users when pulling streams as needed. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
   * Use cases: Call this function when developers need to quickly close and restore remote audio. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
   * When to call: This function can be called after calling [createEngine].
   * Caution: This function is valid only when the [muteAllPlayStreamAudio] function is set to `false`.
   * Related APIs: You can call the [muteAllPlayStreamAudio] function to control whether to receive all audio data. When the two functions [muteAllPlayStreamAudio] and [mutePlayStreamAudio] are set to `false` at the same time, the local user can receive the audio data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamAudio(true)] function is called, it is globally effective, that is, local users will be prohibited from receiving all remote users' audio data. At this time, the [mutePlayStreamAudio] function will not take effect whether it is called before or after [muteAllPlayStreamAudio].2. When the [muteAllPlayStreamAudio(false)] function is called, the local user can receive the audio data of all remote users. At this time, the [mutePlayStreamAudio] function can be used to control whether to receive a single audio data. Calling the [mutePlayStreamAudio(true, streamID)] function allows the local user to receive audio data other than the `streamID`; calling the [mutePlayStreamAudio(false, streamID)] function allows the local user to receive all audio data.
   *
   * @param streamID Stream ID.
   * @param mute Whether it can receive the audio data of the specified remote user when streaming, "true" means prohibition, "false" means receiving, the default value is "false".
   */
  mutePlayStreamAudio(streamID: string, mute: boolean): void {
    return ZegoExpressEngineImpl.instance.mutePlayStreamAudio(streamID, mute)
  }

  /**
   * Whether the pull stream can receive the specified video data.
   *
   * Available since: 1.1.0
   * Description: In the process of real-time video and video interaction, local users can use this function to control whether to receive video data from designated remote users when pulling streams as needed. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
   * Use cases: This function can be called when developers need to quickly close and resume watching remote video. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
   * When to call: This function can be called after calling [createEngine].
   * Caution: This function is valid only when the [muteAllPlayStreamVideo] function is set to `false`. When you mute the video stream, the view remains at the last frame by default, if you need to clear the last frame, please contact ZEGO technical support.
   * Related APIs: You can call the [muteAllPlayStreamVideo] function to control whether to receive all video data. When the two functions [muteAllPlayStreamVideo] and [mutePlayStreamVideo] are set to `false` at the same time, the local user can receive the video data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamVideo(true)] function is called, it will take effect globally, that is, local users will be prohibited from receiving all remote users' video data. At this time, the [mutePlayStreamVideo] function will not take effect whether it is called before or after [muteAllPlayStreamVideo]. 2. When the [muteAllPlayStreamVideo(false)] function is called, the local user can receive the video data of all remote users. At this time, the [mutePlayStreamVideo] function can be used to control whether to receive a single video data. Call the [mutePlayStreamVideo(true, streamID)] function, the local user can receive other video data other than the `streamID`; call the [mutePlayStreamVideo(false, streamID)] function, the local user can receive all the video data.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param streamID Stream ID.
   * @param mute Whether it is possible to receive the video data of the specified remote user when streaming, "true" means prohibition, "false" means receiving, the default value is "false".
   */
  mutePlayStreamVideo(streamID: string, mute: boolean): void {
    return ZegoExpressEngineImpl.instance.mutePlayStreamVideo(streamID, mute)
  }

  /**
   * Can the pull stream receive all audio data.
   *
   * Available since: 2.4.0
   * Description: In the process of real-time audio and video interaction, local users can use this function to control whether to receive audio data from all remote users when pulling streams (including the audio streams pushed by users who have newly joined the room after calling this function). By default, users can receive audio data pushed by all remote users after joining the room. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
   * Use cases: Call this function when developers need to quickly close and restore remote audio. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
   * When to call: This function can be called after calling [createEngine].
   * Related APIs: You can call the [mutePlayStreamAudio] function to control whether to receive a single piece of audio data. When the two functions [muteAllPlayStreamAudio] and [mutePlayStreamAudio] are set to `false` at the same time, the local user can receive the audio data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamAudio(true)] function is called, it takes effect globally, that is, local users will be prohibited from receiving audio data from all remote users. At this time, the [mutePlayStreamAudio] function will not take effect no matter if the [mutePlayStreamAudio] function is called before or after [muteAllPlayStreamAudio]. 2. When the [muteAllPlayStreamAudio(false)] function is called, the local user can receive the audio data of all remote users. At this time, the [mutePlayStreamAudio] function can be used to control whether to receive a single audio data. Calling the [mutePlayStreamAudio(true, streamID)] function allows the local user to receive audio data other than the `streamID`; calling the [mutePlayStreamAudio(false, streamID)] function allows the local user to receive all audio data.
   *
   * @param mute Whether it is possible to receive audio data from all remote users when streaming, "true" means prohibition, "false" means receiving, and the default value is "false".
   */
  muteAllPlayStreamAudio(mute: boolean): void {
    return ZegoExpressEngineImpl.instance.muteAllPlayStreamAudio(mute)
  }

  /**
   * Can the pull stream receive all video data.
   *
   * Available since: 2.4.0
   * Description: In the process of real-time video and video interaction, local users can use this function to control whether to receive all remote users' video data when pulling the stream (including the video stream pushed by the new user who joins the room after calling this function). By default, users can receive video data pushed by all remote users after joining the room. When the developer does not receive the audio receipt, the hardware and network overhead can be reduced.
   * Use cases: This function can be called when developers need to quickly close and resume watching remote video. Compared to re-flow, it can greatly reduce the time and improve the interactive experience.
   * When to call: This function can be called after calling [createEngine].
   * Caution: When you mute the video stream, the view remains at the last frame by default, if you need to clear the last frame, please contact ZEGO technical support.
   * Related APIs: You can call the [mutePlayStreamVideo] function to control whether to receive a single piece of video data. When the two functions [muteAllPlayStreamVideo] and [mutePlayStreamVideo] are set to `false` at the same time, the local user can receive the video data of the remote user when the stream is pulled: 1. When the [muteAllPlayStreamVideo(true)] function is called, it will take effect globally, that is, the local user will be prohibited from receiving all remote users' video data. At this time, the [mutePlayStreamVideo] function will not take effect whether it is called before or after [muteAllPlayStreamVideo]. 2. When the [muteAllPlayStreamVideo(false)] function is called, the local user can receive the video data of all remote users. At this time, the [mutePlayStreamVideo] function can be used to control whether to receive a single video data. Call the [mutePlayStreamVideo(true, streamID)] function, the local user can receive other video data other than the `streamID`; call the [mutePlayStreamVideo(false, streamID)] function, the local user can receive all the video data.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param mute Whether it is possible to receive all remote users' video data when streaming, "true" means prohibition, "false" means receiving, and the default value is "false".
   */
  muteAllPlayStreamVideo(mute: boolean): void {
    return ZegoExpressEngineImpl.instance.muteAllPlayStreamVideo(mute)
  }

  /**
   * Enables or disables hardware decoding.
   *
   * Available since: 1.1.0
   * Description: Control whether hardware decoding is used when playing streams, with hardware decoding enabled the SDK will use the GPU for decoding, reducing CPU usage.
   * Use cases: If developers find that the device heats up badly when playing large resolution audio and video streams during testing on some models, consider calling this function to enable hardware decoding.
   * Default value: Hardware decoding is disabled by default when this interface is not called.
   * When to call: This function needs to be called after [createEngine] creates an instance.
   * Restrictions: None.
   * Caution: Need to be called before calling [startPlayingStream], if called after playing the stream, it will only take effect after stopping the stream and re-playing it. Once this configuration has taken effect, it will remain in force until the next call takes effect.
   *
   * @param enable Whether to turn on hardware decoding switch, true: enable hardware decoding, false: disable hardware decoding.
   */
  enableHardwareDecoder(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableHardwareDecoder(enable)
  }

  /**
   * Enables or disables frame order detection.
   *
   * Available since: 1.1.0
   * Description: Control whether to turn on frame order detection.
   * Use cases: Turning on frame order detection when pulling cdn's stream will prevent splash screens.
   * Default value: Turn on frame order detection by default when this interface is not called.
   * When to call: This function needs to be called after [createEngine] creates an instance.
   * Restrictions: None.
   * Caution: Turn off frame order detection during playing stream may result in a brief splash screen.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param enable Whether to turn on frame order detection, true: enable check poc, false: disable check poc.
   */
  enableCheckPoc(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableCheckPoc(enable)
  }

  /**
   * Whether the specified video decoding format is supported.
   *
   * Available since: 2.12.0
   * Description: Whether the specified video decoding is supported depends on the following aspects: whether the hardware model supports hard decoding, whether the performance of the hardware model supports soft decoding, and whether the SDK includes the decoding module.
   * When to call: After creating the engine.
   * Caution: It is recommended that users call this interface to obtain the H.265 decoding support capability before pulling the H.265 stream. If it is not supported, the user can pull the stream of other encoding formats, such as H.264.
   *
   * @param codecID Video codec id.Required: Yes.
   * @return Whether the specified video decoding format is supported; true means supported, you can use this decoding format for playing stream; false means not supported, and the decoding format cannot be used for play stream.
   */
  isVideoDecoderSupported(codecID: zego.ZegoVideoCodecID): boolean {
    return ZegoExpressEngineImpl.instance.isVideoDecoderSupported(codecID)
  }

  /**
   * Mutes or unmutes the microphone.
   *
   * Available since: 1.1.0
   * Description: This function is used to control whether to use the collected audio data. Mute (turn off the microphone) will use the muted data to replace the audio data collected by the device for streaming. At this time, the microphone device will still be occupied.
   * Default value: The default is `false`, which means no muting.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Related APIs: Developers who want to control whether to use microphone on the UI should use this function to avoid unnecessary performance overhead by using the [enableAudioCaptureDevice]. You can use [isMicrophoneMuted] to check if the microphone is muted.
   *
   * @param mute Whether to mute (disable) the microphone, `true`: mute (disable) microphone, `false`: enable microphone.
   */
  muteMicrophone(mute: boolean): void {
    return ZegoExpressEngineImpl.instance.muteMicrophone(mute)
  }

  /**
   * Checks whether the microphone is muted.
   *
   * Available since: 1.1.0
   * Description: Used to determine whether the microphone is set to mute.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Related APIs: [muteMicrophone].
   *
   * @return Whether the microphone is muted; true: the microphone is muted; `false`: the microphone is enable (not muted).
   */
  isMicrophoneMuted(): boolean {
    return ZegoExpressEngineImpl.instance.isMicrophoneMuted()
  }

  /**
   * Mutes or unmutes the audio output speaker.
   *
   * Available since: 1.1.0
   * Description: After mute speaker, all the SDK sounds will not play, including playing stream, mediaplayer, etc. But the SDK will still occupy the output device.
   * Default value: The default is `false`, which means no muting.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   *
   * @param mute Whether to mute (disable) speaker audio output, `true`: mute (disable) speaker audio output, `false`: enable speaker audio output.
   */
  muteSpeaker(mute: boolean): void {
    return ZegoExpressEngineImpl.instance.muteSpeaker(mute)
  }

  /**
   * Checks whether the audio output speaker is muted.
   *
   * Available since: 1.1.0
   * Description: Used to determine whether the audio output is muted.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Related APIs: [muteSpeaker].
   *
   * @return Whether the speaker is muted; `true`: the speaker is muted; `false`: the speaker is enable (not muted).
   */
  isSpeakerMuted(): boolean {
    return ZegoExpressEngineImpl.instance.isSpeakerMuted()
  }

  /**
   * Gets a list of audio devices.
   *
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @return Audo device List
   */
  getAudioDeviceList(deviceType: zego.ZegoAudioDeviceType): zego.ZegoDeviceInfo[] {
    return ZegoExpressEngineImpl.instance.getAudioDeviceList(deviceType)
  }

  /**
   * Get the device ID of the default audio device.
   *
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @return Default Audio device ID
   */
  getDefaultAudioDeviceID(deviceType: zego.ZegoAudioDeviceType): string {
    return ZegoExpressEngineImpl.instance.getDefaultAudioDeviceID(deviceType)
  }

  /**
   * Chooses to use the specified audio device.
   *
   * Available since: 1.0.0
   * Description: Chooses to use the specified audio device.
   * When to call: After creating the engine [createEngine] and before call [startPublishingStream] or [startPlayingStream].
   * Restrictions: Only supports Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   */
  useAudioDevice(deviceType: zego.ZegoAudioDeviceType, deviceID: string): void {
    return ZegoExpressEngineImpl.instance.useAudioDevice(deviceType, deviceID)
  }

  /**
   * Get volume for the specified audio device.
   *
   * Get volume for the specified audio device. Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   * @return Device volume
   */
  getAudioDeviceVolume(deviceType: zego.ZegoAudioDeviceType, deviceID: string): number {
    return ZegoExpressEngineImpl.instance.getAudioDeviceVolume(deviceType, deviceID)
  }

  /**
   * Set volume for the specified audio device.
   *
   * The direct operating system device may fail due to system restrictions. Please use [setCaptureVolume] and [setPlayVolume] first to adjust the volume of publish and play streams.
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   * @param volume Device volume
   */
  setAudioDeviceVolume(
    deviceType: zego.ZegoAudioDeviceType,
    deviceID: string,
    volume: number
  ): void {
    return ZegoExpressEngineImpl.instance.setAudioDeviceVolume(deviceType, deviceID, volume)
  }

  /**
   * Turn on audio device volume monitoring.
   *
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   */
  startAudioDeviceVolumeMonitor(deviceType: zego.ZegoAudioDeviceType, deviceID: string): void {
    return ZegoExpressEngineImpl.instance.startAudioDeviceVolumeMonitor(deviceType, deviceID)
  }

  /**
   * Turn off audio device volume monitoring. Only for Windows/macOS.
   *
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   */
  stopAudioDeviceVolumeMonitor(deviceType: zego.ZegoAudioDeviceType, deviceID: string): void {
    return ZegoExpressEngineImpl.instance.stopAudioDeviceVolumeMonitor(deviceType, deviceID)
  }

  /**
   * Mutes or unmutes the audio device.
   *
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   * @param mute Whether to mute the audio device; true means to mute the audio device; false means to unmute the audio device.
   */
  muteAudioDevice(deviceType: zego.ZegoAudioDeviceType, deviceID: string, mute: boolean): void {
    return ZegoExpressEngineImpl.instance.muteAudioDevice(deviceType, deviceID, mute)
  }

  /**
   * Set the audio device mode.
   *
   * Available since: 2.22.0
   * Description: Select audio equipment mode according to the need of the scene (only supported by Android and iOS).
   * Use cases: In the case of KTV, the General mode must be used, but in the language room, the Communication2 or Communication3 mode is required in order to avoid the sound of third-party music being collected.
   * When to call: After creating the engine [createEngine].
   * Caution: This interface triggers startup switchover of the device. You are advised not to invoke this interface frequently to avoid unnecessary overhead and hardware problems. This interface may cause the volume mode to switch between call and media. If the media volume is inconsistent with the call volume, the volume may change.
   *
   * @param deviceMode Audio device mode
   */
  setAudioDeviceMode(deviceMode: zego.ZegoAudioDeviceMode): void {
    return ZegoExpressEngineImpl.instance.setAudioDeviceMode(deviceMode)
  }

  /**
   * Check if the audio device is muted.
   *
   * Only for Windows / macOS / Linux
   *
   * @param deviceType Audio device type
   * @param deviceID ID of a device obtained by [getAudioDeviceList]
   * @return Whether the audio device is muted; true means the audio device is muted; false means the audio device is not muted.
   */
  isAudioDeviceMuted(deviceType: zego.ZegoAudioDeviceType, deviceID: string): boolean {
    return ZegoExpressEngineImpl.instance.isAudioDeviceMuted(deviceType, deviceID)
  }

  /**
   * Enables or disables the audio capture device.
   *
   * Available since: 1.1.0
   * Description: This function is used to control whether to use the audio collection device. When the audio collection device is turned off, the SDK will no longer occupy the audio device. Of course, if the stream is being published at this time, there is no audio data.
   * Use cases: When the user never needs to use the audio, you can call this function to close the audio collection.
   * Default value: The default is `true`.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Related APIs: Turning off or turning on the microphone on the hardware is a time-consuming operation, and there is a certain performance overhead when the user performs frequent operations. [muteMicrophone] is generally recommended.
   *
   * @param enable Whether to enable the audio capture device, `true`: enable audio capture device, `false`: disable audio capture device.
   */
  enableAudioCaptureDevice(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableAudioCaptureDevice(enable)
  }

  /**
   * get current audio route type.
   *
   * Available since: 1.1.0
   * Description: Audio routing refers to the audio output device that an app uses to play audio, and common audio routes are: speakers, handsets, headphones, Bluetooth devices, and so on.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Related APIs: Set audio route to speaker [setAudioRouteToSpeaker].
   */
  getAudioRouteType(): zego.ZegoAudioRoute {
    return ZegoExpressEngineImpl.instance.getAudioRouteType()
  }

  /**
   * Whether to use the built-in speaker to play audio.
   *
   * Available since: 1.1.0
   * Description: Whether to use the speaker to play audio, when you choose not to use the built-in speaker to play the sound, the SDK will select the audio output device with the highest current priority to play the sound according to the system schedule, and common audio routes are: handsets, headphones, Bluetooth devices, and so on.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Related APIs: Get the current audio route [getAudioRouteType].
   *
   * @param defaultToSpeaker Whether to use the built-in speaker to play sound, `true`: use the built-in speaker to play sound, `false`: use the highest priority audio output device scheduled by the current system to play sound
   */
  setAudioRouteToSpeaker(defaultToSpeaker: boolean): void {
    return ZegoExpressEngineImpl.instance.setAudioRouteToSpeaker(defaultToSpeaker)
  }

  /**
   * Turns on/off the camera (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: This function is used to control whether to start the capture of the camera. After the camera is turned off, the video capture will not be performed. At this time, there will be no video data for local preview and push streaming.
   * Default value: The default is `true` which means the camera is turned on.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Caution: In the case of using the custom video capture function [enableCustomVideoCapture], since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, but this function still affects whether to encode or not. Therefore, when developers use custom video capture, please ensure that the value of this function is `true`.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param enable Whether to turn on the camera, `true`: turn on camera, `false`: turn off camera
   * @param channel Publishing stream channel
   */
  enableCamera(enable: boolean, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.enableCamera(enable, channel)
  }

  /**
   * Switches to the front or the rear camera (for the specified channel).
   *
   * Available since: 1.1.0
   * Description: This function is used to control the use of the front camera or the rear camera (only supported by Android and iOS).
   * Default value: The default is `true` which means the front camera is used.
   * When to call: After creating the engine [createEngine].
   * Restrictions: None.
   * Caution: When the custom video capture function [enableCustomVideoCapture] is turned on, since the developer has taken over the video data capture, the SDK is no longer responsible for the video data capture, and this function is no longer valid.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param enable Whether to use the front camera, `true`: use the front camera, `false`: use the the rear camera.
   * @param channel Publishing stream channel
   */
  useFrontCamera(enable: boolean, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.useFrontCamera(enable, channel)
  }

  /**
   * Whether the camera supports focusing.
   *
   * Available since: 2.14.0
   * Description: Whether the camera supports focusing.
   * Trigger: Called after turn on preview [startPreivew].
   * Caution: Need to start the camera successfully.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param channel Publishing stream channel
   * @return Whether to support focus, support is true, not support is false.
   */
  isCameraFocusSupported(channel?: zego.ZegoPublishChannel): boolean {
    return ZegoExpressEngineImpl.instance.isCameraFocusSupported(channel)
  }

  /**
   * Set the camera focus mode.
   *
   * Available since: 2.14.0
   * Description: Set the camera focus mode.
   * Trigger: Called after turn on preview [startPreivew].
   * Restrictions: Currently only supports iOS and Android platforms.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param mode focus mode.
   * @param channel Publishing stream channel
   */
  setCameraFocusMode(mode: zego.ZegoCameraFocusMode, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setCameraFocusMode(mode, channel)
  }

  /**
   * Set the focus point in the preview view.
   *
   * Available since: 2.14.0
   * Description: Set the focus point in the preview view. (x, y) are the normalized coordinates in the preview view, that is, the ratio of the position of the focus point relative to the preview view and the width and height of the preview view. The upper left corner is (0, 0).
   * Trigger: Called after turn on preview [startPreivew].
   * Restrictions: Currently only supports iOS and Android platforms.
   * Caution: Every time the camera restarts the acquisition, the settings will become invalid and need to be reset.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param x Normalized X axis coordinate value, effective value [0,1].
   * @param y Normalized Y axis coordinate value, effective value [0,1].
   * @param channel Publishing stream channel
   */
  setCameraFocusPointInPreview(x: number, y: number, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setCameraFocusPointInPreview(x, y, channel)
  }

  /**
   * Set the camera exposure mode.
   *
   * Available since: 2.14.0
   * Description: Set the camera exposure mode.
   * Trigger: Called after turn on preview [startPreivew].
   * Restrictions: Currently only supports iOS and Android platforms.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param mode Exposure mode.
   * @param channel Publishing stream channel
   */
  setCameraExposureMode(
    mode: zego.ZegoCameraExposureMode,
    channel?: zego.ZegoPublishChannel
  ): void {
    return ZegoExpressEngineImpl.instance.setCameraExposureMode(mode, channel)
  }

  /**
   * Set the exposure point in the preview view.
   *
   * Available since: 2.14.0
   * Description: Set the exposure point in the preview view. (x, y) are the normalized coordinates in the preview view, that is, the ratio of the position of the exposure point relative to the preview view and the width and height of the preview view. The upper left corner is (0, 0).
   * Trigger: Called after turn on preview [startPreivew].
   * Restrictions: Currently only supports iOS and Android platforms.
   * Caution: Every time the camera restarts the acquisition, the settings will become invalid and need to be reset.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param x Normalized X axis coordinate value, effective value [0,1].
   * @param y Normalized Y axis coordinate value, effective value [0,1].
   * @param channel Publishing stream channel
   */
  setCameraExposurePointInPreview(x: number, y: number, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setCameraExposurePointInPreview(x, y, channel)
  }

  /**
   * Set the camera exposure compensation value.
   *
   * Available since: 2.10.0
   * Description: Set the camera exposure compensation value.
   * Use cases: User can call this function to set the camera exposure compensation value.
   * When to call /Trigger: Called this function after calling [startPublishingStream] or [startPreview].
   * Restrictions: None.
   * Caution: The setting will be invalid when the camera is restarted.
   * Platform differences: Only supports iOS and Android.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param value Camera exposure, the value range is [-1,1], the default 0, -1 tends to darken, 1 tends to brighten.
   * @param channel Publishing stream channel
   */
  setCameraExposureCompensation(value: number, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setCameraExposureCompensation(value, channel)
  }

  /**
   * Set the zoom factor of the camera. Every time the camera is restarted, the camera zoom factor will return to the initial value (1.0).
   *
   * Available since: 1.20.0
   * Description: Set the camera zoom factor. Every time the camera is restarted, the camera zoom factor will be restored to its initial value.
   * When to call: After creating the engine [createEngine].
   * Restrictions: The settings will not take effect until the camera is started.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param factor The zoom factor of the camera, the minimum value is 1.0, and the maximum value is the return value of [getCameraMaxZoomFactor].
   * @param channel Publishing stream channel
   */
  setCameraZoomFactor(factor: number, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.setCameraZoomFactor(factor, channel)
  }

  /**
   * Get the maximum zoom factor of the camera.
   *
   * Available since: 1.20.0
   * Description: Set the camera zoom factor. Every time the camera is restarted, the camera zoom factor will be restored to its initial value.
   * When to call: This is only available after the camera has been successfully started, and can generally be called when the captured first frame is received [onPublisherCapturedVideoFirstFrame] callback.
   * Restrictions: None.
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param channel Publishing stream channel
   * @return The maximum zoom factor of the camera.
   */
  getCameraMaxZoomFactor(channel?: zego.ZegoPublishChannel): number {
    return ZegoExpressEngineImpl.instance.getCameraMaxZoomFactor(channel)
  }

  /**
   * Enable camera adaptive frame rate.
   *
   * Available since: 2.20.0
   * Description: After enabling, the SDK matches the capture frame rate range supported by the camera according to the set frame rate range, and dynamically adjusts the capture frame rate of the camera according to the ambient brightness within this range to improve the screen brightness when the set frame rate is too high.
   * Use cases: The frame rate set by the user on the streaming end is too high, and the ambient lighting is low, so the subject cannot be displayed or recognized normally. For example, live broadcast scenes with high exposure requirements.
   * When to call: After creating the engine [createEngine], before the camera starts.
   * Caution: Takes When calling [setVideoConfig] to set the frame rate lower than the expected minimum frame rate, the frame rate value set by [setVideoConfig] will be used. Due to the different hardware and algorithm strategies of different mobile phone manufacturers, the effect of this interface is different on different models or on the front and rear cameras of the same model.
   * Related APIs: Through [setVideoConfig], you can set the camera capture frame rate and the encoder encoding frame rate.
   *
   * @param enable Whether to enable camera adaptive frame rate. true means on, false means off.Off by default.
   * @param minFPS Desired minimum frame rate, 15 recommended. Unit: fps.
   * @param maxFPS Desired minimum frame rate, 25 recommended. Unit: fps.
   * @param channel Publishing stream channel.
   */
  enableCameraAdaptiveFPS(
    enable: boolean,
    minFPS: number,
    maxFPS: number,
    channel?: zego.ZegoPublishChannel
  ): void {
    return ZegoExpressEngineImpl.instance.enableCameraAdaptiveFPS(enable, minFPS, maxFPS, channel)
  }

  /**
   * Chooses to use the specified video device (for the specified channel).
   *
   * Only for Windows / macOS / Linux
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @param deviceID ID of a device obtained by [getVideoDeviceList]
   * @param channel Publishing stream channel
   */
  useVideoDevice(deviceID: string, channel?: zego.ZegoPublishChannel): void {
    return ZegoExpressEngineImpl.instance.useVideoDevice(deviceID, channel)
  }

  /**
   * Gets a list of video devices.
   *
   * Only for Windows / macOS / Linux
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @return Video device List
   */
  getVideoDeviceList(): zego.ZegoDeviceInfo[] {
    return ZegoExpressEngineImpl.instance.getVideoDeviceList()
  }

  /**
   * Get the device ID of the default video device.
   *
   * Only for Windows / macOS / Linux
   * Note: This function is only available in ZegoExpressVideo SDK!
   *
   * @return Default video device ID
   */
  getDefaultVideoDeviceID(): string {
    return ZegoExpressEngineImpl.instance.getDefaultVideoDeviceID()
  }

  /**
   * Starts sound level monitoring. Support enable some advanced feature.
   *
   * Available since: 2.10.0
   * Description: After starting monitoring, you can receive local audio sound level via [onCapturedSoundLevelUpdate] callback, and receive remote audio sound level via [onRemoteSoundLevelUpdate] callback. Before entering the room, you can call [startPreview] with this function and combine it with [onCapturedSoundLevelUpdate] callback to determine whether the audio device is working properly.
   * Use cases: During the publishing and playing process, determine who is talking on the wheat and do a UI presentation.
   * When to call: After the engine is created [createEngine].
   * Caution:
   *   1. [onCapturedSoundLevelUpdate] and [onRemoteSoundLevelUpdate] callback notification period is the value set by the parameter.
   *   2. After the sound monitoring is started, even if the local audio capture is not started, [onCapturedSoundLevelUpdate] will have a callback, and the sound level is 0.
   *
   * @param config Configuration for starts the sound level monitor.
   */
  startSoundLevelMonitor(config?: zego.ZegoSoundLevelConfig): void {
    return ZegoExpressEngineImpl.instance.startSoundLevelMonitor(config)
  }

  /**
   * Stops sound level monitoring.
   *
   * Available since: 1.1.0
   * Description: After the monitoring is stopped, the callback of the local/remote audio sound level will be stopped.
   * When to call: After the engine is created [createEngine].
   * Related APIs: Soundwave monitoring can be initiated via [startSoundLevelMonitor].
   */
  stopSoundLevelMonitor(): void {
    return ZegoExpressEngineImpl.instance.stopSoundLevelMonitor()
  }

  /**
   * Starts audio spectrum monitoring. Support setting the listening interval.
   *
   * Available since: 1.15.0
   * Description: After starting monitoring, you can receive local audio spectrum via [onCapturedAudioSpectrumUpdate] callback, and receive remote audio spectrum via [onRemoteAudioSpectrumUpdate] callback.
   * Use cases: In the host K song scene, has been published or played under the premise that the host or audience to see the tone and volume change animation.
   * When to call: After the engine is created [createEngine].
   * Caution: [onCapturedAudioSpectrumUpdate] and [onRemoteAudioSpectrumUpdate] callback notification period is the value set by the parameter.
   *
   * @param millisecond Monitoring time period of the audio spectrum, in milliseconds, has a value range of [100, 3000]. Default is 100 ms.
   */
  startAudioSpectrumMonitor(millisecond?: number): void {
    return ZegoExpressEngineImpl.instance.startAudioSpectrumMonitor(millisecond)
  }

  /**
   * Stops audio spectrum monitoring.
   *
   * Available since: 1.1.0
   * Description: After the monitoring is stopped, the callback of the local/remote audio spectrum will be stopped.
   * When to call: After the engine is created [createEngine].
   * Related APIs: Audio spectrum monitoring can be initiated via [startAudioSpectrumMonitor].
   */
  stopAudioSpectrumMonitor(): void {
    return ZegoExpressEngineImpl.instance.stopAudioSpectrumMonitor()
  }

  /**
   * Enables or disables headphone monitoring.
   *
   * Available since: 1.9.0
   * Description: Enable/Disable headphone monitor, and users hear their own voices as they use the microphone to capture sounds.
   * When to call: After the engine is created [createEngine].
   * Default value: Disable.
   * Caution:
   *   1. This setting does not actually take effect until both the headset and microphone are connected.
   *   2. The default is to return after acquisition and before pre-processing. If you need to return after pre-processing, please contact ZEGO technical support.
   *
   * @param enable Whether to use headphone monitor, true: enable, false: disable
   */
  enableHeadphoneMonitor(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableHeadphoneMonitor(enable)
  }

  /**
   * Sets the headphone monitor volume.
   *
   * Available since: 1.9.0
   * Description: set headphone monitor volume.
   * When to call: After the engine is created [createEngine].
   * Caution: This setting does not actually take effect until both the headset and microphone are connected.
   * Related APIs: Enables or disables headphone monitoring via [enableHeadphoneMonitor].
   *
   * @param volume headphone monitor volume, range from 0 to 200, 60 as default.
   */
  setHeadphoneMonitorVolume(volume: number): void {
    return ZegoExpressEngineImpl.instance.setHeadphoneMonitorVolume(volume)
  }

  /**
   * Enable or disable system audio capture.
   *
   * Available since: 1.9.0
   * Description: Enable sound card capture to mix sounds played by the system into the publishing stream, such as sounds played by the browser, sounds played by the third-party player, etc.
   * Default value: Default is disable.
   * When to call: Called this function after calling [startPublishingStream] or [startPreview].
   * Restrictions: None.
   * Caution: The system sound card sound does not include streaming sound, media player sound and sound effect player sound.
   * Related APIs: [setMixSystemPlayoutVolume] function can set system audio capture volume.
   * Platform differences: Only supports Windows and macOS.
   *
   * @param enable Whether to mix system playout.
   */
  enableMixSystemPlayout(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableMixSystemPlayout(enable)
  }

  /**
   * set system audio capture volume.
   *
   * Available since: 2.4.0
   * Description:  set system audio capture volume.
   * Use cases: User needs to adjust the volume which system playout mix to stream publishing.
   * When to call /Trigger: Called this function after calling [startPublishingStream] or [startPreview].
   * Restrictions: None.
   * Related APIs: [enableMixSystemPlayout] enable or disable mix system playout.
   * Platform differences: Only supports Windows and macOS.
   *
   * @param volume the volume. Valid range [0, 200], default is 100.
   */
  setMixSystemPlayoutVolume(volume: number): void {
    return ZegoExpressEngineImpl.instance.setMixSystemPlayoutVolume(volume)
  }

  /**
   * Enable or disable mix SDK playout to stream publishing.
   *
   * Available since: 1.0.0
   * Description: Enable mix SDK playout sounds into the stream publishing.
   * Use cases: Users need to mix the sound of SDK playout into stream publishing. For example, when the class scene, the teacher and student Co-hosting, and the teacher can mix the play streaming sound into the publish streaming.
   * Default value: Default is disable.
   * When to call /Trigger: Called this function after calling [startPublishingStream] or [startPreview].
   * Restrictions: None.
   * Platform differences: Only supports Windows and macOS.
   *
   * @param enable Whether to mix engine playout
   */
  enableMixEnginePlayout(enable: boolean): void {
    return ZegoExpressEngineImpl.instance.enableMixEnginePlayout(enable)
  }

  /**
   * Start audio VAD stable state monitoring, and the monitoring period can be set.
   *
   * Available: since 2.17.0
   * Description: After monitoring is started, you can use the [onAudioVADStateUpdate] callback to receive the specified type of audio VAD callback.
   * Use cases: For example, when you specify the type of collection and use the microphone to collect, you can check whether the host has continuous and stable voice input through this interface.
   * When to call: Before publish stream, you can call [startPreview] with this function and combine it with [onAudioVADStateUpdate] callback to determine whether the audio device is working properly.
   * Restrictions: None.
   * Related APIs: [stopAudioVADStableStateMonitor].
   *
   * @param type audio VAD monitor type.
   * @param millisecond monitoring period
   */
  startAudioVADStableStateMonitor(
    type: zego.ZegoAudioVADStableStateMonitorType,
    millisecond: number
  ): void {
    return ZegoExpressEngineImpl.instance.startAudioVADStableStateMonitor(type, millisecond)
  }

  /**
   * Stop audio VAD stable state monitoring.
   *
   * Available: since 2.14.0
   * Description: After calling this interface, the specified type of [onAudioVADStateUpdate] callback can no longer be received.
   * When to call: None.
   * Restrictions: None.
   * Related APIs: [startAudioVADStableStateMonitor].
   *
   * @param type audio VAD monitor type.
   */
  stopAudioVADStableStateMonitor(type: zego.ZegoAudioVADStableStateMonitorType): void {
    return ZegoExpressEngineImpl.instance.stopAudioVADStableStateMonitor(type)
  }

  /**
   * Get the audio device information currently in use.
   *
   * Available since: 2.12.0
   * Description: Get the audio device information currently in use.
   * Use cases: Used for scenes that need to manually switch between multiple audio devices.
   * When to call: Called this function after calling [startPublishingStream] or [startPreview].
   * Restrictions: Only supports Windows and macOS.
   * Related APIs: The default audio device ID can be obtained through [getDefaultAudioDeviceID].
   *
   * @param deviceType Audio device type.Required:Yes.
   * @return Audio device information.
   */
  getCurrentAudioDevice(deviceType: zego.ZegoAudioDeviceType): zego.ZegoDeviceInfo {
    return ZegoExpressEngineImpl.instance.getCurrentAudioDevice(deviceType)
  }
}
