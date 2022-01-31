import { Snake } from "./snake.js";
import { Board } from "./board.js";
import { pending_direction, waitForRestart } from "./input.js";
import { clearCanvas, drawGame } from "./graphics.js";
import { GameState } from "./basic_types.js";
export class Game {
    constructor(board_size, snake_speed) {
        this.board_size = board_size;
        this.snake_speed = snake_speed;
        this.state = GameState.PRE_START;
        this.paused = false;
        this.score = 0;
        this.board = new Board(board_size);
        this.snake = new Snake(this.board);
        this.last_frame_timestamp = 0;
        this.board.placeApple();
    }
    update() {
        this.snake.updateDirection(pending_direction);
        this.snake.advance(this);
    }
    gameLoop(current_time) {
        window.requestAnimationFrame((time) => this.gameLoop(time));
        if (this.state == GameState.GAME_OVER) {
            waitForRestart();
            return;
        }
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
        this.state = GameState.IN_GAME;
        this.score = 0;
        this.gameLoop(0);
    }
    restart() {
        this.board = new Board(this.board_size);
        this.snake = new Snake(this.board);
        this.board.placeApple();
        this.start();
    }
    end() {
        this.state = GameState.GAME_OVER;
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
    addScore() {
        this.score += 10;
    }
    getState() {
        return this.state;
    }
}
//# sourceMappingURL=game.js.map