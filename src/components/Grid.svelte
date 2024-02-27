<script>
	import audioUtils from '$lib/audioUtils';
	import { rows, cols, gridStore, setGrid } from '$lib/stores/state';

	export let grid = Array.from({ length: $rows }, () => Array($cols).fill(false));

	// Function to handle cell toggle
	/**
	 * @param {number} row
	 * @param {number} col
	 */

	function cellToggle(row, col) {
		grid[row][col] = !grid[row][col];
		setGrid(grid);
	}
</script>

<div class="container p-4 flex content-center" style="--column:{$cols}">
	<div class="grid mx-auto">
		{#each grid as row, rowIndex}
			{#each row as cell, colIndex}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="cell {cell ? 'on' : ''}" on:click={() => cellToggle(rowIndex, colIndex)} />
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	:root {
		// @debug{coll}
		// --column: ${coll}; /* Set initial value based on columnCount */
	}
	.grid {
		grid-template-columns: repeat(var(--column), minmax(0, 1fr));
	}
	.cell {
		width: 30px;
		height: 30px;
		margin: 1px;
		background-color: #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.cell.on {
		background-color: #007acc; /* Change to your desired highlight color */
		color: white;
	}
</style>
