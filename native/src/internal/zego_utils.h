//
//  zego_utils.h
//  zego_express_engine_plugin
//
//  Created by Patrick Fu on 2022/9/30.
//

#pragma once

#include <functional>

namespace zego::cocos {

uint32_t GetNextSequence();

void RunOnCocosThread(const std::function<void()> &func);

} // namespace zego::cocos
