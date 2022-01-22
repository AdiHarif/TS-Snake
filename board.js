import { Position } from "./basic_types.js";
export var CellContent;
(function (CellContent) {
    CellContent[CellContent["FREE"] = 0] = "FREE";
    CellContent[CellContent["SNAKE"] = 1] = "SNAKE";
    CellContent[CellContent["SNAKE_HEAD"] = 2] = "SNAKE_HEAD";
    CellContent[CellContent["APPLE"] = 3] = "APPLE";
})(CellContent || (CellContent = {}));
export class Board {
    constructor(size) {
        this.size = size;
        this.cells = [];
        for (let i = 0; i < size; i++) {
            let new_row = [];
            for (let j = 0; j < size; j++) {
                new_row.push(CellContent.FREE);
            }
            this.cells.push(new_row);
        }
    }
    content(position) {
        return this.cells[position.row][position.col];
    }
    placeApple() {
        let new_pos;
        let new_pos_content;
        do {
            new_pos = new Position(Math.round(Math.random() * (this.size - 1)), Math.round(Math.random() * (this.size - 1)));
            new_pos_content = this.cells[new_pos.row][new_pos.col];
        } while (new_pos_content != CellContent.FREE);
        this.cells[new_pos.row][new_pos.col] = CellContent.APPLE;
        this.apple_position = new_pos;
    }
    getApplePosition() {
        return this.apple_position;
    }
}
//# sourceMappingURL=board.js.map