const bytecode = require('wasm_bg');

const wasmModule = new WebAssembly.Module(bytecode);

const imports: any = {};

//有关 Emscripten 允许环境，请参见:
// https://github.com/WebAssembly/tool-conventions/blob/master/DynamicLinking.md
imports.env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
};

const wasmInstance = new WebAssembly.Instance(wasmModule, imports);

export function loop() {
    console.log(Memory.creeps)
    console.log(_)
    // if (wasmInstance && wasmInstance.exports) {
    if (wasmInstance) {
        /** @ts-ignore */
        const num = wasmInstance.exports.say()
        console.log(`from wasm : ${num}`)
    }
}