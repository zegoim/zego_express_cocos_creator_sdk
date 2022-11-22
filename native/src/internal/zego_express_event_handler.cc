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
        if (api_called_callback_->toObject()->getProperty("onApiCalledResult", &method)) {
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

} // namespace zego::cocos
