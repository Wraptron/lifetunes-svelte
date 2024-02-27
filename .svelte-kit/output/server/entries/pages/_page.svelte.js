import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, d as each, v as validate_component, f as set_store_value } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
function createBlankGrid(rows2, cols2) {
  const grid = [];
  for (let row = 0; row < rows2; row++) {
    const newRow = [];
    for (let col = 0; col < cols2; col++) {
      newRow.push(0);
    }
    grid.push(newRow);
  }
  return grid;
}
function computeNextGeneration(grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const newGrid = [];
  for (let row = 0; row < numRows; row++) {
    const newRow = [];
    for (let col = 0; col < numCols; col++) {
      let liveNeighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0)
            continue;
          const newRowPos = (row + i + numRows) % numRows;
          const newColPos = (col + j + numCols) % numCols;
          if (grid[newRowPos][newColPos] === 1) {
            liveNeighbors++;
          }
        }
      }
      const isAlive = grid[row][col];
      if (isAlive && (liveNeighbors < 2 || liveNeighbors > 3)) {
        newRow.push(0);
      } else if (!isAlive && liveNeighbors === 3) {
        newRow.push(1);
      } else {
        newRow.push(isAlive);
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}
const rows = writable(12);
const cols = writable(12);
const initialGrid = createBlankGrid(12, 12);
const gridStore = writable(initialGrid);
const isPlaying = writable(false);
const tempo = writable(30);
const pattern = writable("0");
const oscillator = writable("sine");
const filter = writable("");
const Controller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_cols;
  let $$unsubscribe_rows;
  let $$unsubscribe_gridStore;
  let $$unsubscribe_pattern;
  let $tempo, $$unsubscribe_tempo;
  let $$unsubscribe_oscillator;
  let $$unsubscribe_filter;
  $$unsubscribe_cols = subscribe(cols, (value) => value);
  $$unsubscribe_rows = subscribe(rows, (value) => value);
  $$unsubscribe_gridStore = subscribe(gridStore, (value) => value);
  $$unsubscribe_pattern = subscribe(pattern, (value) => value);
  $$unsubscribe_tempo = subscribe(tempo, (value) => $tempo = value);
  $$unsubscribe_oscillator = subscribe(oscillator, (value) => value);
  $$unsubscribe_filter = subscribe(filter, (value) => value);
  $$unsubscribe_cols();
  $$unsubscribe_rows();
  $$unsubscribe_gridStore();
  $$unsubscribe_pattern();
  $$unsubscribe_tempo();
  $$unsubscribe_oscillator();
  $$unsubscribe_filter();
  return `<div class="container flex flex-col p-4"> <div class="flex justify-center"> <button class="rounded-full mx-4 text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" data-svelte-h="svelte-12ts4yx"><img class="w-20 h-20" alt="play" src="/images/play.svg"></button>  <button class="rounded-full mx-4 text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" data-svelte-h="svelte-m8ffg1"><img class="w-20 h-20" alt="pause" src="/images/pause.svg"></button></div> <div> <label for="tempo-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-1p5ilbe">Time / Tempo</label> <input id="tempo-range" type="range" min="30" max="244" step="1" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"${add_attribute("value", $tempo, 0)}> <p>Tempo: ${escape($tempo)} BPM</p></div> <div> <label for="initial_pattern" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-du7ub">Initial pattern</label> <select id="initial_pattern" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option selected value="Choose an option" data-svelte-h="svelte-12iuktg">Choose an option</option><option value="0" data-svelte-h="svelte-y8yrlg">Blank</option><option value="1" data-svelte-h="svelte-tgakj8">Random</option><option value="2" data-svelte-h="svelte-12p17d3">Glider</option><option value="3" data-svelte-h="svelte-13um6uc">Blinker</option><option value="4" data-svelte-h="svelte-19kt2b1">Pulsar</option></select></div> <div> <label for="oscillator_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-1ad9ect">Oscillator</label> <select id="oscillator_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option selected value="Choose an option" data-svelte-h="svelte-12iuktg">Choose an option</option><option value="sine" data-svelte-h="svelte-1mpn6cq">Sine</option><option value="square" data-svelte-h="svelte-bkgndu">Square</option><option value="sawtooth" data-svelte-h="svelte-ho9hji">Sawtooth</option><option value="triangle" data-svelte-h="svelte-1f5nbzi">Triangle</option></select></div> <div data-svelte-h="svelte-101n26y"> </div> <div><label for="filter" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" data-svelte-h="svelte-1ibvv5s">Filter</label> <select id="filter_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"><option selected value="Choose an option" data-svelte-h="svelte-12iuktg">Choose an option</option><option value="kick" data-svelte-h="svelte-4sg2ps">Kick Drum</option><option value="white" data-svelte-h="svelte-1k7ggja">White Noise</option></select></div></div>`;
});
class AudioUtil {
  audioContext;
  oscillator;
  buffer;
  primaryGain;
  // Calculate note frequencies for 5 octaves (C to B notes)
  constructor(context) {
    this.audioContext = context;
    this.buffer = null;
    this.oscillator = this.audioContext.createOscillator();
  }
  // getContext(): AudioContext {
  // 	return this.audioContext;
  // }
  // createOscillator(frequency: number, type: OscillatorType): OscillatorNode {
  // 	// console.log('Oscillator created');
  // 	this.oscillator.type = type; // You can change the type to other waveforms like 'sine', 'square', 'sawtooth', or 'triangle'.
  // 	this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
  // 	this.oscillator.start();
  // 	return this.oscillator;
  // }
  // createWhiteNoiseBuffer(length: number): AudioBuffer {
  // 	const bufferSize = this.audioContext.sampleRate * length;
  // 	const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
  // 	const data = buffer.getChannelData(0);
  // 	for (let i = 0; i < bufferSize; i++) {
  // 		data[i] = Math.random() * 2 - 1;
  // 	}
  // 	return buffer;
  // }
  // primaryGainControl() {
  // 	this.primaryGain = this.audioContext.createGain();
  // 	this.primaryGain.gain.setValueAtTime(1, 0);
  // }
  // setOscillatortype(oscillator: OscillatorType) {
  // 	this.oscillator.type = oscillator;
  // }
  // // Start the music
  // startSound() {
  // 	this.oscillator.start();
  // }
  // // Set the frequency of the oscillator
  // setFrequency(frequency: number) {
  // 	this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
  // }
  // // Set the volume (gain) of the oscillator
  // setVolume(volume: number) {
  // 	const gainNode = this.audioContext.createGain();
  // 	gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
  // 	this.oscillator.connect(gainNode);
  // 	gainNode.connect(this.audioContext.destination);
  // }
  // // Stop the sound
  // stopSound() {
  // 	this.oscillator.stop();
  // }
  // // Export tone
  // // tune() {
  // // 	const source = this.whiteNoise;
  // // 	// source.connect()
  // // }
  // // playSound(
  // // 	frequency: number,
  // // 	type: OscillatorType,
  // // 	duration: number,
  // // 	isWhiteNoise: boolean = false
  // // ): void {
  // // 	const source = this.audioContext.createBufferSource();
  // // 	if (isWhiteNoise) {
  // // 		const noiseBuffer = this.createWhiteNoiseBuffer(duration);
  // // 		source.buffer = noiseBuffer;
  // // 	}
  // // 	//  else {
  // // 	// 	const oscillator = this.createOscillator(frequency, type);
  // // 	// 	oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
  // // 	// 	source.setNodeValue(oscillator);
  // // 	// }
  // // 	source.connect(this.audioContext.destination);
  // // 	source.start();
  // // 	// Stop the sound after the specified duration
  // // 	source.stop(this.audioContext.currentTime + duration);
  // // }
  // // setNodeValue(node: AudioNode, param: AudioParam, value: number, time: number): void {
  // // 	param.setValueAtTime(value, time);
  // // 	node.connect(this.audioContext.destination);
  // // }
  // snareFilter(input: AudioNode, frequency: number, resonance: number): AudioNode {
  // 	const filter = this.audioContext.createBiquadFilter();
  // 	filter.type = 'bandpass';
  // 	filter.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
  // 	filter.Q.setValueAtTime(resonance, this.audioContext.currentTime);
  // 	input.connect(filter);
  // 	filter.connect(this.audioContext.destination);
  // 	return filter;
  // }
  // kickDrumFilter(input: AudioNode, frequency: number, resonance: number): AudioNode {
  // 	// console.log('Kickdrum called');
  // 	// const filter = this.audioContext.createBiquadFilter();
  // 	// filter.type = 'lowpass'; // Use a lowpass filter for a kick drum sound
  // 	// filter.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
  // 	// // filter.Q.setValueAtTime(resonance, this.audioContext.currentTime);
  // 	// filter.frequency.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
  // 	// const kickgain = this.audioContext.createGain();
  // 	// kickgain.gain.setValueAtTime(1, 0);
  // 	// kickgain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
  // 	// // this.primaryGain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
  // 	// // filter.connect(this.primaryGain);
  // 	// input.connect(filter);
  // 	// filter.connect(this.audioContext.destination);
  // 	return filter;
  // }
  play() {
    this.oscillator.start();
  }
  playSound(frequency, type) {
    this.oscillator.type = type;
    this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(1e-3, 0.2);
    this.oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    this.oscillator.stop(this.audioContext.currentTime + 0.2);
  }
}
const Grid_svelte_svelte_type_style_lang = "";
const css = {
  code: ".grid.svelte-o0h4um{grid-template-columns:repeat(var(--column), minmax(0, 1fr))}.cell.svelte-o0h4um{width:30px;height:30px;margin:1px;background-color:#eee;display:flex;align-items:center;justify-content:center;cursor:pointer}.cell.on.svelte-o0h4um{background-color:#007acc;color:white}",
  map: null
};
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $cols, $$unsubscribe_cols;
  let $rows, $$unsubscribe_rows;
  $$unsubscribe_cols = subscribe(cols, (value) => $cols = value);
  $$unsubscribe_rows = subscribe(rows, (value) => $rows = value);
  let { grid = Array.from({ length: $rows }, () => Array($cols).fill(false)) } = $$props;
  if ($$props.grid === void 0 && $$bindings.grid && grid !== void 0)
    $$bindings.grid(grid);
  $$result.css.add(css);
  $$unsubscribe_cols();
  $$unsubscribe_rows();
  return `<div class="container p-4 flex content-center" style="${"--column:" + escape($cols, true)}"><div class="grid mx-auto svelte-o0h4um">${each(grid, (row, rowIndex) => {
    return `${each(row, (cell, colIndex) => {
      return `  <div class="${"cell " + escape(cell ? "on" : "", true) + " svelte-o0h4um"}"></div>`;
    })}`;
  })}</div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $oscillator, $$unsubscribe_oscillator;
  let $gridStore, $$unsubscribe_gridStore;
  let $tempo, $$unsubscribe_tempo;
  let $isPlaying, $$unsubscribe_isPlaying;
  $$unsubscribe_oscillator = subscribe(oscillator, (value) => $oscillator = value);
  $$unsubscribe_gridStore = subscribe(gridStore, (value) => $gridStore = value);
  $$unsubscribe_tempo = subscribe(tempo, (value) => $tempo = value);
  $$unsubscribe_isPlaying = subscribe(isPlaying, (value) => $isPlaying = value);
  var interval;
  function playPauseControl(playStatus, playbackSpeed) {
    let time = 6e3 / playbackSpeed;
    if (playStatus) {
      interval = setInterval(
        () => {
          middleC();
          set_store_value(gridStore, $gridStore = computeNextGeneration($gridStore), $gridStore);
        },
        time
      );
    } else {
      clearInterval(interval);
      interval = 0;
    }
  }
  function middleC() {
    let melody = new AudioUtil(new AudioContext());
    melody.play();
    for (let i = 0; i < $gridStore.length; i++) {
      for (let j = 0; j < $gridStore[i].length; j++) {
        if ($gridStore[i][j]) {
          melody.playSound(1975.52 / ((i + 1) * 1.06), $oscillator);
        }
      }
    }
  }
  {
    {
      playPauseControl($isPlaying, $tempo);
    }
  }
  $$unsubscribe_oscillator();
  $$unsubscribe_gridStore();
  $$unsubscribe_tempo();
  $$unsubscribe_isPlaying();
  return `<div class="container mx-auto">${validate_component(Grid, "Grid").$$render($$result, { grid: $gridStore }, {}, {})} ${validate_component(Controller, "Controller").$$render($$result, {}, {}, {})} </div>`;
});
export {
  Page as default
};
