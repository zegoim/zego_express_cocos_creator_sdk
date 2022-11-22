//
//  zego_express_event_handler.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/11/22.
//  Copyright © 2022 Zego. All rights reserved.
//

#pragma once

#include "ZegoExpressSDK.h"
#include "bindings/sebind/sebind.h"
#include <mutex>

using namespace ZEGO::EXPRESS;

namespace zego::cocos {

class ZegoExpressEventHandler : public std::enable_shared_from_this<ZegoExpressEventHandler>,
                                public IZegoEventHandler,
                                public IZegoApiCalledEventHandler {

  public:
    static std::shared_ptr<ZegoExpressEventHandler> GetInstance();

    void SetJsEventHandler(const se::Value &handler);
    void ClearJsEventHandler();
    void SetJsApiCalledCallback(const se::Value &callback);
    void ClearJsApiCalledCallback();

  private:
    std::mutex handler_mutex_;
    std::shared_ptr<se::Value> event_handler_;
    std::shared_ptr<se::Value> api_called_callback_;

#pragma mark - Callback
  public:
    void onApiCalledResult(int, const std::string &, const std::string &) override;
    void onDebugError(int errorCode, const std::string &funcName, const std::string &info) override;

    void onRoomStateUpdate(const std::string &roomID, ZegoRoomState state, int errorCode,
                           const std::string &extendedData) override;

    void onRoomStateChanged(const std::string &roomID, ZegoRoomStateChangedReason reason,
                            int errorCode, const std::string &extendedData) override;

    void onRoomStreamUpdate(const std::string &roomID, ZegoUpdateType updateType,
                            const std::vector<ZegoStream> &streamList,
                            const std::string &extendedData) override;
};

} // namespace zego::cocos
