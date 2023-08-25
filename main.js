import * as d3 from "d3";

import './style.css'
import init from './emscripten/program.wasm?init'

// TODO
// [x] add frametimes/fps counter

const FPS = 60
let counter = 0
let width = 0
let height = 0
let numLeds = 0
let leds1d = []
let leds = []

const svg = d3.select('#led-svg').attr('viewBox', '0 0 1200 900').style('background-color', 'black');
const ledContainer = svg.select('#led-container').attr('transform', 'translate(37, 37)'); // .style('filter', 'url(#blur)');

function updateSvg(ints) {
  const leds1d = []
  for (var i = 0; i < numLeds; i++) {
    const start = i * 3;
    const led = ints.slice(start, start + 3);
    leds1d[i] = led
  }

  for (var y = 0; y < height; y++) {
    const start = y * width
    leds[y] = leds1d.slice(start, start + width)
  }

  const rowGroups = ledContainer.selectAll('g').data(leds)
  rowGroups.enter().append('g').attr('transform', (d, i) => {return `translate(0, ${i * 100})`})

  const squares = rowGroups.merge(rowGroups).selectAll('rect').data((d) => { return d;})
  squares.enter().append('rect').attr('width', 25).attr('height', 25).attr('x', (d, i) => {return i * 100;})
  squares.merge(squares).attr('fill', (d) => {
    return `rgb(${d[0]}, ${d[1]}, ${d[2]})`
  })
}

function updateCounter() {
  counter += 1;
  document.getElementById('counter').innerHTML = counter;
}

async function runWebassembly() {
  const instance = await init()
  // console.log(instance.exports);
  const program = instance.exports

  width = program.get_width()
  height = program.get_height()
  numLeds = width * height
  const ledsPointer = program.get_leds_pointer();
  const ints = new Uint8Array(instance.exports.memory.buffer, ledsPointer);

  program.setup();

  window.setInterval(() => {
    program.loop();
    updateSvg(ints);
    updateCounter()
  }, 1000 / FPS)
}

runWebassembly();


