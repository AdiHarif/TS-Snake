
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
	
}

function getCellContent(board: Board, position: Position): CellContent {

}

function advanceSnake(snake: Snake, grow: boolean): void {

}

function positionEquals(pos1: Position, pos2: Position): boolean {

}

function getTail(snake:Snake): Position {

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
	advanceSnake(game.snake, grow);
}


