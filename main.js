import './style.css'

import init from './emscripten/program.wasm?init'

const WIDTH = 9;
const HEIGHT = 7;
const NUM_LEDS = WIDTH * HEIGHT;

async function runWebassembly() {
  const instance = await init()
  // console.log(instance.exports);

  const {setup, loop} = instance.exports;
  const ledsPointer = setup();

  const ints = new Uint8Array(instance.exports.memory.buffer, ledsPointer);

  window.setInterval(() => {
    loop();

    const leds1d = []
    for (var i = 0; i < NUM_LEDS; i++) {
      const start = i * 3;
      const led = ints.slice(start, start + 3);
      leds1d.push(led)
    }

    const leds = [];
    for (var y = 0; y < HEIGHT; y++) {
      const start = y * WIDTH;
      leds.push(leds1d.slice(start, start + WIDTH))
    }

    console.log(leds);
  }, 1000)
}

runWebassembly();


