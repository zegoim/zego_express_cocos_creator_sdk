/** Room scenario. */
export enum ZegoScenario {
  /** [Deprecated] Legacy general scenario, this scenario has been deprecated since version 3.0.0, and it is not recommended to use, please migrate to other new scenario as soon as possible. */
  General = 0,
  /** [Deprecated] Legacy communication scenario, this scenario has been deprecated since version 3.0.0, and it is not recommended to use, please migrate to other new scenario as soon as possible. */
  Communication = 1,
  /** [Deprecated] Legacy live broadcast scenario, this scenario has been deprecated since version 3.0.0, and it is not recommended to use, please migrate to other new scenario as soon as possible. */
  Live = 2,
  /** Available since: 3.0.0. Description: The default (generic) scenario. If none of the following scenarios conform to your actual application scenario, this default scenario can be used. */
  Default = 3,
  /** Available since: 3.0.0. Description: Standard video call (or voice call) scenario, it is suitable for one-to-one video or voice call scenarios. */
  StandardVideoCall = 4,
  /** Available since: 3.0.0. Description: High quality video call (or voice call) scenario, it is similar to the standard video call scenario, but this scenario uses a higher video frame rate, bit rate, and resolution (540p) by default, which is suitable for video call scenario with high image quality requirements. */
  HighQualityVideoCall = 5,
  /** Available since: 3.0.0. Description: Standard chatroom scenario, suitable for multi-person pure voice calls (low data usage). Note: On the ExpressVideo SDK, the camera is not enabled by default in this scenario. */
  StandardChatroom = 6,
  /** Available since: 3.0.0. Description: High quality chatroom scenario, it is similar to the standard chatroom scenario, but this scenario uses a higher audio bit rate than the standard chatroom scenario by default. It is suitable for multi-person pure voice call scenarios with high requirements on sound quality. Note: On the ExpressVideo SDK, the camera is not enabled by default in this scenario. */
  HighQualityChatroom = 7,
  /** Available since: 3.0.0. Description: Live broadcast scenario, it is suitable for one-to-many live broadcast scenarios such as shows, games, e-commerce, and large educational classes. The audio and video quality, fluency, and compatibility have been optimized. Note: Even in live broadcast scenarios, the SDK has no business "roles" (such as anchors and viewers), and all users in the room can publish and play streams. */
  Broadcast = 8,
  /** Available since: 3.0.0. Description: Karaoke (KTV) scenario, it is suitable for real-time chorus and online karaoke scenarios, and has optimized delay, sound quality, ear return, echo cancellation, etc., and also ensures accurate alignment and ultra-low delay when multiple people chorus. */
  Karaoke = 9,
}

/** SDK feature type. */
export enum ZegoFeatureType {
  /** Basic audio feature. */
  Audio = 0,
  /** Basic video feature. */
  Video = 1,
  /** Media player feature. */
  MediaPlayer = 2,
  /** Local media data recorder feature. */
  MediaDataRecorder = 3,
  /** Media data publisher feature. */
  MediaDataPublisher = 4,
  /** Supplemental Enhancement Information (media side info) feature. */
  SEI = 5,
  /** SDK video capture feature. */
  SdkVideoCapture = 6,
  /** Custom video capture feature. */
  CustomVideoCapture = 7,
  /** SDK video rendering feature. */
  SdkVideoRender = 8,
  /** Custom video rendering feature. */
  CustomVideoRender = 9,
  /** SDK video processing feature (including low-light enhancement feature). */
  SdkVideoProcessing = 10,
  /** Custom video processing feature. */
  CustomVideoProcessing = 11,
  /** Streaming encryption / decryption feature. */
  StreamEncryption = 12,
  /** RTMP streaming feature. */
  Rtmp = 13,
  /** RTMPS streaming feature. */
  Rtmps = 14,
  /** RTMP over QUIC streaming feature. */
  RtmpOverQuic = 15,
  /** RTMP streaming feature. */
  HttpFlv = 16,
  /** HTTPS-FLV streaming feature. */
  HttpsFlv = 17,
  /** HTTP-FLV over QUIC streaming feature. */
  HttpFlvOverQuic = 18,
  /** Super resolution imaging feature. */
  SuperResolution = 19,
  /** Effects beauty feature. */
  EffectsBeauty = 20,
  /** Whiteboard beauty feature. */
  Whiteboard = 21,
  /** Range audio feature. */
  RangeAudio = 22,
  /** Copy righted music feature. */
  CopyRightedMusic = 23,
}

/** Room mode. */
export enum ZegoRoomMode {
  /** Single room mode. */
  SingleRoom = 0,
  /** Multiple room mode. */
  MultiRoom = 1,
}

/** engine state. */
export enum ZegoEngineState {
  /** The engine has started */
  Start = 0,
  /** The engine has stoped */
  Stop = 1,
}

/** Room state. */
export enum ZegoRoomState {
  /** Unconnected state, enter this state before logging in and after exiting the room. If there is a steady state abnormality in the process of logging in to the room, such as AppID or Token are incorrect, or if the same user name is logged in elsewhere and the local end is KickOut, it will enter this state. */
  Disconnected = 0,
  /** The state that the connection is being requested. It will enter this state after successful execution login room function. The display of the UI is usually performed using this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting connection status. */
  Connecting = 1,
  /** The status that is successfully connected. Entering this status indicates that the login to the room has been successful. The user can receive the callback notification of the user and the stream information in the room. */
  Connected = 2,
}

/** Room state change reason. */
export enum ZegoRoomStateChangedReason {
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

/** Publish channel. */
export enum ZegoPublishChannel {
  /** The main (default/first) publish channel. */
  Main = 0,
  /** The auxiliary (second) publish channel */
  Aux = 1,
  /** The third publish channel */
  Third = 2,
  /** The fourth publish channel */
  Fourth = 3,
}

/** Publish CensorshipMode. */
export enum ZegoStreamCensorshipMode {
  /** no censorship. */
  None = 0,
  /** only censorship stream audio. */
  Audio = 1,
  /** only censorship stream video. */
  Video = 2,
  /** censorship stream audio and video. */
  AudioAndVideo = 3,
}

/** Video rendering fill mode. */
export enum ZegoViewMode {
  /** The proportional scaling up, there may be black borders */
  AspectFit = 0,
  /** The proportional zoom fills the entire View and may be partially cut */
  AspectFill = 1,
  /** Fill the entire view, the image may be stretched */
  ScaleToFill = 2,
}

/** Mirror mode for previewing or playing the of the stream. */
export enum ZegoVideoMirrorMode {
  /** The mirror image only for previewing locally. This mode is used by default. When the mobile terminal uses a rear camera, this mode is still used by default, but it does not work. Local preview does not set mirroring. */
  OnlyPreviewMirror = 0,
  /** Both the video previewed locally and the far end playing the stream will see mirror image. */
  BothMirror = 1,
  /** Both the video previewed locally and the far end playing the stream will not see mirror image. */
  NoMirror = 2,
  /** The mirror image only for far end playing the stream. */
  OnlyPublishMirror = 3,
}

/** Video codec ID. */
export enum ZegoVideoCodecID {
  /** Default (H.264) */
  Default = 0,
  /** Scalable Video Coding (H.264 SVC) */
  SVC = 1,
  /** VP8 */
  VP8 = 2,
  /** H.265 */
  H265 = 3,
  /** Unknown Video Coding */
  Unknown = 100,
}

/**
 * Log config.
 *
 * Description: This parameter is required when calling [setlogconfig] to customize log configuration.
 * Use cases: This configuration is required when you need to customize the log storage path or the maximum log file size.
 * Caution: None.
 */
export class ZegoLogConfig {
  /** The storage path of the log file. Description: Used to customize the storage path of the log file. Use cases: This configuration is required when you need to customize the log storage path. Required: False. Default value: The default path of each platform is different, please refer to the official website document https://docs.zegocloud.com/faq/express_sdkLog. Caution: Developers need to ensure read and write permissions for files under this path. */
  logPath: string

  /** Maximum log file size(Bytes). Description: Used to customize the maximum log file size. Use cases: This configuration is required when you need to customize the upper limit of the log file size. Required: False. Default value: 5MB (5 * 1024 * 1024 Bytes). Value range: Minimum 1MB (1 * 1024 * 1024 Bytes), maximum 100M (100 * 1024 * 1024 Bytes), 0 means no need to write logs. Caution: The larger the upper limit of the log file size, the more log information it carries, but the log upload time will be longer. */
  logSize: number

  constructor() {
    this.logPath = ''
    this.logSize = 5 * 1024 * 1024
  }
}

/**
 * Profile for create engine
 *
 * Profile for create engine
 */
export class ZegoEngineProfile {
  /** Application ID issued by ZEGO for developers, please apply from the ZEGO Admin Console https://console.zegocloud.com The value ranges from 0 to 4294967295. */
  appID: number

  /** Application signature for each AppID, please apply from the ZEGO Admin Console. Application signature is a 64 character string. Each character has a range of '0' ~ '9', 'a' ~ 'z'. AppSign 2.17.0 and later allows null or no transmission. If the token is passed empty or not passed, the token must be entered in the [ZegoRoomConfig] parameter for authentication when the [loginRoom] interface is called to login to the room. */
  appSign?: string

  /** The room scenario. the SDK will optimize the audio and video configuration for the specified scenario to achieve the best effect in this scenario. After specifying the scenario, you can call other APIs to adjusting the audio and video configuration. Differences between scenarios and how to choose a suitable scenario, please refer to https://docs.zegocloud.com/article/14940 */
  scenario: ZegoScenario
}

/**
 * Advanced room configuration.
 *
 * Configure maximum number of users in the room and authentication token, etc.
 */
export class ZegoRoomConfig {
  /** The maximum number of users in the room, Passing 0 means unlimited, the default is unlimited. */
  maxMemberCount: number

  /** Whether to enable the user in and out of the room callback notification [onRoomUserUpdate], the default is off. If developers need to use ZEGO Room user notifications, make sure that each user who login sets this flag to true */
  isUserStatusNotify: boolean

  /** The token issued by the developer's business server is used to ensure security. For the generation rules, please refer to [Using Token Authentication](https://doc-zh.zego.im/article/10360), the default is an empty string, that is, no authentication. In versions 2.17.0 and above, if appSign is not passed in when calling the [createEngine] API to create an engine, or if appSign is empty, this parameter must be set for authentication when logging in to a room. */
  token: string
}

/**
 * Video config.
 *
 * Configure parameters used for publishing stream, such as bitrate, frame rate, and resolution.
 * Developers should note that the width and height resolution of the mobile and desktop are opposite. For example, 360p, the resolution of the mobile is 360x640, and the desktop is 640x360.
 * When using external capture, the capture and encoding resolution of RTC cannot be set to 0*0, otherwise, there will be no video data in the publishing stream in the entire engine life cycle.
 */
export class ZegoVideoConfig {
  /** Capture resolution width, control the width of camera image acquisition. SDK requires this member to be set to an even number. Only the camera is not started and the custom video capture is not used, the setting is effective. For performance reasons, the SDK scales the video frame to the encoding resolution after capturing from camera and before rendering to the preview view. Therefore, the resolution of the preview image is the encoding resolution. If you need the resolution of the preview image to be this value, Please call [setCapturePipelineScaleMode] first to change the capture pipeline scale mode to [Post] */
  captureWidth: number

  /** Capture resolution height, control the height of camera image acquisition. SDK requires this member to be set to an even number. Only the camera is not started and the custom video capture is not used, the setting is effective. For performance reasons, the SDK scales the video frame to the encoding resolution after capturing from camera and before rendering to the preview view. Therefore, the resolution of the preview image is the encoding resolution. If you need the resolution of the preview image to be this value, Please call [setCapturePipelineScaleMode] first to change the capture pipeline scale mode to [Post] */
  captureHeight: number

  /** Encode resolution width, control the image width of the encoder when publishing stream. SDK requires this member to be set to an even number. The settings before and after publishing stream can be effective */
  encodeWidth: number

  /** Encode resolution height, control the image height of the encoder when publishing stream. SDK requires this member to be set to an even number. The settings before and after publishing stream can be effective */
  encodeHeight: number

  /** Frame rate, control the frame rate of the camera and the frame rate of the encoder. Only the camera is not started, the setting is effective. Publishing stream set to 60 fps, playing stream to take effect need contact technical support */
  fps: number

  /** Bit rate in kbps. The settings before and after publishing stream can be effective */
  bitrate: number

  /** The codec id to be used, the default value is [default]. Settings only take effect before publishing stream */
  codecID: ZegoVideoCodecID

  /** Video keyframe interval, in seconds. Required: No. Default value: 2 seconds. Value range: [2, 5]. Caution: The setting is only valid before pushing. */
  keyFrameInterval: number
}

/**
 * User object.
 *
 * Configure user ID and username to identify users in the room.
 * Note that the userID must be unique under the same appID, otherwise, there will be mutual kicks when logging in to the room.
 * It is strongly recommended that userID corresponds to the user ID of the business APP, that is, a userID and a real user are fixed and unique, and should not be passed to the SDK in a random userID. Because the unique and fixed userID allows ZEGO technicians to quickly locate online problems.
 */
export class ZegoUser {
  /** User ID, a utf8 string with a maximum length of 64 bytes or less.Privacy reminder: Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc.Caution: Only support numbers, English characters and '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'.Do not use '%' if you need to communicate with the Web SDK. */
  userID: string

  /** User Name, a utf8 string with a maximum length of 256 bytes or less.Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc. */
  userName: string
}

/**
 * Stream object.
 *
 * Identify an stream object
 */
export class ZegoStream {
  /** User object instance.Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc. */
  user: ZegoUser

  /** Stream ID, a string of up to 256 characters. Caution: You cannot include URL keywords, otherwise publishing stream and playing stream will fails. Only support numbers, English characters and '-', ' '. */
  streamID: string

  /** Stream extra info */
  extraInfo: string
}

/**
 * Callback for asynchronous destruction completion.
 *
 * In general, developers do not need to listen to this callback.
 */
export type ZegoDestroyCompletionCallback = () => void

/**
 * Callback for setting room extra information.
 *
 * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
 */
export type ZegoRoomSetRoomExtraInfoCallback = (errorCode: number) => void

/**
 * Login room result callback.
 *
 * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
 * @param extendedData Extended Information
 */
export type ZegoRoomLoginCallback = (errorCode: number, extendedData: string) => void

/**
 * Logout room result callback.
 *
 * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
 * @param extendedData Extended Information
 */
export type ZegoRoomLogoutCallback = (errorCode: number, extendedData: string) => void

/**
 * Log upload result callback.
 *
 * Description: After calling [uploadLog] to upload the log, get the upload result through this callback.
 * Use cases: When uploading logs, in order to determine whether the logs are uploaded successfully, you can get them through this callback.
 * Caution: In the case of poor network, the return time of this callback may be longer.
 *
 * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
 */
export type ZegoUploadLogResultCallback = (errorCode: number) => void

/**
 * Callback for setting stream extra information.
 *
 * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
 */
export type ZegoPublisherSetStreamExtraInfoCallback = (errorCode: number) => void

/**
 * Callback for add/remove CDN URL.
 *
 * @param errorCode Error code, please refer to the error codes document https://docs.zegocloud.com/en/5548.html for details.
 */
export type ZegoPublisherUpdateCdnUrlCallback = (errorCode: number) => void
