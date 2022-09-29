declare enum ZegoEngineState {
  /** The engine has started */
  Start = 0,
  /** The engine has stoped */
  Stop = 1,
}

declare enum ZegoScenario {
  General = 0,
  Communication = 1,
  Live = 2,
}

declare enum ZegoPublishChannel {
  Main = 0,
  Aux = 1,
}

declare enum ZegoRoomState {
  Disconnected = 0,
  Connecting = 1,
  Connected = 2,
}

/** Room state change reason. */
declare enum ZegoRoomStateChangedReason {
  /** Logging in to the room. When calling [loginRoom] to log in to the room or [switchRoom] to switch to the target room, it will enter this state, indicating that it is requesting to connect to the server. The application interface is usually displayed through this state. */
  Logining = 0,
  /** Log in to the room successfully. When the room is successfully logged in or switched, it will enter this state, indicating that the login to the room has been successful, and users can normally receive callback notifications of other users in the room and all stream information additions and deletions. */
  Logined = 1,
  /** Failed to log in to the room. When the login or switch room fails, it will enter this state, indicating that the login or switch room has failed, for example, AppID or Token is incorrect, etc. */
  LoginFailed = 2,
  /** The room connection is temporarily interrupted. If the interruption occurs due to poor network quality, the SDK will retry internally. */
  Reconnecting = 3,
  /** The room is successfully reconnected. If there is an interruption due to poor network quality, the SDK will retry internally, and enter this state after successful reconnection. */
  Reconnected = 4,
  /** The room fails to reconnect. If there is an interruption due to poor network quality, the SDK will retry internally, and enter this state after the reconnection fails. */
  ReconnectFailed = 5,
  /** Kicked out of the room by the server. For example, if you log in to the room with the same user name in other places, and the local end is kicked out of the room, it will enter this state. */
  KickOut = 6,
  /** Logout of the room is successful. It is in this state by default before logging into the room. When calling [logoutRoom] to log out of the room successfully or [switchRoom] to log out of the current room successfully, it will enter this state. */
  Logout = 7,
  /** Failed to log out of the room. Enter this state when calling [logoutRoom] fails to log out of the room or [switchRoom] fails to log out of the current room internally. */
  LogoutFailed = 8,
}

declare enum ZegoUpdateType {
  Add = 0,
  Delete = 1,
}

declare enum ZegoPublisherState {
  NoPublish = 0,
  PublishRequesting = 1,
  Publishing = 2,
}

/** Profile for create engine */
declare class ZegoEngineProfile {
  /** Application ID issued by ZEGO for developers, please apply from the ZEGO Admin Console https://console-express.zego.im The value ranges from 0 to 4294967295. */
  appID: number
  /** Application signature for each AppID, please apply from the ZEGO Admin Console. Application signature is a 64 character string. Each character has a range of '0' ~ '9', 'a' ~ 'z'. AppSign native 2.17.0 and later allows nil or no transmission. If the token is passed empty or not passed, the token must be entered in the [ZegoRoomConfig] parameter for authentication when the [loginRoom] interface is called to login to the room. Token generated way please refer to the [use token authentication] (https://doc-zh.zego.im/article/10360). */
  appSign: string
  /** The application scenario. Developers can choose one of ZegoScenario based on the scenario of the app they are developing, and the engine will preset a more general setting for specific scenarios based on the set scenario. After setting specific scenarios, developers can still call specific functions to set specific parameters if they have customized parameter settings. */
  scenario: ZegoScenario
}

declare class ZegoUser {
  userID: string
  userName: string
}
