
import { Position, Direction, oppositeDirections } from "./basic_types.js";
import { Snake, getHeadsNextPosition, getTail, advanceSnake } from "./snake.js";
import { Board , CellContent, getCellContent, placeApple } from "./board.js";


type Game = {
	snake: Snake;
	board: Board;
	last_frame_timestamp: number;
	board_element: HTMLElement;
}

let game: Game;

function update(game: Game): void {
	if (!oppositeDirections(pending_direction, game.snake.direction)) {
		game.snake.direction = pending_direction;
	}
	let next_cell: Position = getHeadsNextPosition(game.snake);
	let next_cell_content: CellContent = getCellContent(game.board, next_cell);
	let grow: boolean = false;
	if (next_cell_content ==  CellContent.APPLE) {
		grow = true;
	}
	else if (next_cell_content == CellContent.SNAKE && getTail(game.snake).Equals(next_cell)) {
		window.alert('Game Over! git gud');
		location.reload();
	}
	advanceSnake(game.snake, game.board, grow);

	if (grow) {
		placeApple(game.board);
	}
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

function initGame(): void {

	let cells: CellContent[][] = [];
	for (let i = 0; i < board_size; i++){
		let new_row: CellContent[] = [];
		for (let j = 0; j < board_size; j++){
			new_row.push(CellContent.FREE);
		}
		cells.push(new_row);
	}

	const init_pos: number = Math.round(board_size / 2);

	game = {
		snake: {
			locations: [
				new Position(init_pos, init_pos),
				new Position(init_pos, init_pos - 1),
				new Position(init_pos, init_pos - 2)
			],
			direction: Direction.EAST,
			speed: 10
		},
		board: {
			cells: cells,
			apple_position: new Position(0, 0)
		},
		last_frame_timestamp: 0,
		board_element: document.getElementById('board')
	}

	game.board.cells[init_pos][init_pos] = CellContent.SNAKE_HEAD;
	game.board.cells[init_pos][init_pos - 1] = CellContent.SNAKE;
	game.board.cells[init_pos][init_pos - 2] = CellContent.SNAKE;

	placeApple(game.board);
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
	drawCell(game.board.apple_position);
}

function gameLoop(current_time: number): void {
	window.requestAnimationFrame(gameLoop);
	const frame_duration: number = (current_time - game.last_frame_timestamp) / 1000;
	if (frame_duration < 1 / game.snake.speed) {
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
