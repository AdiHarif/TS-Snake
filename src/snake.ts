
import { Position, Direction } from "./basic_types.js";
import { Board, CellContent } from "./board.js";

export type Snake = {
	locations: Position[];
	direction: Direction;
	speed: number;
}

const board_size: number = 21; //TODO: add as a field in snake struct

export function getHeadsNextPosition(snake: Snake): Position {
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
	current_position = [
		(current_position[0] + board_size) % board_size,
		(current_position[1] + board_size) % board_size
	]
	return current_position;
}

export function getTail(snake: Snake): Position {
	return [...snake.locations[snake.locations.length - 1]];
}

export function advanceSnake(snake: Snake, board: Board, grow: boolean): void {
	if (!grow) {
		let tail_position: Position = getTail(snake);
		board.cells[tail_position[0]][tail_position[1]] = CellContent.FREE;
		snake.locations.pop();
	}
	const head_next_position: Position = getHeadsNextPosition(snake);
	const head_current_position =  snake.locations[0];
	board.cells[head_current_position[0]][head_current_position[1]] = CellContent.SNAKE;
	board.cells[head_next_position[0]][head_next_position[1]] = CellContent.SNAKE_HEAD;
	snake.locations.unshift(head_next_position);
}
