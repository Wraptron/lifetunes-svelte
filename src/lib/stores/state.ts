// state.ts
import { writable } from 'svelte/store';
import { createRandomGrid, type CellState, createBlankGrid } from '$lib/gameOfLife';

//Defining the rows and columns of grid
export const rows = writable(12);
export const cols = writable(12);

// Define the initial state of the grid store
export const initialGrid: CellState[][] = createBlankGrid(12, 12);
export const gridStore = writable(initialGrid);

export const isPlaying = writable(false);
export const tempo = writable(30);
export const pattern = writable('0');
export const oscillator = writable('sine');
export const color = writable('#ff0000');
export const filter = writable('');

// Function to reset the grid to a random state
export function resetGrid() {
	gridStore.set(createRandomGrid(12, 12)); // Adjust the grid size as needed
}

// Function to update the grid in the store
export function setGrid(newGrid: CellState[][]): void {
	// console.log('Grid set' + newGrid);
	gridStore.set(newGrid);
}

// Functions to update the state
export function setPlay() {
	isPlaying.set(true);
}
export function setPause() {
	isPlaying.set(false);
}
export function setTempo(value: number) {
	tempo.set(value);
}

export function setSelectedPattern(value: string) {
	pattern.set(value);
}

export function setSelectedOscillator(value: string) {
	oscillator.set(value);
}

export function setSelectedColor(value: string) {
	color.set(value);
}
