
import { Position } from "./basic_types.js";

export enum CellContent {
	FREE,
	SNAKE,
	SNAKE_HEAD,
	APPLE
}

export class Board {
	cells: CellContent[][];
	private apple_position: Position;

	constructor(public readonly size: number) {
		this.cells = [];
		for (let i = 0; i < size; i++){
			let new_row: CellContent[] = [];
			for (let j = 0; j < size; j++){
				new_row.push(CellContent.FREE);
			}
			this.cells.push(new_row);
		}
	}
	
	content(this: Board, position: Position): CellContent {
		return this.cells[position.row][position.col];
	}

	placeApple(this: Board): void {
		let new_pos: Position;
		let new_pos_content: CellContent;
		do {
			new_pos = new Position(
				Math.round(Math.random() * (this.size - 1)),
				Math.round(Math.random() * (this.size - 1))
			);
			new_pos_content = this.cells[new_pos.row ][new_pos.col];
		} while (new_pos_content != CellContent.FREE);
		this.cells[new_pos.row][new_pos.col] = CellContent.APPLE;
		this.apple_position = new_pos;
	}

	getApplePosition(this: Board) {
		return this.apple_position;
	}
}
