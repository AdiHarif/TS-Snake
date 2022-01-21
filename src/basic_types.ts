
export type Position = [number, number];

export function positionEquals(pos1: Position, pos2: Position): boolean {
	return pos1[0] == pos2[0] && pos1[1] == pos2[1];
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
