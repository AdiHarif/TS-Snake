
type Position = [number, number];

enum Direction {
	NORTH,
	EAST,
	SOUTH,
	WEST
}

type Snake = {
	locations: Position[];
	direction: Direction;
	speed: number;
}

enum CellContent {
	FREE,
	SNAKE,
	APPLE
}

type Board = {
	cells: CellContent[][];
	apple_position: Position;
}

type Game = {
	snake: Snake;
	board: Board;
	last_frame_timestamp: number;
	board_element: HTMLElement;
}

let game: Game;

function getHeadsNextPosition(snake: Snake): Position {
	let current_position: Position = [...snake.locations[0]];
	switch (snake.direction) {
		case Direction.NORTH: {
			current_position[0]--;
			break;
		}
		case Direction.EAST: {
			current_position[1]++;
			break;
		}
		case Direction.SOUTH: {
			current_position[0]++;
			break;
		}
		case Direction.WEST: {
			current_position[1]--;
			break;
		}
	}
	return current_position;

}

function getCellContent(board: Board, position: Position): CellContent {
	return board.cells[position[0]][position[1]];
}

function advanceSnake(snake: Snake, board: Board, grow: boolean): void {
	if (!grow) {
		let tail_position: Position = getTail(snake);
		board.cells[tail_position[0]][tail_position[1]] = CellContent.FREE;
		snake.locations.pop();
	}
	let head_next_position: Position = getHeadsNextPosition(snake);
	snake.locations.unshift(head_next_position);
	board.cells[head_next_position[0]][head_next_position[1]] = CellContent.SNAKE;
}

function positionEquals(pos1: Position, pos2: Position): boolean {
	return pos1[0] == pos2[0] && pos1[1] == pos2[1];
}

function getTail(snake: Snake): Position {
	return [...snake.locations[snake.locations.length - 1]];
}

function update(game: Game): void {
	let next_cell: Position = getHeadsNextPosition(game.snake);
	let next_cell_content: CellContent = getCellContent(game.board, next_cell);
	let grow: boolean = false;
	if (next_cell_content ==  CellContent.APPLE) {
		grow = true;
	}
	else if (next_cell_content == CellContent.SNAKE && !positionEquals(getTail(game.snake), next_cell)) {
		//handle game over
	}
	advanceSnake(game.snake, game.board, grow);
}

function inputHandler(event: KeyboardEvent): void {
	switch (event.key) {
		case 'ArrowUp':
			game.snake.direction = Direction.NORTH;
			break;
		case 'ArrowRight':
			game.snake.direction = Direction.EAST;
			break;
		case 'ArrowDown':
			game.snake.direction = Direction.SOUTH;
			break;
		case 'ArrowLeft':
			game.snake.direction = Direction.WEST;
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
				[init_pos, init_pos],
				[init_pos, init_pos - 1],
				[init_pos, init_pos - 2]
			],
			direction: Direction.EAST,
			speed: 3
		},
		board: {
			cells: cells,
			apple_position: [0, 0]
		},
		last_frame_timestamp: 0,
		board_element: document.getElementById('board')
	}

	game.board.cells[init_pos][init_pos] = CellContent.SNAKE;
	game.board.cells[init_pos][init_pos - 1] = CellContent.SNAKE;
	game.board.cells[init_pos][init_pos - 2] = CellContent.SNAKE;

	let apple_pos: Position;
	do {
		apple_pos = [
			Math.round(Math.random() * board_size),
			Math.round(Math.random() * board_size)
		]
	} while (game.board.cells[apple_pos[0]][apple_pos[1]] == CellContent.SNAKE);
	game.board.apple_position = apple_pos;
	game.board.cells[apple_pos[0]][apple_pos[1]] = CellContent.APPLE;
}

function drawCell(pos: Position): void {
	const element: HTMLElement = document.createElement('div');
	element.style.gridRowStart = (pos[1] + 1).toString();
	element.style.gridColumnStart = (pos[0] + 1).toString();
	const element_type: CellContent = game.board.cells[pos[0]][pos[1]];
	if (element_type == CellContent.SNAKE) {
		element.classList.add('snake');
	}
	else if (element_type == CellContent.APPLE) {
		element.classList.add('apple');
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
