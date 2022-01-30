
import { Snake } from "./snake.js";
import { Board } from "./board.js";
import { pending_direction } from "./input.js"
import { clearCanvas, drawGame } from "./graphics.js";


export class Game {
	private snake: Snake;
	private board: Board;
	private last_frame_timestamp: number;
	private paused: Boolean = false;
	private score = 0;

	constructor(board_size: number, private snake_speed: number) {
		this.board = new Board(board_size);
		this.snake = new Snake(this.board);
		this.last_frame_timestamp = 0;

		this.board.placeApple();
	}
	
	update(this: Game): void {
		this.snake.updateDirection(pending_direction);
		let apple_eaten: boolean = this.snake.advance();
		if (apple_eaten) {
			this.score += 10;
		}
	}
	
	private gameLoop(this:Game, current_time: number): void {
		window.requestAnimationFrame((time:number) => this.gameLoop(time));
		const frame_duration: number = (current_time - this.last_frame_timestamp) / 1000;
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
	
	start(this: Game) {
		this.gameLoop(0);
	}

	handlePause(this: Game): void {
		this.paused = !this.paused;
	}

	getBoard(this: Game): Board {
		return this.board;
	}

	getScore(this: Game): number {
		return this.score;
	}
}