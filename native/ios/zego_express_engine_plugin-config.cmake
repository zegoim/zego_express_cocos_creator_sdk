# Set the variable "IOS_VARIANT" in your project's CMakeLists.txt
# when you want to build for iOS Simulator or Mac Catalyst
if(NOT DEFINED IOS_VARIANT)
    set(IOS_VARIANT "DEVICE") # DEVICE / SIMULATOR / MACCATALYST
endif()

message(STATUS "[ZEGO] Building for ${IOS_VARIANT}")
if(IOS_VARIANT STREQUAL "DEVICE")
    set(XC_ARCHS "ios-arm64_armv7")
elseif(IOS_VARIANT STREQUAL "SIMULATOR")
    set(XC_ARCHS "ios-arm64_x86_64-simulator")
elseif(IOS_VARIANT STREQUAL "MACCATALYST")
    set(XC_ARCHS "ios-arm64_x86_64-maccatalyst")
endif()

set(ZEGO_EXPRESS_LIBRARY_PATH "${CMAKE_CURRENT_LIST_DIR}/libs/ZegoExpressEngine.xcframework/${XC_ARCHS}/ZegoExpressEngine.framework")
message(STATUS "[ZEGO] Express library path: ${ZEGO_EXPRESS_LIBRARY_PATH}")

add_compile_options(-x objective-c++)

set(SRC_DIR ${CMAKE_CURRENT_LIST_DIR}/../src)
file(GLOB_RECURSE SRC_LIST ${SRC_DIR}/*.h ${SRC_DIR}/*.cc)
source_group(TREE ${SRC_DIR} PREFIX "src" FILES ${SRC_LIST})
add_library(zego_express_engine_plugin ${SRC_LIST})

target_include_directories(zego_express_engine_plugin PRIVATE "${ZEGO_EXPRESS_LIBRARY_PATH}/Headers/cpp")

target_link_libraries(zego_express_engine_plugin
    "${ZEGO_EXPRESS_LIBRARY_PATH}/ZegoExpressEngine"
    ${ENGINE_NAME} # cocos_engine
)

set(POST_PROCESSER "${CMAKE_CURRENT_LIST_DIR}/Post-ZegoExpressEnginePlugin.cmake")
set(NATIVE_ENGINE_PATH "${CMAKE_CURRENT_LIST_DIR}/../../../../native/engine/ios")
execute_process(COMMAND ${CMAKE_COMMAND} -E copy_if_different ${POST_PROCESSER} ${NATIVE_ENGINE_PATH})
