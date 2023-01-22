#include "napi.h"
#include "discord_sdk/discord.h"
#include <map>
#include <string>
#include <iostream>

#include "./utils.h"
namespace utils {
    discord::Core *core;
    bool coreCreated = false;
};

utils::CallbackList *utils::CallbackList::instance = nullptr;

utils::CallbackList &utils::CallbackList::GetInstance() {
    if (instance == nullptr) {
        instance = new CallbackList();
    }
    return *instance;
}

Napi::FunctionReference *utils::CallbackList::get(std::string index) {
    return callbacks[index];
}

void utils::CallbackList::set(std::string index, Napi::Function value) {
    if (this->has(index)) {
        auto old_ref = callbacks[index];
        callbacks.erase(index);
        old_ref->Unref();
    }
    auto new_ref = Napi::Persistent(value);
    std::cout << new_ref.Ref();
    callbacks[index] = &new_ref;
    new_ref.SuppressDestruct();
    auto env = value.Env();
}

bool utils::CallbackList::has(std::string index){
    return callbacks.contains(index);
}

const Napi::FunctionReference *utils::CallbackList::operator[](std::string index){
    return callbacks[index];
}

void utils::CallbackList::onProgramExit() {
    for (auto a : callbacks) {
        try {
            a.second->Reset();
        } catch (...) {}
        try {
            a.second->~FunctionReference();
        } catch (...) {}
    }
}
