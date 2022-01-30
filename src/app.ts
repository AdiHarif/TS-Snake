
import { initInput } from "./input.js"
import { initCanvas } from "./graphics.js";
import { Game } from "./game.js";

const BOARD_SIZE: number = 21;
const snake_speed: number = 10;

function main(): void {
	initInput();
	initCanvas();
	let game: Game = new Game(BOARD_SIZE, snake_speed);
	game.start();
}

main();
