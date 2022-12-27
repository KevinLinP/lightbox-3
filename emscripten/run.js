const fs = require('fs');

const wasmBuffer = fs.readFileSync('program.wasm');

// https://vitejs.dev/guide/features.html#webassembly

WebAssembly.instantiate(wasmBuffer).then(obj => {
  // Exported function live under instance.exports
  const {loop} = obj.instance.exports;

  const ledsPointer = loop();
  
  const ints = new Uint8Array(obj.instance.exports.memory.buffer, ledsPointer);

  const leds = [
    [ints[0], ints[1], ints[2]],
    [ints[3], ints[4], ints[5]],
  ]

  console.log(leds);
});
