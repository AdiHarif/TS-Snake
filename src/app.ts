
import { Position } from "./basic_types.js";
import { Snake } from "./snake.js";
import { Board , CellContent } from "./board.js";
import { initInput, pending_direction } from "./input.js"

class Game {
	private snake: Snake;
	private board: Board;
	private last_frame_timestamp: number;
	private board_element: HTMLElement;

	constructor(board_size: number, private snake_speed: number) {
		this.board = new Board(board_size);
		this.snake = new Snake(this.board);
		this.last_frame_timestamp = 0;
		this.board_element = document.getElementById('board');

		this.board.placeApple();
	}
	
	update(this: Game): void {
		this.snake.updateDirection(pending_direction);
		this.snake.advance();
	}

	private drawCell(this:Game, pos: Position): void {
		const element: HTMLElement = document.createElement('div');
		element.style.gridRowStart = (pos.row + 1).toString();
		element.style.gridColumnStart = (pos.col + 1).toString();
		const element_type: CellContent = this.board.cells[pos.row][pos.col];
		switch (element_type) {
			case CellContent.SNAKE: {
				element.classList.add('snake');
				break;
			}
			case CellContent.SNAKE_HEAD:{
				element.classList.add('snake-head');
				break;
			}
			case CellContent.APPLE:{
				element.classList.add('apple');
				break;
			}
		}
		this.board_element.appendChild(element);
	}
	
	draw(this: Game): void {
		this.board_element.innerHTML = '';
		this.snake.locations.forEach((pos:Position) => { this.drawCell(pos);});
		this.drawCell(this.board.getApplePosition());
	}
	
	private gameLoop(this:Game, current_time: number): void {
		window.requestAnimationFrame((time:number) => this.gameLoop(time));
		const frame_duration: number = (current_time - this.last_frame_timestamp) / 1000;
		if (frame_duration < 1 / this.snake_speed) {
			return;
		}
		this.last_frame_timestamp = current_time;
		this.update();
		this.draw();
	}
	
	start() {
		this.gameLoop(0);
	}
}

let game: Game;

const board_size: number = 21;
const snake_speed: number = 10;

function main(): void {
	initInput();
	game = new Game(board_size, snake_speed);
	game.start();
}

main();
