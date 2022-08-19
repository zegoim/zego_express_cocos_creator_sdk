# Modify this value when you want to build for iOS Simulator or Mac Catalyst
set(IOS_VARIANT "DEVICE") # DEVICE / SIMULATOR / MACCATALYST

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

aux_source_directory(${CMAKE_CURRENT_LIST_DIR}/../src SRC_LIST)
add_library(ZegoExpressEngine ${SRC_LIST})

target_include_directories(ZegoExpressEngine PRIVATE "${ZEGO_EXPRESS_LIBRARY_PATH}/Headers")

target_link_libraries(ZegoExpressEngine
    "${ZEGO_EXPRESS_LIBRARY_PATH}/ZegoExpressEngine"
    ${ENGINE_NAME} # cocos_engine
)

set(POST_PROCESSER "${CMAKE_CURRENT_LIST_DIR}/Post-EmbedFramework.cmake")
set(NATIVE_ENGINE_PATH "${CMAKE_CURRENT_LIST_DIR}/../../../../native/engine/ios")
execute_process(COMMAND ${CMAKE_COMMAND} -E copy_if_different ${POST_PROCESSER} ${NATIVE_ENGINE_PATH})
