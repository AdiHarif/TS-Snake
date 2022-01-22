import { Position, Direction, oppositeDirections } from "./basic_types.js";
import { CellContent } from "./board.js";
export class Snake {
    constructor(board) {
        this.board = board;
        let init_pos = Math.round(board.size / 2);
        this.locations = [
            new Position(init_pos, init_pos),
            new Position(init_pos, init_pos - 1),
            new Position(init_pos, init_pos - 2)
        ];
        this.direction = Direction.EAST;
        this.board.cells[init_pos][init_pos] = CellContent.SNAKE_HEAD;
        this.board.cells[init_pos][init_pos - 1] = CellContent.SNAKE;
        this.board.cells[init_pos][init_pos - 2] = CellContent.SNAKE;
    }
    nextPosition() {
        let row = this.head().row;
        let col = this.head().col;
        switch (this.direction) {
            case Direction.NORTH: {
                row--;
                break;
            }
            case Direction.EAST: {
                col++;
                break;
            }
            case Direction.SOUTH: {
                row++;
                break;
            }
            case Direction.WEST: {
                col--;
                break;
            }
        }
        let size = this.board.size;
        row = (row + size) % size;
        col = (col + size) % size;
        return new Position(row, col);
    }
    tail() {
        return this.locations[this.locations.length - 1];
    }
    head() {
        return this.locations[0];
    }
    updateDirection(new_direction) {
        if (!oppositeDirections(new_direction, this.direction)) {
            this.direction = new_direction;
        }
    }
    advance() {
        const next_cell = this.nextPosition();
        const next_cell_content = this.board.content(next_cell);
        const grow = (next_cell_content == CellContent.APPLE);
        if (next_cell_content == CellContent.SNAKE && !this.tail().Equals(next_cell)) {
            window.alert('Game Over! git gud');
            window.stop();
            location.reload();
        }
        if (!grow) {
            let tail_position = this.tail();
            this.board.cells[tail_position.row][tail_position.col] = CellContent.FREE;
            this.locations.pop();
        }
        const head_next_position = this.nextPosition();
        const head_current_position = this.head();
        this.board.cells[head_current_position.row][head_current_position.col] = CellContent.SNAKE;
        this.board.cells[head_next_position.row][head_next_position.col] = CellContent.SNAKE_HEAD;
        this.locations.unshift(head_next_position);
        if (grow) {
            this.board.placeApple();
        }
    }
}
//# sourceMappingURL=snake.js.map