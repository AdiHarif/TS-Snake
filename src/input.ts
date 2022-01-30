
import { Direction } from "./basic_types.js"
import { Game } from "./game.js";

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
		case 'p':
			game_inst.handlePause();
	}
}

let game_inst:Game;

export function initInput(game: Game): void {
	pending_direction = Direction.EAST;
	game_inst = game;
	window.addEventListener('keydown', inputHandler);	
}