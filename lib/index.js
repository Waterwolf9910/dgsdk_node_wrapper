"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SDK__sdk;
const _main = require("bindings");
const types = require("./types");
let main = _main("dgsdk_node.node");
class ArgumentError extends Error {
}
class SDK {
    run_callbacks() {
        return __classPrivateFieldGet(this, _SDK__sdk, "f").run_callbacks();
    }
    set_log_hook(level, logger) {
        return __classPrivateFieldGet(this, _SDK__sdk, "f").set_log_hook(level, logger);
    }
    tl(a) {
        return __classPrivateFieldGet(this, _SDK__sdk, "f").tl(a);
    }
    ;
    constructor(sdk) {
        _SDK__sdk.set(this, void 0);
        __classPrivateFieldSet(this, _SDK__sdk, sdk, "f");
    }
}
_SDK__sdk = new WeakMap();
module.exports = Object.assign({ 
    /**
     * A One of the tests to make sure the library is working correctly
     * @returns 'world'
     */
    hello: () => {
        return main.hello();
    }, create: (clientId, flags = types.CreateFlags.NoRequireDiscord) => {
        // console.log(flags)
        if (!clientId) {
            throw new ArgumentError("clientId cannot be nul;");
        }
        else if (typeof clientId !== "bigint") {
            throw new TypeError("clientId must be a bigint");
        }
        let returner = main.create(clientId, flags);
        let sdk = returner.sdk != null ? new SDK(returner.sdk) : null;
        return { status: returner.status, sdk };
    } }, types);
