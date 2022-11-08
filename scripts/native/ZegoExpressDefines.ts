import { Sprite } from 'cc'

/// Application scenario.
export enum ZegoScenario {
  /// General scenario
  General,

  /// Communication scenario
  Communication,

  /// Live scenario
  Live,
}

/// engine state.
export enum ZegoEngineState {
  /// The engine has started
  Start,

  /// The engine has stoped
  Stop,
}

/// Publish channel.
export enum ZegoPublishChannel {
  /// The main (default/first) publish channel.
  Main,

  /// The auxiliary (second) publish channel
  Aux,

  /// The third publish channel
  Third,

  /// The fourth publish channel
  Fourth,
}

/// Publish CensorshipMode.
export enum ZegoStreamCensorshipMode {
  /// no censorship.
  None,

  /// only censorship stream audio.
  Audio,

  /// only censorship stream video.
  Video,

  /// censorship stream audio and video.
  AudioAndVideo,
}

/// Video rendering fill mode.
export enum ZegoViewMode {
  /// The proportional scaling up, there may be black borders
  AspectFit,

  /// The proportional zoom fills the entire View and may be partially cut
  AspectFill,

  /// Fill the entire view, the image may be stretched
  ScaleToFill,
}

export enum ZegoRoomState {
  Disconnected = 0,
  Connecting = 1,
  Connected = 2,
}

/// Room state change reason.
export enum ZegoRoomStateChangedReason {
  /// Logging in to the room. When calling [loginRoom] to log in to the room or [switchRoom] to switch to the target room, it will enter this state, indicating that it is requesting to connect to the server. The application interface is usually displayed through this state.
  Logining,

  /// Log in to the room successfully. When the room is successfully logged in or switched, it will enter this state, indicating that the login to the room has been successful, and users can normally receive callback notifications of other users in the room and all stream information additions and deletions.
  Logined,

  /// Failed to log in to the room. When the login or switch room fails, it will enter this state, indicating that the login or switch room has failed, for example, AppID or Token is incorrect, etc.
  LoginFailed,

  /// The room connection is temporarily interrupted. If the interruption occurs due to poor network quality, the SDK will retry internally.
  Reconnecting,

  /// The room is successfully reconnected. If there is an interruption due to poor network quality, the SDK will retry internally, and enter this state after successful reconnection.
  Reconnected,

  /// The room fails to reconnect. If there is an interruption due to poor network quality, the SDK will retry internally, and enter this state after the reconnection fails.
  ReconnectFailed,

  /// Kicked out of the room by the server. For example, if you log in to the room with the same user name in other places, and the local end is kicked out of the room, it will enter this state.
  KickOut,

  /// Logout of the room is successful. It is in this state by default before logging into the room. When calling [logoutRoom] to log out of the room successfully or [switchRoom] to log out of the current room successfully, it will enter this state.
  Logout,

  /// Failed to log out of the room. Enter this state when calling [logoutRoom] fails to log out of the room or [switchRoom] fails to log out of the current room internally.
  LogoutFailed,
}

/// Update type.
export enum ZegoUpdateType {
  /// Add
  Add,

  /// Delete
  Delete,
}

/// Publish stream status.
export enum ZegoPublisherState {
  /// The state is not published, and it is in this state before publishing the stream. If a steady-state exception occurs in the publish process, such as AppID or Token are incorrect, or if other users are already publishing the stream, there will be a failure and enter this state.
  NoPublish,

  /// The state that it is requesting to publish the stream after the [startPublishingStream] function is successfully called. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state.
  PublishRequesting,

  /// The state that the stream is being published, entering the state indicates that the stream has been successfully published, and the user can communicate normally.
  Publishing,
}

/// Profile for create engine
///
/// Profile for create engine
export class ZegoEngineProfile {
  /// Application ID issued by ZEGO for developers, please apply from the ZEGO Admin Console https://console.zegocloud.com The value ranges from 0 to 4294967295.
  appID: number
  /// Application signature for each AppID, please apply from the ZEGO Admin Console. Application signature is a 64 character string. Each character has a range of '0' ~ '9', 'a' ~ 'z'. AppSign 2.17.0 and later allows null or no transmission. If the token is passed empty or not passed, the token must be entered in the [ZegoRoomConfig] parameter for authentication when the [loginRoom] interface is called to login to the room.
  appSign: string
  /// The application scenario. Developers can choose one of ZegoScenario based on the scenario of the app they are developing, and the engine will preset a more general setting for specific scenarios based on the set scenario. After setting specific scenarios, developers can still call specific functions to set specific parameters if they have customized parameter settings.
  scenario: ZegoScenario
}

/// User object.
///
/// Configure user ID and username to identify users in the room.
/// Note that the userID must be unique under the same appID, otherwise, there will be mutual kicks when logging in to the room.
/// It is strongly recommended that userID corresponds to the user ID of the business APP, that is, a userID and a real user are fixed and unique, and should not be passed to the SDK in a random userID. Because the unique and fixed userID allows ZEGO technicians to quickly locate online problems.
export class ZegoUser {
  /// User ID, a utf8 string with a maximum length of 64 bytes or less.Privacy reminder: Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc.Caution: Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.Do not use '%' if you need to communicate with the Web SDK.
  userID: string

  /// User Name, a utf8 string with a maximum length of 256 bytes or less.Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc.
  userName: string
}

/// View object.
///
/// Configure view object, view Mode, background color
export class ZegoCanvas {
  /// The TextureID returned by calling [createTextureRenderer]
  view: Sprite

  /// View mode, default is ZegoViewModeAspectFit
  viewMode?: ZegoViewMode

  /// Background color, the format is 0xRRGGBB, default is black, which is 0x000000
  backgroundColor?: number
}

/// Advanced publisher configuration.
///
/// Configure room id
export class ZegoPublisherConfig {
  /// The Room ID, It is not necessary to pass in single room mode, but the ID of the corresponding room must be passed in multi-room mode
  roomID?: string

  /// Whether to synchronize the network time when pushing streams. 1 is synchronized with 0 is not synchronized. And must be used with setStreamAlignmentProperty. It is used to align multiple streams at the mixed stream service or streaming end, such as the chorus scene of KTV.
  forceSynchronousNetworkTime?: number

  /// When pushing a flow, review the pattern of the flow. By default, no audit is performed. If you want to use this function, contact ZEGO technical support.
  streamCensorshipMode?: ZegoStreamCensorshipMode
}
