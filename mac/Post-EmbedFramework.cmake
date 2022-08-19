# "XCODE_EMBED_FRAMEWORKS" requires cmake 3.20.0
cmake_minimum_required(VERSION 3.20)

# Embed & Sign
set_target_properties(${EXECUTABLE_NAME} PROPERTIES XCODE_EMBED_FRAMEWORKS "${ZEGO_EXPRESS_LIBRARY_PATH}/libZegoExpressEngine.dylib")
set_target_properties(${EXECUTABLE_NAME} PROPERTIES XCODE_EMBED_FRAMEWORKS_REMOVE_HEADERS_ON_COPY ON)
set_target_properties(${EXECUTABLE_NAME} PROPERTIES XCODE_EMBED_FRAMEWORKS_CODE_SIGN_ON_COPY ON)
set_target_properties(${EXECUTABLE_NAME} PROPERTIES XCODE_ATTRIBUTE_LD_RUNPATH_SEARCH_PATHS
    "@executable_path/Frameworks @executable_path/../Frameworks") # Set @rpath
message(STATUS "[ZEGO] Set embed framework: ${ZEGO_EXPRESS_LIBRARY_PATH}")
