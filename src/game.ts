
import { Snake } from "./snake.js";
import { Board } from "./board.js";
import { pending_direction, waitForRestart } from "./input.js"
import { clearCanvas, drawGame } from "./graphics.js";
import { GameState } from "./basic_types.js";


export class Game {
	private snake: Snake;
	private board: Board;
	private last_frame_timestamp: number;
	private state: GameState = GameState.PRE_START;
	private paused: boolean = false;
	private score = 0;

	constructor(private readonly board_size: number, private snake_speed: number) {
		this.board = new Board(board_size);
		this.snake = new Snake(this.board);
		this.last_frame_timestamp = 0;

		this.board.placeApple();
	}
	
	private update(this: Game): void {
		this.snake.updateDirection(pending_direction);
		this.snake.advance(this);
	}
	
	private gameLoop(this:Game, current_time: number): void {
		window.requestAnimationFrame((time:number) => this.gameLoop(time));
		if (this.state == GameState.GAME_OVER) {
			waitForRestart();
			return
		}
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
	
	start(this: Game): void {
		this.state = GameState.IN_GAME;
		this.score = 0;
		this.gameLoop(0);
	}

	restart(this: Game): void {
		this.board = new Board(this.board_size);
		this.snake = new Snake(this.board);
		
		this.board.placeApple();
		
		this.start();
	}

	end(this: Game): void {
		this.state = GameState.GAME_OVER;
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

	addScore(this: Game): void {
		this.score += 10;
	}

	getState(this: Game): GameState {
		return this.state;
	}
}