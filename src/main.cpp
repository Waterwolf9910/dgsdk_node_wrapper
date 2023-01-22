#include "napi.h"
#include "discord_sdk/discord.h"
#include <string>
#include <csignal>
#include <map>
#include <iostream>
#include <vector>
// #include <stdio.h>
// #include <stdlib.h>
// #include <iostream>

#include "./utils.h"

using std::string;
using std::map;
using std::vector;

using Napi::String;
using Napi::Object;
using Napi::Boolean;
using Napi::Number;
using Napi::Env;
using Napi::CallbackInfo;
using Napi::Function;
using Napi::Value;

String Hello(const CallbackInfo &info) {
    auto env = info.Env();
    return String::New(env, "world");
}

Object HelloObject(const CallbackInfo &info) {
    auto env = info.Env();
    auto obj = Object::New(env);

    obj.Set("hello", Function::New(env, Hello));
    
    return obj;
}

// map<string, Function> callbacks;

void Logger(discord::LogLevel level, const char *msg) {
    if (utils::CallbackList::GetInstance().has("logs")) {
        auto fun = utils::CallbackList::GetInstance()["logs"];
        vector<napi_value> args;
        args.push_back(Number::New(fun->Env(), int(level)));
        args.push_back(String::New(fun->Env(), msg));
        fun->MakeCallback(fun->Value().ToObject(), args, nullptr);
    } else {
        std::cout << msg;
    }
}

void SetLogHook(const CallbackInfo &info) {
    utils::CallbackList::GetInstance().set("logs", info[1].As<Function>());
    utils::core->SetLogHook(discord::LogLevel(info[0].As<Number>().Int64Value()), Logger);
}

Number RunCallbacks(const CallbackInfo &info) {
    auto env = info.Env();
    auto result = utils::core->RunCallbacks();
    return Number::New(env, int(result));
}
#include <any>
void TestLoggerCB(const CallbackInfo &info) {
    auto env = info.Env();
    auto fun = info[0].As<Function>();
    auto fun2 = utils::CallbackList::GetInstance()["logs"];
    const char *_a = "Hello World";
    // args.push_back(String::New(fun->Env(), a));
    fun.Call(env.Global(), {
        Number::New(env, int(2)),
        String::New(env, _a)
    });
    fun2->Value().Call(env.Global(), {
        Number::New(env, int(2)),
        String::New(env, _a)
    });
    // scope->~EscapableHandleScope();
    // fun->MakeCallback(obj, args, nullptr);
}

Object Create(const CallbackInfo &info) {
    auto env = info.Env();
    auto returner = Object::New(env);
    auto sdk = Object::New(env);
    bool lossless = true;
    auto clientId = info[0].As<Napi::BigInt>().Int64Value(&lossless);
    auto flags = info[1].As<Number>().Int64Value();
    auto result = discord::Core::Create(clientId, flags, &utils::core);
    returner.Set("status", Number::New(env, int(result)));
    if (result != discord::Result::Ok) {
        returner.Set("sdk", env.Null());
        return returner;
    }
    utils::core->SetLogHook(discord::LogLevel::Debug, Logger);
    sdk.Set("run_callbacks", Function::New(env, RunCallbacks));
    sdk.Set("set_log_hook", Function::New(env, SetLogHook));
    sdk.Set("tl", Function::New(env, TestLoggerCB));
    returner.Set("sdk", sdk);
    utils::coreCreated = true;
    return returner;
}

void myExit() {
    if (utils::coreCreated) {
        utils::core->~Core();
    }
    utils::CallbackList::GetInstance().~CallbackList();
}

void myExit(int) {
    myExit();
    utils::CallbackList::GetInstance().onProgramExit();
    utils::CallbackList::GetInstance().~CallbackList();
}

Object Init(Env env, Object exports) {
    std::cout << "starting\n";
    exports.Set("hello", Function::New(env, Hello));
    exports.Set("hello_obj", Function::New(env, HelloObject));
    exports.Set("create", Function::New(env, Create));
    std::atexit(myExit);
    std::at_quick_exit(myExit);
    std::signal(SIGABRT, myExit);
    return exports;
}

NODE_API_MODULE(dgsdk_node, Init)
