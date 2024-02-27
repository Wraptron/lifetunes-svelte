<script>
	// Import store update functions
	import {
		rows,
		cols,
		tempo,
		pattern,
		oscillator,
		setPlay,
		setPause,
		setTempo,
		gridStore,
		filter,
		setSelectedOscillator,
		setSelectedColor
	} from '$lib/stores/state';

	import {
		createRandomGrid,
		createBlankGrid,
		patternSlider as patternGlider,
		patternBlinker,
		patternPulsar
	} from '$lib/gameOfLife';

	// Define local component state
	// let tempo = 120;
	// let pattern = '1';
	// let oscillator = 'sine';
	// let color = '';

	// Function to update tempo in the store
	/**
	 * @param {{ target: { value: number; }; }} event
	 */
	function updateTempo(event) {
		// console.log(event.target.value);
		setTempo(event.target.value);
	}

	// Function to update selected pattern in the store

	/**
	 * @param {any} event
	 */
	function updateSelectedPattern(event) {
		switch ($pattern) {
			case '0': {
				$gridStore = createBlankGrid($rows, $cols);
				break;
			}
			case '1': {
				$gridStore = createRandomGrid($rows, $cols);
				break;
			}
			case '2': {
				$gridStore = patternGlider($rows, $cols);
				break;
			}
			case '3': {
				$gridStore = patternBlinker($rows, $cols);
				break;
			}
			case '4': {
				$gridStore = patternPulsar($rows, $cols);
				break;
			}
		}
	}

	// function filterType(event){
	// 	switch($filter){
	// 		case 'kick':

	// 	}
	// }

	// Function to update selected oscillator in the store
	/**
	 * @param {{ target: { value: string; }; }} event
	 */
	function updateSelectedOscillator(event) {
		setSelectedOscillator(event.target.value);
	}

	// Function to update selected color in the store
	/**
	 * @param {{ target: { value: string; }; }} event
	 */
	function updateSelectedColor(event) {
		setSelectedColor(event.target.value);
	}
</script>

<div class="container flex flex-col p-4">
	<!-- Center Audio and create a button -->
	<div class="flex justify-center">
		<!-- Play button -->
		<button
			on:click={setPlay}
			class="rounded-full mx-4 text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
		>
			<img class="w-20 h-20" alt="play" src="/images/play.svg" />
		</button>
		<!-- Pause button -->
		<button
			on:click={setPause}
			class="rounded-full mx-4 text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
		>
			<img class="w-20 h-20" alt="pause" src="/images/pause.svg" />
		</button>
	</div>

	<div>
		<!-- Tempo input -->
		<label for="tempo-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Time / Tempo
		</label>
		<input
			id="tempo-range"
			type="range"
			min="30"
			max="244"
			step="1"
			bind:value={$tempo}
			class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
		/>
		<p>Tempo: {$tempo} BPM</p>
	</div>

	<div>
		<!-- Pattern select -->
		<label
			for="initial_pattern"
			class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>
			Initial pattern
		</label>
		<select
			id="initial_pattern"
			bind:value={$pattern}
			on:change={updateSelectedPattern}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Choose an option</option>
			<option value="0">Blank</option>
			<option value="1">Random</option>
			<option value="2">Glider</option>
			<option value="3">Blinker</option>
			<option value="4">Pulsar</option>
		</select>
	</div>
	<div>
		<!-- Oscillator select -->
		<label
			for="oscillator_type"
			class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>
			Oscillator
		</label>
		<select
			id="oscillator_type"
			bind:value={$oscillator}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Choose an option</option>
			<option value="sine">Sine</option>
			<option value="square">Square</option>
			<option value="sawtooth">Sawtooth</option>
			<option value="triangle">Triangle</option>
		</select>
	</div>

	<div>
		<!-- Color picker input -->
		<!-- <label for="color_picker" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Color picker
		</label>
		<input
			type="color"
			id="color_picker"
			bind:value={$color}
			on:input={() => updateSelectedColor}
		/> -->
	</div>
	<div>
		<label for="filter" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			Filter
		</label>

		<select
			id="filter_type"
			bind:value={$filter}
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			<option selected>Choose an option</option>
			<option value="kick">Kick Drum</option>
			<option value="white">White Noise</option>
		</select>
	</div>
</div>
