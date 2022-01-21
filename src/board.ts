
import { Position } from "./basic_types.js";

export enum CellContent {
	FREE,
	SNAKE,
	SNAKE_HEAD,
	APPLE
}

export type Board = {
	cells: CellContent[][];
	apple_position: Position;
}

export function getCellContent(board: Board, position: Position): CellContent {
	return board.cells[position[0]][position[1]];
}

const board_size: number = 21; //TODO: add as a field in board struct

export function placeApple(board: Board): void {
	let new_pos: Position;
	let new_pos_content: CellContent;
	do {
		new_pos = [
			Math.round(Math.random() * (board_size - 1)),
			Math.round(Math.random() * (board_size - 1))
		]
		new_pos_content = board.cells[new_pos[0]][new_pos[1]];
	} while (new_pos_content == CellContent.SNAKE || new_pos_content == CellContent.SNAKE_HEAD);
	board.apple_position = new_pos;
	board.cells[new_pos[0]][new_pos[1]] = CellContent.APPLE;
}
