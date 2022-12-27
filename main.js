import './style.css'

import init from './emscripten/program.wasm?init'

async function runWebassembly() {
  const instance = await init()
  // console.log(instance.exports);
  const {loop} = instance.exports;

  const ledsPointer = loop();
  const ints = new Uint8Array(instance.exports.memory.buffer, ledsPointer);

  const leds = [
    [ints[0], ints[1], ints[2]],
    [ints[3], ints[4], ints[5]],
  ]

  console.log(leds);
}

runWebassembly();


