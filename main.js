import * as d3 from "d3";

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

  const svg = d3.select('#led-svg').attr('viewBox', '0 0 1200 900').style('background-color', 'black');
  const ledContainer = svg.select('#led-container').attr('transform', 'translate(37, 37)'); // .style('filter', 'url(#blur)');

  // const svg = d3.select("#leds");
  console.log(svg);

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

    const rowGroups = ledContainer.selectAll('g').data(leds);
    rowGroups.enter().append('g').attr('transform', (d, i) => {return `translate(0, ${i * 100})`});

    const squares = rowGroups.merge(rowGroups).selectAll('rect').data((d) => { return d;});
    squares.enter().append('rect').attr('width', 25).attr('height', 25).attr('x', (d, i) => {return i * 100;});
    squares.merge(squares).attr('fill', (d) => {
      return `rgb(${d[0]}, ${d[1]}, ${d[2]})`;
    });
  }, 1000 / 30)
}

runWebassembly();


