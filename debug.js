/**
 * @type {import("./js_src/index")}
*/
let index = require("./lib/index")
let rl = require("readline").createInterface(process.stdin)

let lib = index.create(949651579085131826n, index.CreateFlags.Default)
let loop = true
let gstatus = lib.status

rl.on("line", () => {
    loop = false;
})

if (lib.status == index.Result.Ok) {
    let { status, sdk } = lib
    sdk.set_log_hook(index.LogLevel.Debug, (lvl, msg) => {
        console.log(`${lvl} ${msg}`)
    })
}
setTimeout(() => {
    if (lib.status == index.Result.Ok && loop) {
        let { sdk } = lib
        sdk.tl(() => {
            console.log("Hello World")
        })
    }
}, 4000)
// Simulate a game loop
let inv = setInterval(() => {
    if(lib.status == index.Result.Ok && loop) {
        let {status, sdk} = lib
        //@ts-ignore
        lib.status = sdk.run_callbacks();
        if (status != index.Result.Ok) {
            return;
        }
    } else {
        clearInterval(inv)
        inv.unref()
        process.exit()
    }
}, 50)

inv.ref()
