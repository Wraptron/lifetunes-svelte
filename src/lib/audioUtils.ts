class AudioUtil {
	audioContext: AudioContext;
	oscillator: OscillatorNode;
	buffer: AudioBuffer | null;
	primaryGain!: GainNode;

	// Calculate note frequencies for 5 octaves (C to B notes)

	constructor(context: AudioContext) {
		// console.log('Audio Object initialized');
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

	playSound(frequency: number, type: OscillatorType) {
		this.oscillator.type = type; // You can change the waveform type here (sine, square, sawtooth, triangle, etc.)
		this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
		// this.oscillator.frequency.linearRampToValueAtTime(0.1, 0.5);
		// this.oscillator.gain.exponentialRampToValueAtTime(0.0001, 0.5);
		const gainNode = this.audioContext.createGain();
		gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.001, 0.2);
		this.oscillator.connect(gainNode);
		gainNode.connect(this.audioContext.destination);

		this.oscillator.stop(this.audioContext.currentTime + 0.2); // Stop the note after 0.5 seconds (adjust duration as needed)
	}
}

export default AudioUtil;
