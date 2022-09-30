//
//  zego_express_engine_plugin.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"

#include "internal/zego_express_bridge.h"

void load_zego_express_engine_plugin() {
    using namespace cc::plugin;
    static Listener listener(BusType::SCRIPT_ENGINE);
    listener.receive([](ScriptEngineEvent event) {
        if (event == ScriptEngineEvent::POST_INIT) {
            se::ScriptEngine::getInstance()->addRegisterCallback(
                zego::cocos::RegisterExpressBridge);
        }
    });
}

CC_PLUGIN_ENTRY(zego_express_engine_plugin, load_zego_express_engine_plugin);
