import './style.css'

import init from './emscripten/program.wasm?init'

async function runWebassembly() {
  const instance = await init()
  // console.log(instance.exports);

  const {setup, loop} = instance.exports;
  const ledsPointer = setup();

  const ints = new Uint8Array(instance.exports.memory.buffer, ledsPointer);

  window.setInterval(() => {
    loop();
    const leds = [
      [ints[0], ints[1], ints[2]],
      [ints[3], ints[4], ints[5]],
      [ints[6], ints[7], ints[8]],
    ]
    console.log(leds);
  }, 100)
}

runWebassembly();


