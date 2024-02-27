export type CellState = 0 | 1; // 0 for dead, 1 for alive

export function createBlankGrid(rows: number, cols: number): CellState[][] {
	const grid: CellState[][] = [];
	for (let row = 0; row < rows; row++) {
		const newRow: CellState[] = [];
		for (let col = 0; col < cols; col++) {
			newRow.push(0);
		}
		grid.push(newRow);
	}
	return grid;
}
// Function to create a 2D grid with random cell states
function createRandomGrid(rows: number, cols: number): CellState[][] {
	const grid: CellState[][] = [];
	for (let row = 0; row < rows; row++) {
		const newRow: CellState[] = [];
		for (let col = 0; col < cols; col++) {
			newRow.push(Math.random() > 0.5 ? 1 : 0); // 50% chance of being alive
		}
		grid.push(newRow);
	}
	return grid;
}

export function patternSlider(rows: number, cols: number): CellState[][] {
	const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(0));
	grid[1][2] = 1;
	grid[2][3] = 1;
	grid[3][1] = 1;
	grid[3][2] = 1;
	grid[3][3] = 1;
	return grid;
}

export function patternPulsar(rows: number, cols: number): CellState[][] {
	const pulsar = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
	const centerRow = Math.floor(rows / 2);
	const centerColumn = Math.floor(cols / 2);
	// Set the pulsar pattern in the grid
	pulsar[centerRow - 1][centerColumn - 2] = 1;
	pulsar[centerRow - 1][centerColumn + 2] = 1;
	pulsar[centerRow - 1][centerColumn - 3] = 1;
	pulsar[centerRow - 1][centerColumn + 3] = 1;
	pulsar[centerRow + 1][centerColumn - 3] = 1;
	pulsar[centerRow + 1][centerColumn + 3] = 1;
	pulsar[centerRow - 2][centerColumn - 1] = 1;
	pulsar[centerRow - 2][centerColumn] = 1;
	pulsar[centerRow - 2][centerColumn + 1] = 1;
	pulsar[centerRow + 2][centerColumn - 1] = 1;
	pulsar[centerRow + 2][centerColumn] = 1;
	pulsar[centerRow + 2][centerColumn + 1] = 1;
	return pulsar;
}
export function patternBlinker(rows: number, cols: number): CellState[][] {
	const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(0));
	grid[2][1] = 1;
	grid[2][2] = 1;
	grid[2][3] = 1;
	return grid;
}
// Function to compute the next generation of the grid based on Conway's rules
export function computeNextGeneration(grid: CellState[][]): CellState[][] {
	const numRows = grid.length;
	const numCols = grid[0].length;

	// Create a copy of the grid to store the next generation
	const newGrid: CellState[][] = [];

	// Loop through each cell in the grid
	for (let row = 0; row < numRows; row++) {
		const newRow: CellState[] = [];
		for (let col = 0; col < numCols; col++) {
			// Count live neighbors, considering wraparound behavior
			let liveNeighbors = 0;
			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					// Skip the current cell
					if (i === 0 && j === 0) continue;

					const newRowPos = (row + i + numRows) % numRows;
					const newColPos = (col + j + numCols) % numCols;

					// Check if the neighbor cell is alive
					if (grid[newRowPos][newColPos] === 1) {
						liveNeighbors++;
					}
				}
			}

			const isAlive = grid[row][col];

			// Apply Game of Life rules
			if (isAlive && (liveNeighbors < 2 || liveNeighbors > 3)) {
				// Any live cell with fewer than two live neighbors or more than three live neighbors dies
				newRow.push(0);
			} else if (!isAlive && liveNeighbors === 3) {
				// Any dead cell with exactly three live neighbors becomes a live cell
				newRow.push(1);
			} else {
				// All other live cells remain alive, and all other dead cells remain dead
				newRow.push(isAlive);
			}
		}
		newGrid.push(newRow);
	}

	return newGrid;
}

// Function to count the number of live neighbors for a cell
function countLiveNeighbors(grid: CellState[][], row: number, col: number): number {
	const numRows = grid.length;
	const numCols = grid[0].length;
	let count = 0;

	const neighbors = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1]
	];

	for (const [dx, dy] of neighbors) {
		const newRow = row + dx;
		const newCol = col + dy;

		if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
			count += grid[newRow][newCol];
		}
	}

	return count;
}

export { createRandomGrid };
// export type { CellState };
