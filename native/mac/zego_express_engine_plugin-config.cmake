set(ZEGO_EXPRESS_LIBRARY_PATH "${CMAKE_CURRENT_LIST_DIR}/libs/ZegoExpressEngine.xcframework/macos-arm64_x86_64")
message(STATUS "[ZEGO] Express library path: ${ZEGO_EXPRESS_LIBRARY_PATH}")

add_compile_options(-x objective-c++)

aux_source_directory(${CMAKE_CURRENT_LIST_DIR}/../src SRC_LIST)
add_library(zego_express_engine_plugin ${SRC_LIST})

target_include_directories(zego_express_engine_plugin PRIVATE "${ZEGO_EXPRESS_LIBRARY_PATH}/Headers")

target_link_libraries(zego_express_engine_plugin
    "${ZEGO_EXPRESS_LIBRARY_PATH}/libZegoExpressEngine.dylib"
    ${ENGINE_NAME} # cocos_engine
)

set(POST_PROCESSER "${CMAKE_CURRENT_LIST_DIR}/Post-EmbedFramework.cmake")
set(NATIVE_ENGINE_PATH "${CMAKE_CURRENT_LIST_DIR}/../../../../native/engine/mac")
execute_process(COMMAND ${CMAKE_COMMAND} -E copy_if_different ${POST_PROCESSER} ${NATIVE_ENGINE_PATH})