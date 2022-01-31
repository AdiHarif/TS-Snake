
export class Position {
	constructor(public row: number, public col: number) {}

	Equals(this: Position, pos: Position) { return this.row  == pos.row  && this.col == pos.col; }
}

export enum Direction {
	// the numeric values are actually used in oppositeDirections function
	NORTH = 0,
	EAST = 1,
	SOUTH = 2,
	WEST = 3
}

export function oppositeDirections(dir1: Direction, dir2: Direction): boolean {
	return (Math.abs(dir1 - dir2) == 2);
}

export enum GameState {
	PRE_START,
	IN_GAME,
	GAME_OVER
}
