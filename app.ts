
type Position = [number, number];

enum Direction {
	NORTH,
	EAST,
	SOUTH,
	WEST
};

type Snake = {
	locations: Position[];
	direction: Direction;
};

enum CellContent {
	FREE,
	SNAKE,
	APPLE
};

type Board = {
	cells: CellContent[][];
	apple_position: Position;
};

type Game = {
	snake: Snake;
	board: Board;
};