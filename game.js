import { Snake } from "./snake.js";
import { Board } from "./board.js";
import { pending_direction } from "./input.js";
import { clearCanvas, drawGame } from "./graphics.js";
export class Game {
    constructor(board_size, snake_speed) {
        this.snake_speed = snake_speed;
        this.paused = false;
        this.score = 0;
        this.board = new Board(board_size);
        this.snake = new Snake(this.board);
        this.last_frame_timestamp = 0;
        this.board.placeApple();
    }
    update() {
        this.snake.updateDirection(pending_direction);
        let apple_eaten = this.snake.advance();
        if (apple_eaten) {
            this.score += 10;
        }
    }
    gameLoop(current_time) {
        window.requestAnimationFrame((time) => this.gameLoop(time));
        const frame_duration = (current_time - this.last_frame_timestamp) / 1000;
        if (frame_duration < 1 / this.snake_speed) {
            return;
        }
        if (this.paused) {
            return;
        }
        this.last_frame_timestamp = current_time;
        this.update();
        clearCanvas();
        drawGame(this);
    }
    start() {
        this.gameLoop(0);
    }
    handlePause() {
        this.paused = !this.paused;
    }
    getBoard() {
        return this.board;
    }
    getScore() {
        return this.score;
    }
}
//# sourceMappingURL=game.js.map