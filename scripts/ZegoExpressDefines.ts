import { Sprite } from 'cc'

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

/** SEI type */
export enum ZegoSEIType {
  /** Using H.264 SEI (nalu type = 6, payload type = 243) type packaging, this type is not specified by the SEI standard, there is no conflict with the video encoder or the SEI in the video file, users do not need to follow the SEI content Do filtering, SDK uses this type by default. */
  ZegoDefined = 0,
  /** SEI (nalu type = 6, payload type = 5) of H.264 is used for packaging. The H.264 standard has a prescribed format for this type: startcode + nalu type (6) + payload type (5) + len + payload (uuid + content) + trailing bits. Because the video encoder itself generates an SEI with a payload type of 5, or when a video file is used for streaming, such SEI may also exist in the video file, so when using this type, the user needs to use uuid + context as a buffer sending SEI. At this time, in order to distinguish the SEI generated by the video encoder itself, when the App sends this type of SEI, it can fill in the service-specific uuid (uuid length is 16 bytes). When the receiver uses the SDK to parse the SEI of the payload type 5, it will set filter string filters out the SEI matching the uuid and throws it to the business. If the filter string is not set, the SDK will throw all received SEI to the developer. uuid filter string setting function, [ZegoEngineConfig.advancedConfig("unregister_sei_filter","XXXXXX")], where unregister_sei_filter is the key, and XXXXX is the uuid filter string to be set. */
  UserUnregister = 1,
}

/** Publish stream status. */
export enum ZegoPublisherState {
  /** The state is not published, and it is in this state before publishing the stream. If a steady-state exception occurs in the publish process, such as AppID or Token are incorrect, or if other users are already publishing the stream, there will be a failure and enter this state. */
  NoPublish = 0,
  /** The state that it is requesting to publish the stream after the [startPublishingStream] function is successfully called. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state. */
  PublishRequesting = 1,
  /** The state that the stream is being published, entering the state indicates that the stream has been successfully published, and the user can communicate normally. */
  Publishing = 2,
}

/** Voice changer preset value. */
export enum ZegoVoiceChangerPreset {
  /** No Voice changer */
  None = 0,
  /** Male to child voice (loli voice effect) */
  MenToChild = 1,
  /** Male to female voice (kindergarten voice effect) */
  MenToWomen = 2,
  /** Female to child voice */
  WomenToChild = 3,
  /** Female to male voice */
  WomenToMen = 4,
  /** Foreigner voice effect */
  Foreigner = 5,
  /** Autobot Optimus Prime voice effect */
  OptimusPrime = 6,
  /** Android robot voice effect */
  Android = 7,
  /** Ethereal voice effect */
  Ethereal = 8,
  /** Magnetic(Male) voice effect */
  MaleMagnetic = 9,
  /** Fresh(Female) voice effect */
  FemaleFresh = 10,
  /** Electronic effects in C major voice effect */
  MajorC = 11,
  /** Electronic effects in A minor voice effect */
  MinorA = 12,
  /** Electronic effects in harmonic minor voice effect */
  HarmonicMinor = 13,
  /** Female Vitality Sound effect */
  FemaleEnergetic = 14,
  /** Richness effect */
  RichNess = 15,
  /** Muffled effect */
  Muffled = 16,
  /** Roundness effect */
  Roundness = 17,
  /** Falsetto effect */
  Falsetto = 18,
  /** Fullness effect */
  Fullness = 19,
  /** Clear effect */
  Clear = 20,
  /** Hight effect */
  HighlyResonant = 21,
  /** Loud clear effect */
  LoudClear = 22,
  /** Minions effect */
  Minions = 23,
}

/** Reverberation preset value. */
export enum ZegoReverbPreset {
  /** No Reverberation */
  None = 0,
  /** Soft room reverb effect */
  SoftRoom = 1,
  /** Large room reverb effect */
  LargeRoom = 2,
  /** Concert hall reverb effect */
  ConcertHall = 3,
  /** Valley reverb effect */
  Valley = 4,
  /** Recording studio reverb effect */
  RecordingStudio = 5,
  /** Basement reverb effect */
  Basement = 6,
  /** KTV reverb effect */
  KTV = 7,
  /** Popular reverb effect */
  Popular = 8,
  /** Rock reverb effect */
  Rock = 9,
  /** Vocal concert reverb effect */
  VocalConcert = 10,
  /** Gramophone reverb effect */
  GramoPhone = 11,
}

/** Mode of Electronic Effects. */
export enum ZegoElectronicEffectsMode {
  /** Major */
  Major = 0,
  /** Minor */
  Minor = 1,
  /** Harmonic Minor */
  HarmonicMinor = 2,
}

/** Video configuration resolution and bitrate preset enumeration. The preset resolutions are adapted for mobile and desktop. On mobile, height is longer than width, and desktop is the opposite. For example, 1080p is actually 1080(w) x 1920(h) on mobile and 1920(w) x 1080(h) on desktop. */
export enum ZegoVideoConfigPreset {
  /** Set the resolution to 320x180, the default is 15 fps, the code rate is 300 kbps */
  Preset180P = 0,
  /** Set the resolution to 480x270, the default is 15 fps, the code rate is 400 kbps */
  Preset270P = 1,
  /** Set the resolution to 640x360, the default is 15 fps, the code rate is 600 kbps */
  Preset360P = 2,
  /** Set the resolution to 960x540, the default is 15 fps, the code rate is 1200 kbps */
  Preset540P = 3,
  /** Set the resolution to 1280x720, the default is 15 fps, the code rate is 1500 kbps */
  Preset720P = 4,
  /** Set the resolution to 1920x1080, the default is 15 fps, the code rate is 3000 kbps */
  Preset1080P = 5,
}

/** Stream quality level. */
export enum ZegoStreamQualityLevel {
  /** Excellent */
  Excellent = 0,
  /** Good */
  Good = 1,
  /** Normal */
  Medium = 2,
  /** Bad */
  Bad = 3,
  /** Failed */
  Die = 4,
  /** Unknown */
  Unknown = 5,
}

/** Audio channel type. */
export enum ZegoAudioChannel {
  /** Unknown */
  Unknown = 0,
  /** Mono */
  Mono = 1,
  /** Stereo */
  Stereo = 2,
}

/** Audio capture stereo mode. */
export enum ZegoAudioCaptureStereoMode {
  /** Disable stereo capture, that is, mono. */
  None = 0,
  /** Always enable stereo capture. */
  Always = 1,
  /** [Deprecated] Same as [Always], that is, always enable stereo capture, this mode has been deprecated since version 2.16.0. */
  Adaptive = 2,
}

/** Audio codec ID. */
export enum ZegoAudioCodecID {
  /** Default, determined by the [scenario] when calling [createEngine]. */
  Default = 0,
  /** Can be used for RTC and CDN streaming; bitrate range from 10kbps to 128kbps; supports stereo; latency is around 500ms. Server cloud transcoding is required when communicating with the Web SDK, and it is not required when relaying to CDN. */
  Normal = 1,
  /** Can be used for RTC and CDN streaming; good compatibility; bitrate range from 16kbps to 192kbps; supports stereo; latency is around 350ms; the sound quality is worse than [Normal] in the same (low) bitrate. Server cloud transcoding is required when communicating with the Web SDK, and it is not required when relaying to CDN. */
  Normal2 = 2,
  /** Not recommended; if you need to use it, please contact ZEGO technical support. Can only be used for RTC streaming. */
  Normal3 = 3,
  /** Not recommended; if you need to use it, please contact ZEGO technical support. Can only be used for RTC streaming. */
  Low = 4,
  /** Not recommended; if you need to use it, please contact ZEGO technical support. Can only be used for RTC streaming; maximum bitrate is 16kbps. */
  Low2 = 5,
  /** Can only be used for RTC streaming; bitrate range from 6kbps to 192kbps; supports stereo; latency is around 200ms; Under the same bitrate (low bitrate), the sound quality is significantly better than [Normal] and [Normal2]; low CPU overhead. Server cloud transcoding is not required when communicating with the Web SDK, and it is required when relaying to CDN. */
  Low3 = 6,
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

/** Video screen rotation direction. */
export enum ZegoOrientation {
  /** Not rotate */
  Orientation0 = 0,
  /** Rotate 90 degrees counterclockwise */
  Orientation90 = 1,
  /** Rotate 180 degrees counterclockwise */
  Orientation180 = 2,
  /** Rotate 270 degrees counterclockwise */
  Orientation270 = 3,
}

/** Player video layer. */
export enum ZegoPlayerVideoLayer {
  /** The layer to be played depends on the network status */
  Auto = 0,
  /** Play the base layer (small resolution) */
  Base = 1,
  /** Play the extend layer (big resolution) */
  BaseExtend = 2,
}

/** Video stream type */
export enum ZegoVideoStreamType {
  /** The type to be played depends on the network status */
  Default = 0,
  /** small resolution type */
  Small = 1,
  /** big resolution type */
  Big = 2,
}

/** Audio echo cancellation mode. */
export enum ZegoAECMode {
  /** Aggressive echo cancellation may affect the sound quality slightly, but the echo will be very clean. */
  Aggressive = 0,
  /** Moderate echo cancellation, which may slightly affect a little bit of sound, but the residual echo will be less. */
  Medium = 1,
  /** Comfortable echo cancellation, that is, echo cancellation does not affect the sound quality of the sound, and sometimes there may be a little echo, but it will not affect the normal listening. */
  Soft = 2,
}

/** Active Noise Suppression mode. */
export enum ZegoANSMode {
  /** Soft ANS. In most instances, the sound quality will not be damaged, but some noise will remain. */
  Soft = 0,
  /** Medium ANS. It may damage some sound quality, but it has a good noise reduction effect. */
  Medium = 1,
  /** Aggressive ANS. It may significantly impair the sound quality, but it has a good noise reduction effect. */
  Aggressive = 2,
  /** AI mode ANS. It will cause great damage to music, so it can not be used for noise suppression of sound sources that need to collect background sound. Please contact ZEGO technical support before use. */
  AI = 3,
}

/** Traffic control property (bitmask enumeration). */
export enum ZegoTrafficControlProperty {
  /** Basic (Adaptive (reduce) video bitrate) */
  Basic = 0,
  /** Adaptive (reduce) video FPS */
  AdaptiveFPS = 1,
  /** Adaptive (reduce) video resolution */
  AdaptiveResolution = 1 << 1,
  /** Adaptive (reduce) audio bitrate */
  AdaptiveAudioBitrate = 1 << 2,
}

/** Video transmission mode when current bitrate is lower than the set minimum bitrate. */
export enum ZegoTrafficControlMinVideoBitrateMode {
  /** Stop video transmission when current bitrate is lower than the set minimum bitrate */
  NoVideo = 0,
  /** Video is sent at a very low frequency (no more than 2fps) which is lower than the set minimum bitrate */
  UltraLowFPS = 1,
}

/** Playing stream status. */
export enum ZegoPlayerState {
  /** The state of the flow is not played, and it is in this state before the stream is played. If the steady flow anomaly occurs during the playing process, such as AppID or Token are incorrect, it will enter this state. */
  NoPlay = 0,
  /** The state that the stream is being requested for playing. After the [startPlayingStream] function is successfully called, it will enter the state. The UI is usually displayed through this state. If the connection is interrupted due to poor network quality, the SDK will perform an internal retry and will return to the requesting state. */
  PlayRequesting = 1,
  /** The state that the stream is being playing, entering the state indicates that the stream has been successfully played, and the user can communicate normally. */
  Playing = 2,
}

/** Media event when playing. */
export enum ZegoPlayerMediaEvent {
  /** Audio stuck event when playing */
  AudioBreakOccur = 0,
  /** Audio stuck event recovery when playing */
  AudioBreakResume = 1,
  /** Video stuck event when playing */
  VideoBreakOccur = 2,
  /** Video stuck event recovery when playing */
  VideoBreakResume = 3,
}

/** Resource Type. */
export enum ZegoResourceType {
  /** CDN */
  CDN = 0,
  /** RTC */
  RTC = 1,
  /** L3 */
  L3 = 2,
}

/** Stream Resource Mode */
export enum ZegoStreamResourceMode {
  /** Default mode. The SDK will automatically select the streaming resource according to the cdnConfig parameters set by the player config and the ready-made background configuration. */
  Default = 0,
  /** Playing stream only from CDN. */
  OnlyCDN = 1,
  /** Playing stream only from L3. */
  OnlyL3 = 2,
  /** Playing stream only from RTC. */
  OnlyRTC = 3,
  /** CDN Plus mode. The SDK will automatically select the streaming resource according to the network condition. */
  CDNPlus = 4,
}

/** Update type. */
export enum ZegoUpdateType {
  /** Add */
  Add = 0,
  /** Delete */
  Delete = 1,
}

/** State of CDN relay. */
export enum ZegoStreamRelayCDNState {
  /** The state indicates that there is no CDN relay */
  NoRelay = 0,
  /** The CDN relay is being requested */
  RelayRequesting = 1,
  /** Entering this status indicates that the CDN relay has been successful */
  Relaying = 2,
}

/** Reason for state of CDN relay changed. */
export enum ZegoStreamRelayCDNUpdateReason {
  /** No error */
  None = 0,
  /** Server error */
  ServerError = 1,
  /** Handshake error */
  HandshakeFailed = 2,
  /** Access point error */
  AccessPointError = 3,
  /** Stream create failure */
  CreateStreamFailed = 4,
  /** Bad stream ID */
  BadName = 5,
  /** CDN server actively disconnected */
  CDNServerDisconnected = 6,
  /** Active disconnect */
  Disconnected = 7,
  /** All mixer input streams sessions closed */
  MixStreamAllInputStreamClosed = 8,
  /** All mixer input streams have no data */
  MixStreamAllInputStreamNoData = 9,
  /** Internal error of stream mixer server */
  MixStreamServerInternalError = 10,
}

/** Device type. */
export enum ZegoDeviceType {
  /** Unknown device type. */
  Unknown = 0,
  /** Camera device. */
  Camera = 1,
  /** Microphone device. */
  Microphone = 2,
  /** Speaker device. */
  Speaker = 3,
  /** Audio device. (Other audio device that cannot be accurately classified into microphones or speakers.) */
  AudioDevice = 4,
}

/** The exception type for the device. */
export enum ZegoDeviceExceptionType {
  /** Unknown device exception. */
  Unknown = 0,
  /** Generic device exception. */
  Generic = 1,
  /** Invalid device ID exception. */
  InvalidId = 2,
  /** Device permission is not granted. */
  PermissionNotGranted = 3,
  /** The capture frame rate of the device is 0. */
  ZeroCaptureFps = 4,
  /** The device is being occupied. */
  DeviceOccupied = 5,
  /** The device is unplugged (not plugged in). */
  DeviceUnplugged = 6,
  /** The device requires the system to restart before it can work (Windows platform only). */
  RebootRequired = 7,
  /** The system media service is unavailable, e.g. when the iOS system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services (Apple platform only). */
  MediaServicesWereLost = 8,
  /** The device is being occupied by Siri (Apple platform only). */
  SiriIsRecording = 9,
  /** The device captured sound level is too low (Windows platform only). */
  SoundLevelTooLow = 10,
  /** The device is being occupied, and maybe cause by iPad magnetic case (Apple platform only). */
  MagneticCase = 11,
}

/** Remote device status. */
export enum ZegoRemoteDeviceState {
  /** Device on */
  Open = 0,
  /** General device error */
  GenericError = 1,
  /** Invalid device ID */
  InvalidID = 2,
  /** No permission */
  NoAuthorization = 3,
  /** Captured frame rate is 0 */
  ZeroFPS = 4,
  /** The device is occupied */
  InUseByOther = 5,
  /** The device is not plugged in or unplugged */
  Unplugged = 6,
  /** The system needs to be restarted */
  RebootRequired = 7,
  /** System media services stop, such as under the iOS platform, when the system detects that the current pressure is huge (such as playing a lot of animation), it is possible to disable all media related services. */
  SystemMediaServicesLost = 8,
  /** The remote user calls [enableCamera] or [muteMicrophone] to disable the camera or microphone. */
  Disable = 9,
  /** The remote user actively calls [mutePublishStreamAudio] or [mutePublishStreamVideo] to stop publish the audio or video stream. */
  Mute = 10,
  /** The device is interrupted, such as a phone call interruption, etc. */
  Interruption = 11,
  /** There are multiple apps at the same time in the foreground, such as the iPad app split screen, the system will prohibit all apps from using the camera. */
  InBackground = 12,
  /** CDN server actively disconnected */
  MultiForegroundApp = 13,
  /** The system is under high load pressure and may cause abnormal equipment. */
  BySystemPressure = 14,
  /** The remote device is not supported to publish the device state. */
  NotSupport = 15,
}

/** Audio device type. */
export enum ZegoAudioDeviceType {
  /** Audio input type */
  Input = 0,
  /** Audio output type */
  Output = 1,
}

/** Audio device mode. */
export enum ZegoAudioDeviceMode {
  /** Enable system echo cancellation. */
  Communication = 1,
  /** The system echo cancellation function is disabled. */
  General = 2,
  /** Automatically select whether to enable system echo cancellation based on the scenario. */
  Auto = 3,
  /** Enable system echo cancellation. Compared with Communication, this mode always occupies the microphone device. */
  Communication2 = 4,
  /** Enable system echo cancellation. Compared with Communication, in this mode, the microphone is released and the media volume is reduced. */
  Communication3 = 5,
  /** Disable system echo cancellation. Compared with General, this mode is not released when a microphone device is used. */
  General2 = 6,
  /** Disable system echo cancellation. Compared with General, this mode will always occupy the microphone device. */
  General3 = 7,
  /** Enable system echo cancellation. Compared with Communication, this mode of wheat after releasing the microphone, maintain the call volume. */
  Communication4 = 8,
}

/** Audio route */
export enum ZegoAudioRoute {
  /** Speaker */
  Speaker = 0,
  /** Headphone */
  Headphone = 1,
  /** Bluetooth device */
  Bluetooth = 2,
  /** Receiver */
  Receiver = 3,
  /** External USB audio device */
  ExternalUSB = 4,
  /** Apple AirPlay */
  AirPlay = 5,
}

/** Capture pipeline scale mode. */
export enum ZegoCapturePipelineScaleMode {
  /** Zoom immediately after acquisition, default */
  Pre = 0,
  /** Scaling while encoding */
  Post = 1,
}

/** Video frame format. */
export enum ZegoVideoFrameFormat {
  /** Unknown format, will take platform default */
  Unknown = 0,
  /** I420 (YUV420Planar) format */
  I420 = 1,
  /** NV12 (YUV420SemiPlanar) format */
  NV12 = 2,
  /** NV21 (YUV420SemiPlanar) format */
  NV21 = 3,
  /** BGRA32 format */
  BGRA32 = 4,
  /** RGBA32 format */
  RGBA32 = 5,
  /** ARGB32 format */
  ARGB32 = 6,
  /** ABGR32 format */
  ABGR32 = 7,
  /** I422 (YUV422Planar) format */
  I422 = 8,
}

/** Video frame buffer type. */
export enum ZegoVideoBufferType {
  /** Raw data type video frame */
  Unknown = 0,
  /** Raw data type video frame */
  RawData = 1,
  /** Encoded data type video frame */
  EncodedData = 2,
  /** Texture 2D type video frame */
  GLTexture2D = 3,
  /** CVPixelBuffer type video frame */
  CVPixelBuffer = 4,
  /** Surface Texture type video frame */
  SurfaceTexture = 5,
  /** GL_TEXTURE_EXTERNAL_OES type video frame */
  GLTextureExternalOES = 6,
}

/** Video frame format series. */
export enum ZegoVideoFrameFormatSeries {
  /** RGB series */
  RGB = 0,
  /** YUV series */
  YUV = 1,
}

/** Video frame flip mode. */
export enum ZegoVideoFlipMode {
  /** No flip */
  None = 0,
  /** X-axis flip */
  X = 1,
  /** Y-axis flip */
  Y = 2,
  /** X-Y-axis flip */
  XY = 3,
}

/** Player state. */
export enum ZegoMediaPlayerState {
  /** Not playing */
  NoPlay = 0,
  /** Playing */
  Playing = 1,
  /** Pausing */
  Pausing = 2,
  /** End of play */
  PlayEnded = 3,
}

/** Player network event. */
export enum ZegoMediaPlayerNetworkEvent {
  /** Network resources are not playing well, and start trying to cache data */
  BufferBegin = 0,
  /** Network resources can be played smoothly */
  BufferEnded = 1,
}

/** Audio channel. */
export enum ZegoMediaPlayerAudioChannel {
  /** Audio channel left */
  Left = 0,
  /** Audio channel right */
  Right = 1,
  /** Audio channel all */
  All = 2,
}

/** AudioEffectPlayer state. */
export enum ZegoAudioEffectPlayState {
  /** Not playing */
  NoPlay = 0,
  /** Playing */
  Playing = 1,
  /** Pausing */
  Pausing = 2,
  /** End of play */
  PlayEnded = 3,
}

/** volume type. */
export enum ZegoVolumeType {
  /** volume local */
  Local = 0,
  /** volume remote */
  Remote = 1,
}

/** audio sample rate. */
export enum ZegoAudioSampleRate {
  /** Unknown */
  Unknown = 0,
  /** 8K */
  SampleRate8K = 8000,
  /** 16K */
  SampleRate16K = 16000,
  /** 22.05K */
  SampleRate22K = 22050,
  /** 24K */
  SampleRate24K = 24000,
  /** 32K */
  SampleRate32K = 32000,
  /** 44.1K */
  SampleRate44K = 44100,
  /** 48K */
  SampleRate48K = 48000,
}

/** Audio capture source type. */
export enum ZegoAudioSourceType {
  /** Default audio capture source (the main channel uses custom audio capture by default; the aux channel uses the same sound as main channel by default) */
  Default = 0,
  /** Use custom audio capture, refer to [enableCustomAudioIO] */
  Custom = 1,
  /** Use media player as audio source, only support aux channel */
  MediaPlayer = 2,
}

/** Record type. */
export enum ZegoDataRecordType {
  /** This field indicates that the Express-Audio SDK records audio by default, and the Express-Video SDK records audio and video by default. When recording files in .aac format, audio is also recorded by default. */
  Default = 0,
  /** only record audio */
  OnlyAudio = 1,
  /** only record video, Audio SDK and recording .aac format files are invalid. */
  OnlyVideo = 2,
  /** record audio and video. Express-Audio SDK and .aac format files are recorded only audio. */
  AudioAndVideo = 3,
}

/** Record state. */
export enum ZegoDataRecordState {
  /** Unrecorded state, which is the state when a recording error occurs or before recording starts. */
  NoRecord = 0,
  /** Recording in progress, in this state after successfully call [startRecordingCapturedData] function */
  Recording = 1,
  /** Record successs */
  Success = 2,
}

/** Audio data callback function enable bitmask enumeration. */
export enum ZegoAudioDataCallbackBitMask {
  /** The mask bit of this field corresponds to the enable [onCapturedAudioData] callback function */
  Captured = 1 << 0,
  /** The mask bit of this field corresponds to the enable [onPlaybackAudioData] callback function */
  Playback = 1 << 1,
  /** The mask bit of this field corresponds to the enable [onMixedAudioData] callback function */
  Mixed = 1 << 2,
  /** The mask bit of this field corresponds to the enable [onPlayerAudioData] callback function */
  Player = 1 << 3,
}

/** Network mode */
export enum ZegoNetworkMode {
  /** Offline (No network) */
  Offline = 0,
  /** Unknown network mode */
  Unknown = 1,
  /** Wired Ethernet (LAN) */
  Ethernet = 2,
  /** Wi-Fi (WLAN) */
  WiFi = 3,
  /** 2G Network (GPRS/EDGE/CDMA1x/etc.) */
  Mode2G = 4,
  /** 3G Network (WCDMA/HSDPA/EVDO/etc.) */
  Mode3G = 5,
  /** 4G Network (LTE) */
  Mode4G = 6,
  /** 5G Network (NR (NSA/SA)) */
  Mode5G = 7,
}

/** network speed test type */
export enum ZegoNetworkSpeedTestType {
  /** uplink */
  Uplink = 0,
  /** downlink */
  Downlink = 1,
}

/** Camera focus mode. */
export enum ZegoCameraFocusMode {
  /** Auto focus. */
  AutoFocus = 0,
  /** Continuous auto focus. */
  ContinuousAutoFocus = 1,
}

/** Camera exposure mode. */
export enum ZegoCameraExposureMode {
  /** Auto exposure. */
  AutoExposure = 0,
  /** Continuous auto exposure. */
  ContinuousAutoExposure = 1,
}

/** voice activity detection type */
export enum ZegoAudioVADType {
  /** noise */
  Noise = 0,
  /** speech */
  Speech = 1,
}

/** stable voice activity detection type */
export enum ZegoAudioVADStableStateMonitorType {
  /** captured */
  Captured = 0,
  /** custom processed */
  CustomProcessed = 1,
}

/** Orientation mode of the video. */
export enum ZegoOrientationMode {
  /** Custom mode.Description: The default is the custom mode. In this mode, the user needs to set the orientation through [SetAppOrientation], and set the video resolution through [SetVideoConfig] to control the video ratio. The SDK rotates the video at the stream publishing end. */
  Custom = 0,
  /** Player self adaption mode.Description: The video orientation of the stream playing end is automatically vertically upward, and the user of the stream publishing end no longer needs to set the orientation through [SetAppOrientation], and no longer need to set the video resolution to control the video ratio through [SetVideoConfig]. Caution: 1. Both the stream publishing end and the stream playing end need to be set to [ZegoOrientationModeAdaption] mode. 2. Media players, cloud recording, local recording, and publish or play streaming scenarios via CDN are not supported.  3. In this mode, the SDK will automatically swap the width and height of the encoding resolution according to the actual orientation of the device. */
  Adaption = 1,
  /** Player adapt to pulisher mode.Description: Taking the Status Bar as a reference, the video direction of the stream playing end is the same as the preview video direction of the stream publishing end. The SDK will use the Status Bar as a reference to rotate the image on the stream playing end, and the rotation angle is the same as the rotation angle of the preview on the stream publishing end. Stream publishing end users no longer need to set the orientation through [SetAppOrientation], and no longer need to set the video resolution to control the video ratio through [SetVideoConfig]. Caution: 1. Media players, cloud recording, local recording, and publish or play streaming scenarios via CDN are not supported.2. In this mode, the SDK will automatically swap the width and height of the encoding resolution according to the actual position of the Status Bar. */
  Alignment = 2,
  /** Fixed resolution ratio mode.Description: Taking the Status Bar as a reference, the video orientation of the stream playing end is the same as the previewed video direction of the stream publishing end, and the video resolution is the same as the encoding resolution. Users of the streaming end no longer need to set the orientation through [SetAppOrientation]. */
  FixedResolutionRatio = 3,
}

/** Publish or play stream event */
export enum ZegoStreamEvent {
  /** Start publishing stream */
  PublishStart = 100,
  /** The first publish stream was successful */
  PublishSuccess = 101,
  /** Failed to publish stream for the first time */
  PublishFail = 102,
  /** Start retrying publishing stream */
  RetryPublishStart = 103,
  /** Retry publishing stream successfully */
  RetryPublishSuccess = 104,
  /** Failed to retry publishing stream */
  RetryPublishFail = 105,
  /** End of publishing stream */
  PublishEnd = 106,
  /** Start playing stream */
  PlayStart = 200,
  /** The first play stream was successful */
  PlaySuccess = 201,
  /** Failed to play stream for the first time */
  PlayFail = 202,
  /** Start retrying playing stream */
  RetryPlayStart = 203,
  /** Retry playing stream successfully */
  RetryPlaySuccess = 204,
  /** Failed to retry playing stream */
  RetryPlayFail = 205,
  /** End of playing stream */
  PlayEnd = 206,
}

/** Super resolution mode. */
export enum ZegoSuperResolutionState {
  /** Super resolution turned off. */
  Off = 0,
  /** Super resolution turned on. */
  On = 1,
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

  constructor() {
    this.scenario = ZegoScenario.Default
  }
}

/**
 * Advanced engine configuration.
 */
export class ZegoEngineConfig {
  /** Other special function switches, if not set, no special function will be used by default. Please contact ZEGO technical support before use. */
  advancedConfig?: Map<string, string>
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

  /**
   * Create video configuration with preset enumeration values
   */
  constructor(preset?: ZegoVideoConfigPreset) {
    preset = preset ?? ZegoVideoConfigPreset.Preset360P
    this.codecID = ZegoVideoCodecID.Default
    this.keyFrameInterval = 2
    switch (preset) {
      case ZegoVideoConfigPreset.Preset180P:
        this.captureWidth = 320
        this.captureHeight = 180
        this.encodeWidth = 320
        this.encodeHeight = 180
        this.fps = 15
        this.bitrate = 300
        break
      case ZegoVideoConfigPreset.Preset270P:
        this.captureWidth = 480
        this.captureHeight = 270
        this.encodeWidth = 480
        this.encodeHeight = 270
        this.fps = 15
        this.bitrate = 400
        break
      case ZegoVideoConfigPreset.Preset360P:
        this.captureWidth = 640
        this.captureHeight = 360
        this.encodeWidth = 640
        this.encodeHeight = 360
        this.fps = 15
        this.bitrate = 600
        break
      case ZegoVideoConfigPreset.Preset540P:
        this.captureWidth = 960
        this.captureHeight = 540
        this.encodeWidth = 960
        this.encodeHeight = 540
        this.fps = 15
        this.bitrate = 1200
        break
      case ZegoVideoConfigPreset.Preset720P:
        this.captureWidth = 1280
        this.captureHeight = 720
        this.encodeWidth = 1280
        this.encodeHeight = 720
        this.fps = 15
        this.bitrate = 1500
        break
      case ZegoVideoConfigPreset.Preset1080P:
        this.captureWidth = 1920
        this.captureHeight = 1080
        this.encodeWidth = 1920
        this.encodeHeight = 1080
        this.fps = 15
        this.bitrate = 3000
        break
    }
  }
}

/**
 * Voice changer parameter.
 *
 * Developer can use the built-in presets of the SDK to change the parameters of the voice changer.
 */
export class ZegoVoiceChangerParam {
  /** Pitch parameter, value range [-12.0, 12.0], the larger the value, the sharper the sound, set it to 0.0 to turn off. Note the tone-shifting sound effect is only effective for the sound played by the media player, and does not change the tone collected by the microphone. Note that on v2.18.0 and older version, the value range is [-8.0, 8.0]. */
  pitch: number

  constructor() {
    this.pitch = 0
  }
}

/**
 * Audio reverberation advanced parameters.
 *
 * Developers can use the SDK's built-in presets to change the parameters of the reverb.
 */
export class ZegoReverbAdvancedParam {
  /** Room size(%), in the range [0.0, 1.0], to control the size of the "room" in which the reverb is generated, the larger the room, the stronger the reverb. */
  roomSize: number

  /** Echo(%), in the range [0.0, 100.0], to control the trailing length of the reverb. */
  reverberance: number

  /** Reverb Damping(%), range [0.0, 100.0], controls the attenuation of the reverb, the higher the damping, the higher the attenuation. */
  damping: number

  /** only wet */
  wetOnly: boolean

  /** wet gain(dB), range [-20.0, 10.0] */
  wetGain: number

  /** dry gain(dB), range [-20.0, 10.0] */
  dryGain: number

  /** Tone Low. 100% by default */
  toneLow: number

  /** Tone High. 100% by default */
  toneHigh: number

  /** PreDelay(ms), range [0.0, 200.0] */
  preDelay: number

  /** Stereo Width(%). 0% by default */
  stereoWidth: number

  constructor() {
    this.roomSize = 0
    this.reverberance = 0
    this.damping = 0
    this.wetOnly = false
    this.wetGain = 0
    this.dryGain = 0
    this.toneLow = 100
    this.toneHigh = 100
    this.preDelay = 0
    this.stereoWidth = 0
  }
}

/**
 * Audio reverberation echo parameters.
 */
export class ZegoReverbEchoParam {
  /** Gain of input audio signal, in the range [0.0, 1.0] */
  inGain: number

  /** Gain of output audio signal, in the range [0.0, 1.0] */
  outGain: number

  /** Number of echos, in the range [0, 7] */
  numDelays: number

  /** Respective delay of echo signal, in milliseconds, in the range [0, 5000] ms */
  delay: number[]

  /** Respective decay coefficient of echo signal, in the range [0.0, 1.0] */
  decay: number[]
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

  constructor(userID?: string, userName?: string) {
    this.userID = userID ?? ''
    this.userName = userName ?? userID ?? ''
  }
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
 * Room extra information.
 */
export class ZegoRoomExtraInfo {
  /** The key of the room extra information. */
  key: string

  /** The value of the room extra information. */
  value: string

  /** The user who update the room extra information.Please do not fill in sensitive user information in this field, including but not limited to mobile phone number, ID number, passport number, real name, etc. */
  updateUser: ZegoUser

  /** Update time of the room extra information, UNIX timestamp, in milliseconds. */
  updateTime: number
}

/**
 * View related coordinates.
 */
export class ZegoRect {
  /** The horizontal offset from the top-left corner */
  x: number

  /** The vertical offset from the top-left corner */
  y: number

  /** The width of the rectangle */
  width: number

  /** The height of the rectangle */
  height: number
}

/**
 * Coordinates used by the ROI function.
 */
export class ZegoRoiRect {
  /** The horizontal offset from the top-left corner */
  x: number

  /** The vertical offset from the top-left corner */
  y: number

  /** The width of the rectangle */
  width: number

  /** The height of the rectangle */
  height: number

  /** ROI strength, currently supported value range is [0, 4], 0 is no effect, 4 is the strongest. */
  strength: number
}

/**
 * View object.
 *
 * Configure view object, view Mode, background color
 */
export class ZegoCanvas {
  /** View object */
  view: Sprite

  constructor(view?: Sprite) {
    this.view = view ?? undefined
  }
}

/**
 * Advanced publisher configuration.
 *
 * Configure room id
 */
export class ZegoPublisherConfig {
  /** The Room ID, It is not necessary to pass in single room mode, but the ID of the corresponding room must be passed in multi-room mode */
  roomID: string

  /** Whether to synchronize the network time when pushing streams. 1 is synchronized with 0 is not synchronized. And must be used with setStreamAlignmentProperty. It is used to align multiple streams at the mixed stream service or streaming end, such as the chorus scene of KTV. */
  forceSynchronousNetworkTime: number

  /** When pushing a flow, review the pattern of the flow. By default, no audit is performed. If you want to use this function, contact ZEGO technical support. */
  streamCensorshipMode: ZegoStreamCensorshipMode

  constructor() {
    this.roomID = ''
    this.forceSynchronousNetworkTime = 0
    this.streamCensorshipMode = ZegoStreamCensorshipMode.None
  }
}

/**
 * Published stream quality information.
 *
 * Audio and video parameters and network quality, etc.
 */
export class ZegoPublishStreamQuality {
  /** Video capture frame rate. The unit of frame rate is f/s */
  videoCaptureFPS: number

  /** Video encoding frame rate. The unit of frame rate is f/s */
  videoEncodeFPS: number

  /** Video transmission frame rate. The unit of frame rate is f/s */
  videoSendFPS: number

  /** Video bit rate in kbps */
  videoKBPS: number

  /** Audio capture frame rate. The unit of frame rate is f/s */
  audioCaptureFPS: number

  /** Audio transmission frame rate. The unit of frame rate is f/s */
  audioSendFPS: number

  /** Audio bit rate in kbps */
  audioKBPS: number

  /** Local to server delay, in milliseconds */
  rtt: number

  /** Packet loss rate, in percentage, 0.0 ~ 1.0 */
  packetLostRate: number

  /** Published stream quality level */
  level: ZegoStreamQualityLevel

  /** Whether to enable hardware encoding */
  isHardwareEncode: boolean

  /** Video codec ID (Available since 1.17.0) */
  videoCodecID: ZegoVideoCodecID

  /** Total number of bytes sent, including audio, video, SEI */
  totalSendBytes: number

  /** Number of audio bytes sent */
  audioSendBytes: number

  /** Number of video bytes sent */
  videoSendBytes: number
}

/**
 * CDN config object.
 *
 * Includes CDN URL and authentication parameter string
 */
export class ZegoCDNConfig {
  /** CDN URL */
  url: string

  /** Auth param of URL. Please contact ZEGO technical support if you need to use it, otherwise this parameter can be ignored (set to null or empty string). */
  authParam?: string

  /** URL supported protocols, candidate values are "tcp" and "quic". If there are more than one, separate them with English commas and try them in order. Please contact ZEGO technical support if you need to use it, otherwise this parameter can be ignored (set to null or empty string). */
  protocol?: string

  /** QUIC version。 If [protocol] has the QUIC protocol, this information needs to be filled in. If there are multiple version numbers, separate them with commas. Please contact ZEGO technical support if you need to use it, otherwise this parameter can be ignored (set to null or empty string). */
  quicVersion?: string
}

/**
 * Relay to CDN info.
 *
 * Including the URL of the relaying CDN, relaying state, etc.
 */
export class ZegoStreamRelayCDNInfo {
  /** URL of publishing stream to CDN */
  url: string

  /** State of relaying to CDN */
  state: ZegoStreamRelayCDNState

  /** Reason for relay state changed */
  updateReason: ZegoStreamRelayCDNUpdateReason

  /** The timestamp when the state changed, UNIX timestamp, in milliseconds. */
  stateTime: number
}

/**
 * Advanced player configuration.
 *
 * Configure stream resource mode, CDN configuration and other advanced configurations.
 */
export class ZegoPlayerConfig {
  /** Stream resource mode. */
  resourceMode: ZegoStreamResourceMode

  /** The CDN configuration for playing stream. If set, the stream is play according to the URL instead of the streamID. After that, the streamID is only used as the ID of SDK internal callback. */
  cdnConfig?: ZegoCDNConfig

  /** @deprecated This property has been deprecated since version 1.19.0, please use the [setPlayStreamVideoType] function instead. */
  videoLayer?: ZegoPlayerVideoLayer

  /** The Room ID. It only needs to be filled in the multi-room mode, which indicates which room this stream needs to be bound to. This parameter is ignored in single room mode. */
  roomID?: string

  /** The video encoding type of the stream, please contact ZEGO technical support if you need to use it, otherwise this parameter can be ignored. */
  videoCodecID?: ZegoVideoCodecID

  /** The resource type of the source stream, please contact ZEGO technical support if you need to use it, otherwise this parameter can be ignored. */
  sourceResourceType?: ZegoResourceType

  /** Preconfigured codec template ID, please contact ZEGO technical support if you need to use it, otherwise this parameter can be ignored. */
  codecTemplateID?: number

  constructor() {
    this.resourceMode = ZegoStreamResourceMode.Default
    this.cdnConfig = undefined
    this.videoLayer = 99
    this.roomID = ''
    this.videoCodecID = ZegoVideoCodecID.Unknown
    this.sourceResourceType = ZegoResourceType.RTC
    this.codecTemplateID = 0
  }
}

/**
 * Played stream quality information.
 *
 * Audio and video parameters and network quality, etc.
 */
export class ZegoPlayStreamQuality {
  /** Video receiving frame rate. The unit of frame rate is f/s */
  videoRecvFPS: number

  /** Video dejitter frame rate. The unit of frame rate is f/s (Available since 1.17.0) */
  videoDejitterFPS: number

  /** Video decoding frame rate. The unit of frame rate is f/s */
  videoDecodeFPS: number

  /** Video rendering frame rate. The unit of frame rate is f/s */
  videoRenderFPS: number

  /** Video bit rate in kbps */
  videoKBPS: number

  /** Video break rate, the unit is (number of breaks / every 10 seconds) (Available since 1.17.0) */
  videoBreakRate: number

  /** Audio receiving frame rate. The unit of frame rate is f/s */
  audioRecvFPS: number

  /** Audio dejitter frame rate. The unit of frame rate is f/s (Available since 1.17.0) */
  audioDejitterFPS: number

  /** Audio decoding frame rate. The unit of frame rate is f/s */
  audioDecodeFPS: number

  /** Audio rendering frame rate. The unit of frame rate is f/s */
  audioRenderFPS: number

  /** Audio bit rate in kbps */
  audioKBPS: number

  /** Audio break rate, the unit is (number of breaks / every 10 seconds) (Available since 1.17.0) */
  audioBreakRate: number

  /** The audio quality of the playing stream determined by the audio MOS (Mean Opinion Score) measurement method, value range [-1, 5], where -1 means unknown, [0, 5] means valid score, the higher the score, the better the audio quality. For the subjective perception corresponding to the MOS value, please refer to https://docs.zegocloud.com/article/3720#4_4 (Available since 2.16.0) */
  mos: number

  /** Server to local delay, in milliseconds */
  rtt: number

  /** Packet loss rate, in percentage, 0.0 ~ 1.0 */
  packetLostRate: number

  /** Delay from peer to peer, in milliseconds */
  peerToPeerDelay: number

  /** Packet loss rate from peer to peer, in percentage, 0.0 ~ 1.0 */
  peerToPeerPacketLostRate: number

  /** Published stream quality level */
  level: ZegoStreamQualityLevel

  /** Delay after the data is received by the local end, in milliseconds */
  delay: number

  /** The difference between the video timestamp and the audio timestamp, used to reflect the synchronization of audio and video, in milliseconds. This value is less than 0 means the number of milliseconds that the video leads the audio, greater than 0 means the number of milliseconds that the video lags the audio, and 0 means no difference. When the absolute value is less than 200, it can basically be regarded as synchronized audio and video, when the absolute value is greater than 200 for 10 consecutive seconds, it can be regarded as abnormal (Available since 1.19.0) */
  avTimestampDiff: number

  /** Whether to enable hardware decoding */
  isHardwareDecode: boolean

  /** Video codec ID (Available since 1.17.0) */
  videoCodecID: ZegoVideoCodecID

  /** Total number of bytes received, including audio, video, SEI */
  totalRecvBytes: number

  /** Number of audio bytes received */
  audioRecvBytes: number

  /** Number of video bytes received */
  videoRecvBytes: number

  /** Accumulated audio break count (Available since 2.9.0) */
  audioCumulativeBreakCount: number

  /** Accumulated audio break time, in milliseconds (Available since 2.9.0) */
  audioCumulativeBreakTime: number

  /** Accumulated audio break rate, in percentage, 0.0 ~ 1.0 (Available since 2.9.0) */
  audioCumulativeBreakRate: number

  /** Accumulated audio decode time, in milliseconds (Available since 2.9.0) */
  audioCumulativeDecodeTime: number

  /** Accumulated video break count (Available since 2.9.0) */
  videoCumulativeBreakCount: number

  /** Accumulated video break time, in milliseconds (Available since 2.9.0) */
  videoCumulativeBreakTime: number

  /** Accumulated video break rate, in percentage, 0.0 ~ 1.0 (Available since 2.9.0) */
  videoCumulativeBreakRate: number

  /** Accumulated video decode time, in milliseconds (Available since 2.9.0) */
  videoCumulativeDecodeTime: number
}

/**
 * Device Info.
 *
 * Including device ID and name
 */
export class ZegoDeviceInfo {
  /** Device ID */
  deviceID: string

  /** Device name */
  deviceName: string
}

/**
 * System performance monitoring status
 */
export class ZegoPerformanceStatus {
  /** Current CPU usage of the app, value range [0, 1] */
  cpuUsageApp: number

  /** Current CPU usage of the system, value range [0, 1] */
  cpuUsageSystem: number

  /** Current memory usage of the app, value range [0, 1] */
  memoryUsageApp: number

  /** Current memory usage of the system, value range [0, 1] */
  memoryUsageSystem: number

  /** Current memory used of the app, in MB */
  memoryUsedApp: number
}

/**
 * Beauty configuration param.
 *
 * Configure the whiten, rosy, smooth, and sharpen parameters for beauty.
 */
export class ZegoEffectsBeautyParam {
  /** The whiten intensity parameter, the value range is [0,100], and the default is 50. */
  whitenIntensity: number

  /** the rosy intensity parameter, value range [0,100], and the default is 50. */
  rosyIntensity: number

  /** the smooth intensity parameter, value range [0,100], and the default is 50. */
  smoothIntensity: number

  /** the sharpen intensity parameter, value range [0,100], and the default is 50. */
  sharpenIntensity: number

  constructor() {
    this.whitenIntensity = 50
    this.rosyIntensity = 50
    this.smoothIntensity = 50
    this.sharpenIntensity = 50
  }
}

/**
 * Configuration for start sound level monitor.
 */
export class ZegoSoundLevelConfig {
  /** Monitoring time period of the sound level, in milliseconds, has a value range of [100, 3000]. Default is 100 ms. */
  millisecond: number

  /** Set whether the sound level callback includes the VAD detection result. */
  enableVAD: boolean
}

/**
 * Sound level info object.
 */
export class ZegoSoundLevelInfo {
  /** Sound level value. */
  soundLevel: number

  /** Whether the stream corresponding to StreamID contains voice, 0 means noise, 1 means normal voice. This value is valid only when the [enableVAD] parameter in the [ZegoSoundLevelConfig] configuration is set to true when calling [startSoundLevelMonitor]. */
  vad: number
}

/**
 * Audio configuration.
 *
 * Configure audio bitrate, audio channel, audio encoding for publishing stream
 */
export class ZegoAudioConfig {
  /** Audio bitrate in kbps, default is 48 kbps. The settings before and after publishing stream can be effective */
  bitrate: number

  /** Audio channel, default is Mono. The setting only take effect before publishing stream */
  channel: ZegoAudioChannel

  /** codec ID, default is ZegoAudioCodecIDDefault. The setting only take effect before publishing stream */
  codecID: ZegoAudioCodecID
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
