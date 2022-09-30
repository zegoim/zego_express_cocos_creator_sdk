set(ZEGO_EXPRESS_LIBRARY_PATH "${CMAKE_CURRENT_LIST_DIR}/libs/${ANDROID_ABI}")
message(STATUS "[ZEGO] Express library path: ${ZEGO_EXPRESS_LIBRARY_PATH}")

set(SRC_DIR ${CMAKE_CURRENT_LIST_DIR}/../src)
file(GLOB_RECURSE SRC_LIST ${SRC_DIR}/*.h ${SRC_DIR}/*.cc)
source_group(TREE ${SRC_DIR} PREFIX "src" FILES ${SRC_LIST})
add_library(zego_express_engine_plugin ${SRC_LIST})

target_include_directories(zego_express_engine_plugin PRIVATE "${ZEGO_EXPRESS_LIBRARY_PATH}/include")

target_link_libraries(zego_express_engine_plugin
    "${ZEGO_EXPRESS_LIBRARY_PATH}/libZegoExpressEngine.so"
    ${ENGINE_NAME} # cocos_engine
)
