export class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    Equals(pos) { return this.row == pos.row && this.col == pos.col; }
}
export var Direction;
(function (Direction) {
    // the numeric values are actually used in oppositeDirections function
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["EAST"] = 1] = "EAST";
    Direction[Direction["SOUTH"] = 2] = "SOUTH";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
export function oppositeDirections(dir1, dir2) {
    return (Math.abs(dir1 - dir2) == 2);
}
export var GameState;
(function (GameState) {
    GameState[GameState["PRE_START"] = 0] = "PRE_START";
    GameState[GameState["IN_GAME"] = 1] = "IN_GAME";
    GameState[GameState["GAME_OVER"] = 2] = "GAME_OVER";
})(GameState || (GameState = {}));
//# sourceMappingURL=basic_types.js.map