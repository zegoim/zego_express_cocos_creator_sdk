//
//  zego_express_event_handler.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/11/22.
//  Copyright © 2022 Zego. All rights reserved.
//

#include "zego_express_event_handler.h"
#include "zego_utils.h"
#include <memory>

namespace zego::cocos {

std::shared_ptr<ZegoExpressEventHandler> ZegoExpressEventHandler::GetInstance() {
    static std::shared_ptr<ZegoExpressEventHandler> instance_ =
        std::make_shared<ZegoExpressEventHandler>();
    return instance_;
}

void ZegoExpressEventHandler::SetJsEventHandler(const se::Value &handler) {
    std::lock_guard<std::mutex> lock(handler_mutex_);
    event_handler_ = std::make_shared<se::Value>(handler);
}

void ZegoExpressEventHandler::ClearJsEventHandler() {
    std::lock_guard<std::mutex> lock(handler_mutex_);
    event_handler_.reset();
}

void ZegoExpressEventHandler::SetJsApiCalledCallback(const se::Value &callback) {
    std::lock_guard<std::mutex> lock(handler_mutex_);
    api_called_callback_ = std::make_shared<se::Value>(callback);
}

void ZegoExpressEventHandler::ClearJsApiCalledCallback() {
    std::lock_guard<std::mutex> lock(handler_mutex_);
    api_called_callback_.reset();
}

void ZegoExpressEventHandler::onApiCalledResult(int errorCode, const std::string &funcName,
                                                const std::string &info) {
    if (!api_called_callback_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (api_called_callback_ && api_called_callback_->isObject() && api_called_callback_->toObject()->getProperty("onApiCalledResult", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            // MARK: Do not use "sebind::callFunction" because it missing the js "this" object param
            //            sebind::callFunction<void>(method, errorCode, funcName, info);

            se::Value js_error_code, js_func_name, js_info;
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            nativevalue_to_se(funcName, js_func_name, nullptr);
            nativevalue_to_se(info, js_info, nullptr);
            se::ValueArray args{js_error_code, js_func_name, js_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onDebugError(int errorCode, const std::string &funcName,
                                           const std::string &info) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onDebugError", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            //            sebind::callFunction<void>(method, errorCode, funcName, info);
            se::Value js_error_code, js_func_name, js_info;
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            nativevalue_to_se(funcName, js_func_name, nullptr);
            nativevalue_to_se(info, js_info, nullptr);
            se::ValueArray args{js_error_code, js_func_name, js_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onEngineStateUpdate(ZegoEngineState state) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onEngineStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_state;
            nativevalue_to_se(state, js_state, nullptr);
            se::ValueArray args{js_state};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRecvExperimentalAPI(const std::string &content) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRecvExperimentalAPI", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_content;
            nativevalue_to_se(content, js_content, nullptr);
            se::ValueArray args{js_content};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomStateUpdate(const std::string &roomID, ZegoRoomState state,
                                                int errorCode, const std::string &extendedData) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_room_id, js_state, js_error_code, js_extended_data;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            nativevalue_to_se(extendedData, js_extended_data, nullptr);
            se::ValueArray args{js_room_id, js_state, js_error_code, js_extended_data};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomStateChanged(const std::string &roomID,
                                                 ZegoRoomStateChangedReason reason, int errorCode,
                                                 const std::string &extendedData) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomStateChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            //            sebind::callFunction<void>(method, roomID, reason, errorCode, extendedData);
            se::Value js_room_id, js_reason, js_error_code, js_extended_data;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(reason, js_reason, nullptr);
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            nativevalue_to_se(extendedData, js_extended_data, nullptr);
            se::ValueArray args{js_room_id, js_reason, js_error_code, js_extended_data};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomUserUpdate(const std::string &roomID, ZegoUpdateType updateType,
                                               const std::vector<ZegoUser> &userList) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomUserUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_user_list = ccstd::vector<se::Object *>();
            for (auto &user : userList) {
                auto se_user = se::Object::createPlainObject();
                se_user->setProperty("userID", se::Value(user.userID));
                se_user->setProperty("userName", se::Value(user.userName));
                se_user_list.push_back(se_user);
            }
            se::Value js_room_id, js_update_type, js_user_list;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(updateType, js_update_type, nullptr);
            nativevalue_to_se(se_user_list, js_user_list, nullptr);
            se::ValueArray args{js_room_id, js_update_type, js_user_list};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomOnlineUserCountUpdate(const std::string &roomID, int count) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomOnlineUserCountUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_room_id, js_count;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(count, js_count, nullptr);
            se::ValueArray args{js_room_id, js_count};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomStreamUpdate(const std::string &roomID,
                                                 ZegoUpdateType updateType,
                                                 const std::vector<ZegoStream> &streamList,
                                                 const std::string &extendedData) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomStreamUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_stream_list = ccstd::vector<se::Object *>();
            for (auto &stream : streamList) {
                auto se_stream = se::Object::createPlainObject();
                auto se_user = se::Object::createPlainObject();
                se_user->setProperty("userID", se::Value(stream.user.userID));
                se_user->setProperty("userName", se::Value(stream.user.userName));
                se_stream->setProperty("user", se::Value(se_user));
                se_stream->setProperty("streamID", se::Value(stream.streamID));
                se_stream->setProperty("extraInfo", se::Value(stream.extraInfo));
                se_stream_list.push_back(se_stream);
            }
            // sebind::callFunction<void>(method, roomID, updateType, js_stream_list, extendedData);
            se::Value js_room_id, js_update_type, js_stream_list, js_extended_data;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(updateType, js_update_type, nullptr);
            nativevalue_to_se(se_stream_list, js_stream_list, nullptr);
            nativevalue_to_se(extendedData, js_extended_data, nullptr);
            se::ValueArray args{js_room_id, js_update_type, js_stream_list, js_extended_data};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomStreamExtraInfoUpdate(
    const std::string &roomID, const std::vector<ZegoStream> &streamList) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomStreamExtraInfoUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_stream_list = ccstd::vector<se::Object *>();
            for (auto &stream : streamList) {
                auto se_stream = se::Object::createPlainObject();
                auto se_user = se::Object::createPlainObject();
                se_user->setProperty("userID", se::Value(stream.user.userID));
                se_user->setProperty("userName", se::Value(stream.user.userName));
                se_stream->setProperty("user", se::Value(se_user));
                se_stream->setProperty("streamID", se::Value(stream.streamID));
                se_stream->setProperty("extraInfo", se::Value(stream.extraInfo));
                se_stream_list.push_back(se_stream);
            }
            se::Value js_room_id, js_update_type, js_stream_list, js_extended_data;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(se_stream_list, js_stream_list, nullptr);
            se::ValueArray args{js_room_id, js_stream_list};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomExtraInfoUpdate(
    const std::string &roomID, const std::vector<ZegoRoomExtraInfo> &roomExtraInfoList) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomExtraInfoUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_info_list = ccstd::vector<se::Object *>();
            for (auto &info : roomExtraInfoList) {
                auto se_info = se::Object::createPlainObject();
                se_info->setProperty("key", se::Value(info.key));
                se_info->setProperty("value", se::Value(info.value));
                auto se_user = se::Object::createPlainObject();
                se_user->setProperty("userID", se::Value(info.updateUser.userID));
                se_user->setProperty("userName", se::Value(info.updateUser.userName));
                se_info->setProperty("updateUser", se::Value(se_user));
                se_info->setProperty("updateTime", se::Value((uint64_t)info.updateTime));
                se_info_list.push_back(se_info);
            }
            se::Value js_room_id, js_info_list;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(se_info_list, js_info_list, nullptr);
            se::ValueArray args{js_room_id, js_info_list};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRoomTokenWillExpire(const std::string &roomID,
                                                    int remainTimeInSecond) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRoomTokenWillExpire", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_room_id, js_second;
            nativevalue_to_se(roomID, js_room_id, nullptr);
            nativevalue_to_se(remainTimeInSecond, js_second, nullptr);
            se::ValueArray args{js_room_id, js_second};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherStateUpdate(const std::string &streamID,
                                                     ZegoPublisherState state, int errorCode,
                                                     const std::string &extendedData) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_state, js_error_code, js_extended_data;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            nativevalue_to_se(extendedData, js_extended_data, nullptr);
            se::ValueArray args{js_stream_id, js_state, js_error_code, js_extended_data};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherQualityUpdate(const std::string &streamID,
                                                       const ZegoPublishStreamQuality &quality) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherQualityUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_quality = se::Object::createPlainObject();
            se_quality->setProperty("videoCaptureFPS", se::Value(quality.videoCaptureFPS));
            se_quality->setProperty("videoEncodeFPS", se::Value(quality.videoEncodeFPS));
            se_quality->setProperty("videoSendFPS", se::Value(quality.videoSendFPS));
            se_quality->setProperty("videoKBPS", se::Value(quality.videoKBPS));
            se_quality->setProperty("audioCaptureFPS", se::Value(quality.audioCaptureFPS));
            se_quality->setProperty("audioSendFPS", se::Value(quality.audioSendFPS));
            se_quality->setProperty("audioKBPS", se::Value(quality.audioKBPS));
            se_quality->setProperty("rtt", se::Value(quality.rtt));
            se_quality->setProperty("packetLostRate", se::Value(quality.packetLostRate));
            se_quality->setProperty("level", se::Value(quality.level));
            se_quality->setProperty("isHardwareEncode", se::Value(quality.isHardwareEncode));
            se_quality->setProperty("videoCodecID", se::Value(quality.videoCodecID));
            se_quality->setProperty("totalSendBytes", se::Value(quality.totalSendBytes));
            se_quality->setProperty("audioSendBytes", se::Value(quality.audioSendBytes));
            se_quality->setProperty("videoSendBytes", se::Value(quality.videoSendBytes));

            se::Value js_stream_id, js_quality;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(se_quality, js_quality, nullptr);
            se::ValueArray args{js_stream_id, js_quality};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherCapturedAudioFirstFrame() {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherCapturedAudioFirstFrame",
                                                    &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::ValueArray args{};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherCapturedVideoFirstFrame(ZegoPublishChannel channel) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherCapturedVideoFirstFrame",
                                                    &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_channel;
            nativevalue_to_se(channel, js_channel, nullptr);
            se::ValueArray args{js_channel};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherRenderVideoFirstFrame(ZegoPublishChannel channel) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherRenderVideoFirstFrame", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_channel;
            nativevalue_to_se(channel, js_channel, nullptr);
            se::ValueArray args{js_channel};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherVideoSizeChanged(int width, int height,
                                                          ZegoPublishChannel channel) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherVideoSizeChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_width, js_height, js_channel;
            nativevalue_to_se(width, js_width, nullptr);
            nativevalue_to_se(height, js_height, nullptr);
            nativevalue_to_se(channel, js_channel, nullptr);
            se::ValueArray args{js_width, js_height, js_channel};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherRelayCDNStateUpdate(
    const std::string &streamID, const std::vector<ZegoStreamRelayCDNInfo> &infoList) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherRelayCDNStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_info_list = ccstd::vector<se::Object *>();
            for (auto &info : infoList) {
                auto se_info = se::Object::createPlainObject();
                se_info->setProperty("url", se::Value(info.url));
                se_info->setProperty("state", se::Value(info.state));
                se_info->setProperty("updateReason", se::Value(info.updateReason));
                se_info->setProperty("stateTime", se::Value((uint64_t)info.stateTime));
                se_info_list.push_back(se_info);
            }
            se::Value js_stream_id, js_info_list;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(se_info_list, js_info_list, nullptr);
            se::ValueArray args{js_stream_id, js_info_list};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherVideoEncoderChanged(ZegoVideoCodecID fromCodecID,
                                                             ZegoVideoCodecID toCodecID,
                                                             ZegoPublishChannel channel) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherVideoEncoderChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_from, js_to, js_channel;
            nativevalue_to_se(fromCodecID, js_from, nullptr);
            nativevalue_to_se(toCodecID, js_to, nullptr);
            nativevalue_to_se(channel, js_channel, nullptr);
            se::ValueArray args{js_from, js_to, js_channel};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPublisherStreamEvent(ZegoStreamEvent eventID,
                                                     const std::string &streamID,
                                                     const std::string &extraInfo) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPublisherStreamEvent", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_event_id, js_stream_id, js_extra_info;
            nativevalue_to_se(eventID, js_event_id, nullptr);
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(extraInfo, js_extra_info, nullptr);
            se::ValueArray args{js_event_id, js_stream_id, js_extra_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerStateUpdate(const std::string &streamID,
                                                  ZegoPlayerState state, int errorCode,
                                                  const std::string &extendedData) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_state, js_error_code, js_extended_data;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            nativevalue_to_se(extendedData, js_extended_data, nullptr);
            se::ValueArray args{js_stream_id, js_state, js_error_code, js_extended_data};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerQualityUpdate(const std::string &streamID,
                                                    const ZegoPlayStreamQuality &quality) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerQualityUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_quality = se::Object::createPlainObject();
            se_quality->setProperty("videoRecvFPS", se::Value(quality.videoRecvFPS));
            se_quality->setProperty("videoDejitterFPS", se::Value(quality.videoDejitterFPS));
            se_quality->setProperty("videoDecodeFPS", se::Value(quality.videoDecodeFPS));
            se_quality->setProperty("videoRenderFPS", se::Value(quality.videoRenderFPS));
            se_quality->setProperty("videoKBPS", se::Value(quality.videoKBPS));
            se_quality->setProperty("videoBreakRate", se::Value(quality.videoBreakRate));
            se_quality->setProperty("audioRecvFPS", se::Value(quality.audioRecvFPS));
            se_quality->setProperty("audioDejitterFPS", se::Value(quality.audioDejitterFPS));
            se_quality->setProperty("audioDecodeFPS", se::Value(quality.audioDecodeFPS));
            se_quality->setProperty("audioRenderFPS", se::Value(quality.audioRenderFPS));
            se_quality->setProperty("audioKBPS", se::Value(quality.audioKBPS));
            se_quality->setProperty("audioBreakRate", se::Value(quality.audioBreakRate));
            se_quality->setProperty("mos", se::Value(quality.mos));
            se_quality->setProperty("rtt", se::Value(quality.rtt));
            se_quality->setProperty("packetLostRate", se::Value(quality.packetLostRate));
            se_quality->setProperty("peerToPeerDelay", se::Value(quality.peerToPeerDelay));
            se_quality->setProperty("peerToPeerPacketLostRate",
                                    se::Value(quality.peerToPeerPacketLostRate));
            se_quality->setProperty("level", se::Value(quality.level));
            se_quality->setProperty("delay", se::Value(quality.delay));
            se_quality->setProperty("avTimestampDiff", se::Value(quality.avTimestampDiff));
            se_quality->setProperty("isHardwareDecode", se::Value(quality.isHardwareDecode));
            se_quality->setProperty("videoCodecID", se::Value(quality.videoCodecID));
            se_quality->setProperty("totalRecvBytes", se::Value(quality.totalRecvBytes));
            se_quality->setProperty("audioRecvBytes", se::Value(quality.audioRecvBytes));
            se_quality->setProperty("videoRecvBytes", se::Value(quality.videoRecvBytes));
            se_quality->setProperty("audioCumulativeBreakCount",
                                    se::Value(quality.audioCumulativeBreakCount));
            se_quality->setProperty("audioCumulativeBreakTime",
                                    se::Value(quality.audioCumulativeBreakTime));
            se_quality->setProperty("audioCumulativeBreakRate",
                                    se::Value(quality.audioCumulativeBreakRate));
            se_quality->setProperty("audioCumulativeDecodeTime",
                                    se::Value(quality.audioCumulativeDecodeTime));
            se_quality->setProperty("videoCumulativeBreakCount",
                                    se::Value(quality.videoCumulativeBreakCount));
            se_quality->setProperty("videoCumulativeBreakTime",
                                    se::Value(quality.videoCumulativeBreakTime));
            se_quality->setProperty("videoCumulativeBreakRate",
                                    se::Value(quality.videoCumulativeBreakRate));
            se_quality->setProperty("videoCumulativeDecodeTime",
                                    se::Value(quality.videoCumulativeDecodeTime));

            se::Value js_stream_id, js_quality;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(se_quality, js_quality, nullptr);
            se::ValueArray args{js_stream_id, js_quality};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerMediaEvent(const std::string &streamID,
                                                 ZegoPlayerMediaEvent event) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerMediaEvent", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_event;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(event, js_event, nullptr);
            se::ValueArray args{js_stream_id, js_event};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerRecvAudioFirstFrame(const std::string &streamID) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerRecvAudioFirstFrame", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            se::ValueArray args{js_stream_id};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerRecvVideoFirstFrame(const std::string &streamID) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerRecvVideoFirstFrame", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            se::ValueArray args{js_stream_id};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerRenderVideoFirstFrame(const std::string &streamID) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerRenderVideoFirstFrame", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            se::ValueArray args{js_stream_id};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerRenderCameraVideoFirstFrame(const std::string &streamID) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerRenderCameraVideoFirstFrame",
                                                    &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            se::ValueArray args{js_stream_id};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerVideoSizeChanged(const std::string &streamID, int width,
                                                       int height) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerVideoSizeChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_width, js_height;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(width, js_width, nullptr);
            nativevalue_to_se(height, js_height, nullptr);
            se::ValueArray args{js_stream_id, js_width, js_height};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerRecvSEI(const std::string &streamID,
                                              const unsigned char *data, unsigned int dataLength) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerRecvSEI", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Object *se_data =
                se::Object::createTypedArray(se::Object::TypedArrayType::UINT8, data, dataLength);
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);

            se::ValueArray args{js_stream_id, se::Value(se_data)};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerRecvAudioSideInfo(const std::string &streamID,
                                                        const unsigned char *data,
                                                        unsigned int dataLength) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerRecvAudioSideInfo", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Object *se_data =
                se::Object::createTypedArray(se::Object::TypedArrayType::UINT8, data, dataLength);
            se::Value js_stream_id;
            nativevalue_to_se(streamID, js_stream_id, nullptr);

            se::ValueArray args{js_stream_id, se::Value(se_data)};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerLowFpsWarning(ZegoVideoCodecID codecID,
                                                    const std::string &streamID) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerLowFpsWarning", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_codec_id, js_stream_id;
            nativevalue_to_se(codecID, js_codec_id, nullptr);
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            se::ValueArray args{js_codec_id, js_stream_id};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onPlayerStreamEvent(ZegoStreamEvent eventID,
                                                  const std::string &streamID,
                                                  const std::string &extraInfo) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerLowFpsWarning", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_event_id, js_stream_id, js_extra_info;
            nativevalue_to_se(eventID, js_event_id, nullptr);
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(extraInfo, js_extra_info, nullptr);
            se::ValueArray args{js_event_id, js_stream_id, js_extra_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

#if TARGET_OS_IPHONE || defined(ANDROID)
void ZegoExpressEventHandler::onPlayerVideoSuperResolutionUpdate(const std::string &streamID,
                                                                 ZegoSuperResolutionState state,
                                                                 int errorCode) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onPlayerLowFpsWarning", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_state, js_error_code;

            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            nativevalue_to_se(errorCode, js_error_code, nullptr);
            se::ValueArray args{js_stream_id, js_state, js_error_code};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}
#endif

void ZegoExpressEventHandler::onAudioDeviceStateChanged(ZegoUpdateType updateType,
                                                        ZegoAudioDeviceType deviceType,
                                                        const ZegoDeviceInfo &deviceInfo) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onAudioDeviceStateChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_device_info = se::Object::createPlainObject();
            se_device_info->setProperty("deviceID", se::Value(deviceInfo.deviceID));
            se_device_info->setProperty("deviceName", se::Value(deviceInfo.deviceName));
            se::Value js_update_type, js_device_type, js_device_info;
            nativevalue_to_se(updateType, js_update_type, nullptr);
            nativevalue_to_se(deviceType, js_device_type, nullptr);
            nativevalue_to_se(se_device_info, js_device_info, nullptr);
            se::ValueArray args{js_update_type, js_device_type, js_device_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onAudioDeviceVolumeChanged(ZegoAudioDeviceType deviceType,
                                                         const std::string &deviceID, int volume) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onAudioDeviceVolumeChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_device_type, js_device_id, js_volume;
            nativevalue_to_se(deviceType, js_device_type, nullptr);
            nativevalue_to_se(deviceID, js_device_id, nullptr);
            nativevalue_to_se(volume, js_volume, nullptr);
            se::ValueArray args{js_device_type, js_device_id, js_volume};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onVideoDeviceStateChanged(ZegoUpdateType updateType,
                                                        const ZegoDeviceInfo &deviceInfo) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onVideoDeviceStateChanged", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_device_info = se::Object::createPlainObject();
            se_device_info->setProperty("deviceID", se::Value(deviceInfo.deviceID));
            se_device_info->setProperty("deviceName", se::Value(deviceInfo.deviceName));
            se::Value js_update_type, js_device_info;
            nativevalue_to_se(updateType, js_update_type, nullptr);
            nativevalue_to_se(se_device_info, js_device_info, nullptr);
            se::ValueArray args{js_update_type, js_device_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onCapturedSoundLevelInfoUpdate(
    const ZegoSoundLevelInfo &soundLevelInfo) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onCapturedSoundLevelInfoUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_info = se::Object::createPlainObject();
            se_info->setProperty("soundLevel", se::Value(soundLevelInfo.soundLevel));
            se_info->setProperty("vad", se::Value(soundLevelInfo.vad));
            se::Value js_info;
            nativevalue_to_se(se_info, js_info, nullptr);
            se::ValueArray args{js_info};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRemoteSoundLevelInfoUpdate(
    const std::unordered_map<std::string, ZegoSoundLevelInfo> &soundLevelInfos) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRemoteSoundLevelInfoUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            auto se_info_map = ccstd::unordered_map<std::string, se::Object *>();
            for (auto &info : soundLevelInfos) {
                auto se_info = se::Object::createPlainObject();
                se_info->setProperty("soundLevel", se::Value(info.second.soundLevel));
                se_info->setProperty("vad", se::Value(info.second.vad));
                se_info_map[info.first] = se_info;
            }
            se::Value js_info_map;
            nativevalue_to_se(se_info_map, js_info_map, nullptr);
            se::ValueArray args{js_info_map};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onCapturedAudioSpectrumUpdate(
    const ZegoAudioSpectrum &audioSpectrum) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onCapturedAudioSpectrumUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_spectrum;
            nativevalue_to_se(audioSpectrum, js_spectrum, nullptr);
            se::ValueArray args{js_spectrum};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRemoteAudioSpectrumUpdate(
    const std::unordered_map<std::string, ZegoAudioSpectrum> &audioSpectrums) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRemoteAudioSpectrumUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_map;
            nativevalue_to_se(audioSpectrums, js_map, nullptr);
            se::ValueArray args{js_map};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onLocalDeviceExceptionOccurred(ZegoDeviceExceptionType exceptionType,
                                                             ZegoDeviceType deviceType,
                                                             const std::string &deviceID) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onLocalDeviceExceptionOccurred", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_exception_type, js_device_type, js_device_id;
            nativevalue_to_se(exceptionType, js_exception_type, nullptr);
            nativevalue_to_se(deviceType, js_device_type, nullptr);
            nativevalue_to_se(deviceID, js_device_id, nullptr);
            se::ValueArray args{js_exception_type, js_device_type, js_device_id};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRemoteCameraStateUpdate(const std::string &streamID,
                                                        ZegoRemoteDeviceState state) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRemoteCameraStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_state;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            se::ValueArray args{js_stream_id, js_state};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRemoteMicStateUpdate(const std::string &streamID,
                                                     ZegoRemoteDeviceState state) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRemoteMicStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_state;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            se::ValueArray args{js_stream_id, js_state};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

void ZegoExpressEventHandler::onRemoteSpeakerStateUpdate(const std::string &streamID,
                                                         ZegoRemoteDeviceState state) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onRemoteSpeakerStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_stream_id, js_state;
            nativevalue_to_se(streamID, js_stream_id, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            se::ValueArray args{js_stream_id, js_state};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

#if TARGET_OS_IPHONE || defined(ANDROID) || defined(_OS_OHOS_)
void ZegoExpressEventHandler::onAudioRouteChange(ZegoAudioRoute audioRoute) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onAudioRouteChange", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_audio_route;
            nativevalue_to_se(audioRoute, js_audio_route, nullptr);
            se::ValueArray args{js_audio_route};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}
#endif

void ZegoExpressEventHandler::onAudioVADStateUpdate(ZegoAudioVADStableStateMonitorType type,
                                                    ZegoAudioVADType state) {
    if (!event_handler_) {
        return;
    }
    RunOnCocosThread([=]() {
        se::AutoHandleScope hs;
        se::Value method;
        if (event_handler_->toObject()->getProperty("onAudioVADStateUpdate", &method)) {
            if (!method.isObject() || !method.toObject()->isFunction()) {
                return;
            }
            se::Value js_type, js_state;
            nativevalue_to_se(type, js_type, nullptr);
            nativevalue_to_se(state, js_state, nullptr);
            se::ValueArray args{js_type, js_state};
            method.toObject()->call(args, event_handler_->toObject());
        }
    });
}

} // namespace zego::cocos
