
import { Direction } from "./basic_types.js"

export let pending_direction: Direction;

function inputHandler(event: KeyboardEvent): void {
	switch (event.key) {
		case 'ArrowUp':
			pending_direction = Direction.NORTH;
			break;
		case 'ArrowRight':
			pending_direction = Direction.EAST;
			break;
		case 'ArrowDown':
			pending_direction = Direction.SOUTH;
			break;
		case 'ArrowLeft':
			pending_direction = Direction.WEST;
			break;
	}
}

export function initInput(): void {
	pending_direction = Direction.EAST;
	window.addEventListener('keydown', inputHandler);	
}