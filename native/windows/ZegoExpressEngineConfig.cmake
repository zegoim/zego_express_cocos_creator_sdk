if(${CMAKE_SIZEOF_VOID_P} STREQUAL "4")
    set(WIN_ARCH "x86")
else()
    set(WIN_ARCH "x64")
endif()

set(ZEGO_EXPRESS_LIBRARY_PATH "${CMAKE_CURRENT_LIST_DIR}/libs/${WIN_ARCH}")
message(STATUS "[ZEGO] Express library path: ${ZEGO_EXPRESS_LIBRARY_PATH}")

aux_source_directory(${CMAKE_CURRENT_LIST_DIR}/../src SRC_LIST)
add_library(ZegoExpressEngine ${SRC_LIST})

target_include_directories(ZegoExpressEngine PRIVATE "${ZEGO_EXPRESS_LIBRARY_PATH}/include")

target_link_libraries(ZegoExpressEngine
    "${ZEGO_EXPRESS_LIBRARY_PATH}/ZegoExpressEngine.lib"
    ${ENGINE_NAME} # cocos_engine
)
