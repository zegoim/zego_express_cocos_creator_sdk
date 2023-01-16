//
//  zego_utils.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include "application/ApplicationManager.h"
#include <atomic>

namespace zego::cocos {

static std::atomic<uint32_t> global_sequence(0);
uint32_t GetNextSequence() {
    if (++global_sequence == 0) {
        ++global_sequence;
    }
    return global_sequence;
}

void RunOnCocosThread(const std::function<void()> &func) {
    auto cc_manager = CC_APPLICATION_MANAGER();
    if (!cc_manager) {
        CC_LOG_WARNING("[ZEGO] cc application manager is null!");
        return;
    }
    auto cc_current_application = cc_manager->getCurrentApp();
    if (!cc_current_application) {
        CC_LOG_WARNING("[ZEGO] cc current application is null!");
        return;
    }
    auto cc_engine = cc_current_application->getEngine();
    if (!cc_engine) {
        CC_LOG_WARNING("[ZEGO] cc engine is null!");
        return;
    }
    auto cc_scheduler = cc_engine->getScheduler();
    if (!cc_scheduler) {
        CC_LOG_WARNING("[ZEGO] cc scheduler is null!");
        return;
    }
    cc_scheduler->performFunctionInCocosThread(func);
}

} // namespace zego::cocos
