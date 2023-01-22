#include "discord_sdk/discord.h"
#include "napi.h"
#include <map>
#include <vector>
#include <string>

namespace utils {
    extern discord::Core *core;
    extern bool coreCreated;

    class CallbackList {
        private:
            std::map<std::string, Napi::FunctionReference*> callbacks;
            static CallbackList *instance;
            CallbackList(){};

        public:
            ~CallbackList() {}
            CallbackList(CallbackList const &) = delete;
            void operator=(CallbackList const &) = delete;
            static CallbackList &GetInstance();
            Napi::FunctionReference *get(std::string index);
            void set(std::string index, Napi::Function value);
            bool has(std::string index);
            const Napi::FunctionReference *operator[](std::string index);
            void onProgramExit();
    };
};
