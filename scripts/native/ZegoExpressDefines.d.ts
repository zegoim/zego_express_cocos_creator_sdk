import { ZegoScenario, ZegoViewMode, ZegoStreamCensorshipMode } from './ZegoExpressEnums'

/// Profile for create engine
///
/// Profile for create engine
declare class ZegoEngineProfile {
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
declare class ZegoUser {
  /// User ID, a utf8 string with a maximum length of 64 bytes or less.Privacy reminder: Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc.Caution: Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.Do not use '%' if you need to communicate with the Web SDK.
  userID: string

  /// User Name, a utf8 string with a maximum length of 256 bytes or less.Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc.
  userName: string
}

/// View object.
///
/// Configure view object, view Mode, background color
declare class ZegoCanvas {
  /// The TextureID returned by calling [createTextureRenderer]
  view: number

  /// View mode, default is ZegoViewModeAspectFit
  viewMode?: ZegoViewMode

  /// Background color, the format is 0xRRGGBB, default is black, which is 0x000000
  backgroundColor?: number
}

/// Advanced publisher configuration.
///
/// Configure room id
declare class ZegoPublisherConfig {
  /// The Room ID, It is not necessary to pass in single room mode, but the ID of the corresponding room must be passed in multi-room mode
  roomID?: string

  /// Whether to synchronize the network time when pushing streams. 1 is synchronized with 0 is not synchronized. And must be used with setStreamAlignmentProperty. It is used to align multiple streams at the mixed stream service or streaming end, such as the chorus scene of KTV.
  forceSynchronousNetworkTime?: number

  /// When pushing a flow, review the pattern of the flow. By default, no audit is performed. If you want to use this function, contact ZEGO technical support.
  streamCensorshipMode?: ZegoStreamCensorshipMode
}
