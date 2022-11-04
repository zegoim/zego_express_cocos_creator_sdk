//
//  zego_utils.cc
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#include <atomic>
#include "application/ApplicationManager.h"

namespace zego::cocos {

static std::atomic<uint32_t> global_sequence(0);
uint32_t GetNextSequence() {
    if (++global_sequence == 0) {
        ++global_sequence;
    }
    return global_sequence;
}

void RunOnCocosThread(const std::function<void()> &func) {
    CC_CURRENT_ENGINE()->getScheduler()->performFunctionInCocosThread(func);
}

} // namespace zego::cocos
