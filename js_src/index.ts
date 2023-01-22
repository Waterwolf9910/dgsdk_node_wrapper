import _main = require("bindings")
import types = require("./types")
let main = _main("dgsdk_node.node")

class ArgumentError extends Error {

}
/**
 * Types and Descriptions come from https://discord.com/developers/docs/game-sdk/sdk-starter-guide
 * This is also a great place to learn how to use the sdk
 */
export = {
    /**
     * A One of the tests to make sure the library is working correctly
     * @returns 'world'
     */
    hello: (): string => {
        return main.hello();
    },
    create: (clientId: bigint, flags = types.CreateFlags.NoRequireDiscord): types.create_return => {
        // console.log(flags)
        if (!clientId) {
            throw new ArgumentError("clientId cannot be nul;")
        } else if (typeof clientId !== "bigint") {
            throw new TypeError("clientId must be a bigint")
        }
        let returner = main.create(clientId, flags)
        let sdk = returner.sdk != null ? new SDK(returner.sdk) : null
        return { status: returner.status, sdk }
    },
    ...types
}

class SDK implements types.sdk {

    #_sdk: types.sdk
    run_callbacks() {
        return this.#_sdk.run_callbacks();
    }

    set_log_hook(level: types.LogLevel, logger: (level: types.LogLevel, msg: string) => any) {
        return this.#_sdk.set_log_hook(level, logger)
    }

    tl(a: () => any) {
        return this.#_sdk.tl(a)
    };

    constructor(sdk: types.sdk) {
        this.#_sdk = sdk
    }

    
}

