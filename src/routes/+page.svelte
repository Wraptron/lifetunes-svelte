<script lang="ts">
	import Controller from '../components/Controller.svelte';
	import Grid from '../components/Grid.svelte';
	import { isPlaying, tempo, gridStore, filter, oscillator } from '$lib/stores/state';
	import { computeNextGeneration } from '$lib/gameOfLife';
	import { onMount, onDestroy } from 'svelte';
	import AudioUtil from '$lib/audioUtils';

	onMount(() => {});

	$: {
		playPauseControl($isPlaying, $tempo);
	}

	/**
	 * @type {number}
	 */
	var interval: number | undefined;

	/**
	 * @param {boolean} playStatus
	 * @param {number} playbackSpeed
	 */

	function playPauseControl(playStatus: boolean, playbackSpeed: number) {
		let time = 6000 / playbackSpeed;

		if (playStatus) {
			interval = setInterval(() => {
				middleC();
				$gridStore = computeNextGeneration($gridStore);
			}, time);
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
					melody.playSound(1975.52 / ((i + 1) * 1.06), $oscillator as OscillatorType);
				}
			}
		}
	}
</script>

<div class="container mx-auto">
	<Grid grid={$gridStore} />
	<Controller />
</div>

<style>
	/* :global(body) {
		background-color: black;
	} */
</style>
