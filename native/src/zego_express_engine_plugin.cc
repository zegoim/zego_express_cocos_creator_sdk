#include "bindings/sebind/sebind.h"
#include "plugins/Plugins.h"
#include "plugins/bus/EventBus.h"

#include "ZegoExpressSDK.h"

using namespace ZEGO::EXPRESS;

// export c++ methods to JS
static bool register_sdk(se::Object *ns) {
        
    sebind::class_<ZegoExpressSDK> klass("ZegoExpressSDK");

    klass.staticFunction("getVersion", &ZegoExpressSDK::getVersion).install(ns);
    return true;
}

void load_zego_express_engine_plugin() {
    using namespace cc::plugin;
    static Listener listener(BusType::SCRIPT_ENGINE);
    listener.receive([](ScriptEngineEvent event) {
        if (event == ScriptEngineEvent::POST_INIT) {
            se::ScriptEngine::getInstance()->addRegisterCallback(register_sdk);
        }
    });
}

/**
 * Regist a new cc plugin entry function
 * first  param: should match the name in cc_plugin.json
 * second param: callback when engine initialized
 */
CC_PLUGIN_ENTRY(zego_express_engine_plugin, load_zego_express_engine_plugin);
