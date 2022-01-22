
import { Position, Direction } from "./basic_types.js";
import { Board, CellContent } from "./board.js";

export type Snake = {
	locations: Position[];
	direction: Direction;
	speed: number;
}

const board_size: number = 21; //TODO: add as a field in snake struct

export function getHeadsNextPosition(snake: Snake): Position {
	let current_position: Position = new Position(snake.locations[0].row, snake.locations[0].col);
	switch (snake.direction) {
		case Direction.NORTH: {
			current_position.row--;
			break;
		}
		case Direction.EAST: {
			current_position.col++;
			break;
		}
		case Direction.SOUTH: {
			current_position.row++;
			break;
		}
		case Direction.WEST: {
			current_position.col--;
			break;
		}
	}
	current_position.row = (current_position.row + board_size) % board_size;
	current_position.col = (current_position.col + board_size) % board_size;
	return current_position;
}

export function getTail(snake: Snake): Position {
	return snake.locations[snake.locations.length - 1];
}

export function advanceSnake(snake: Snake, board: Board, grow: boolean): void {
	if (!grow) {
		let tail_position: Position = getTail(snake);
		board.cells[tail_position.row][tail_position.col] = CellContent.FREE;
		snake.locations.pop();
	}
	const head_next_position: Position = getHeadsNextPosition(snake);
	const head_current_position =  snake.locations[0];
	board.cells[head_current_position.row][head_current_position.col] = CellContent.SNAKE;
	board.cells[head_next_position.row][head_next_position.col] = CellContent.SNAKE_HEAD;
	snake.locations.unshift(head_next_position);
}
