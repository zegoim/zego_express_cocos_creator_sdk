#include "ZegoExpressSDK.h"
#include "bindings/manual/jsb_conversions.h"
#include "bindings/sebind/sebind.h"
#include "internal/zego_express_bridge.h"
#include "plugins/Plugins.h"
#include "plugins/bus/EventBus.h"
#include <memory>
#include <unordered_map>

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

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(zego_express_engine_plugin, load_zego_express_engine_plugin);
