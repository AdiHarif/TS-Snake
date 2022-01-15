
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
}

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
	return [...snake.locations[-1]];
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


