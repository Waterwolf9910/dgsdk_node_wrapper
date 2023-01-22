cmake_minimum_required(VERSION 3.15)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

set(CMAKE_VERBOSE_MAKEFILE ON)
SET(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
# OPTION(DEBUG_CMAKE_TARGETS "enable debug output for cmake target properties" ON)
# if(DEBUG_CMAKE_TARGETS)
# 	set(CMAKE_DEBUG_TARGET_PROPERTIES
#             INCLUDE_DIRECTORIES
#         )
# endif()
execute_process(WORKING_DIRECTORY ${CMAKE_SOURCE_DIR} OUTPUT_VARIABLE _napi_include COMMAND node -p "require('node-addon-api').include_dir")
string(REGEX REPLACE "[\r\n\"]" "" napi_include ${_napi_include})
# execute_process(OUTPUT_VARIABLE sysinclude COMMAND node -p "require('path').resolve('${CMAKE_SYSTEM_INCLUDE_PATH}', ..)")

project(dgsdk_node)

file(GLOB SOURCE_FILES "src/*.cpp" "src/*.h" "include/discord_sdk/*.cpp" "include/discord_sdk/*.h")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})

add_library(dsdk SHARED IMPORTED)

if(${CMAKE_SYSTEM_NAME} EQUAL Windows OR ${CMAKE_SYSTEM_NAME} EQUAL MSYS)
    configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.dll" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/discord_game_sdk.dll" COPYONLY)
    configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.dll.lib" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/discord_game_sdk.dll.lib" COPYONLY)
    configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.dll" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/../discord_game_sdk.dll" COPYONLY)
    configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.dll.lib" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/../discord_game_sdk.dll.lib" COPYONLY)
    set_target_properties(dsdk PROPERTIES IMPORTED_LOCATION "discord_game_sdk.dll" IMPORTED_IMPLIB "discord_game_sdk.dll.lib")
elseif(${CMAKE_SYSTEM_NAME} EQUAL Darwin)
    configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.dylib" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/discord_game_sdk.dylib" COPYONLY)
    configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.dylib" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/../discord_game_sdk.dylib" COPYONLY)
    set_target_properties(dsdk PROPERTIES IMPORTED_LOCATION "discord_game_sdk.dylib")
else()
configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.so" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/discord_game_sdk.so" COPYONLY)
configure_file("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.so" "${CMAKE_LIBRARY_OUTPUT_DIRECTORY}/../discord_game_sdk.so" COPYONLY)
    set_target_properties(dsdk PROPERTIES IMPORTED_LOCATION "discord_game_sdk.so")
endif()

message("${CMAKE_SOURCE_DIR}/libs/discord_game_sdk/x86_64/discord_game_sdk.so")
message("${CMAKE_LIBRARY_OUTPUT_DIRECTORY}")

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_include_directories(${PROJECT_NAME} SYSTEM PRIVATE ${CMAKE_JS_INC})
target_include_directories(${PROJECT_NAME} SYSTEM PRIVATE ${napi_include})
target_include_directories(${PROJECT_NAME} SYSTEM PRIVATE "include")

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
set_target_properties(${PROJECT_NAME} PROPERTIES BUILD_WITH_INSTALL_RPATH FALSE LINK_FLAGS "-Wl,-rpath=${CMAKE_LIBRARY_OUTPUT_DIRECTORY}")
target_link_libraries(${PROJECT_NAME} PRIVATE dsdk)

if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
    execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
endif()

add_definitions(-DNAPI_VERSION=6)
# add_definitions(-DNAPI_DISABLE_CPP_EXCEPTIONS)
# add_definitions(-DNODE_ADDON_API_ENABLE_MAYBE)
