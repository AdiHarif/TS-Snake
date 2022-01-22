
import { Position, Direction, oppositeDirections } from "./basic_types.js";
import { Snake } from "./snake.js";
import { Board , CellContent } from "./board.js";


type Game = {
	snake: Snake;
	board: Board;
	last_frame_timestamp: number;
	board_element: HTMLElement;
}

let game: Game;

function update(game: Game): void {
	game.snake.updateDirection(pending_direction);
	game.snake.advance();

}

let pending_direction: Direction = Direction.EAST;

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

const board_size: number = 21;
const snake_speed: number = 10;

function initGame(): void {
	let game_board: Board = new Board(board_size);
	game = {
		snake: new Snake(game_board),
		board: game_board,
		last_frame_timestamp: 0,
		board_element: document.getElementById('board')
	}

	game.board.placeApple();
}

function drawCell(pos: Position): void {
	const element: HTMLElement = document.createElement('div');
	element.style.gridRowStart = (pos.row + 1).toString();
	element.style.gridColumnStart = (pos.col + 1).toString();
	const element_type: CellContent = game.board.cells[pos.row][pos.col];
	switch (element_type) {
		case CellContent.SNAKE: {
			element.classList.add('snake');
			break;
		}
		case CellContent.SNAKE_HEAD:{
			element.classList.add('snake-head');
			break;
		}
		case CellContent.APPLE:{
			element.classList.add('apple');
			break;
		}
	}
	game.board_element.appendChild(element);
}

function draw(game: Game): void {
	game.board_element.innerHTML = '';
	game.snake.locations.forEach(drawCell);
	drawCell(game.board.getApplePosition());
}

function gameLoop(current_time: number): void {
	window.requestAnimationFrame(gameLoop);
	const frame_duration: number = (current_time - game.last_frame_timestamp) / 1000;
	if (frame_duration < 1 / snake_speed) {
		return;
	}
	game.last_frame_timestamp = current_time;
	update(game);
	draw(game);
}

function main(): void {
	window.addEventListener('keydown', inputHandler);
	initGame();
	gameLoop(game.last_frame_timestamp);
}

main();
