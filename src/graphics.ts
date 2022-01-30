
import { Position } from "./basic_types.js";
import { Board, CellContent } from "./board.js"
import { Game } from "./game.js"

const GRID_COLOR: string = "LightSkyBlue";
const SNAKE_COLOR: string = "lawngreen";
const SNAKE_HEAD_COLOR: string = "green";
const APPLE_COLOR: string = "red";
const BORDER_COLOR: string = "black";
const BACKGROUNG_COLOR: string = "white";
const SCORE_COLOR: string = "black";

const SCORE_FONT_NAME: string = "monospace";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let board_size: number;
let board_start: number;
let board_end: number;
let cell_size: number;

export function initCanvas(): void {
	canvas = <HTMLCanvasElement>document.getElementById('canvas');
	resizeCanvas();
	ctx = canvas.getContext("2d");
}

export function clearCanvas(): void {
	resizeCanvas();
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	ctx.fillStyle = BACKGROUNG_COLOR;
	ctx.fillRect(0, 0, canvas.height, canvas.width);
}

function resizeCanvas(){
	const window_size: number = Math.min(window.innerHeight, window.innerWidth);
	canvas.height = window_size;
	canvas.width = window_size;
	cell_size = window_size / (board_size + 2);
	board_start = cell_size;
	board_end = window_size - cell_size;
}

function drawLine(x1: number, y1: number, x2: number, y2: number, color: string, width: number): void {
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawGrid(): void {
	let canvas_size: number = canvas.width;
	let interval: number =  cell_size;
	for (let i = 1; i < board_size; i++) {
		let line_pos = board_start + (interval * i);
		drawLine(line_pos, board_start, line_pos, board_end, GRID_COLOR, 1);
		drawLine(board_start, line_pos, board_end, line_pos, GRID_COLOR, 1);
	}
}

function fillCell(row: number, col: number, content: CellContent): void {
	let y: number  = board_start + (row * cell_size);
	let x: number  = board_start + (col * cell_size);
	let color: string;
	switch (content) {
		case CellContent.SNAKE: {
			color = SNAKE_COLOR;
			break;
		}
		case CellContent.SNAKE_HEAD:{
			color = SNAKE_HEAD_COLOR;
			break;
		}
		default: {
			return;
		}
	}

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cell_size, cell_size);
	ctx.lineWidth = 3;
	ctx.strokeStyle = BORDER_COLOR;
	ctx.strokeRect(x, y, cell_size, cell_size);
}

function drawApple(row: number, col: number): void {
	let y: number  = board_start + ((row + 0.5) * cell_size);
	let x: number  = board_start + ((col + 0.5) * cell_size);
	let radius: number = cell_size / 3;

	ctx.beginPath();
	ctx.fillStyle = APPLE_COLOR;
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = BORDER_COLOR;
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

function drawBorder(): void {
	ctx.strokeStyle = BORDER_COLOR;
	ctx.lineWidth = 5;
	const board_pixel_width: number = board_size * cell_size;
	ctx.strokeRect(board_start, board_start, board_pixel_width, board_pixel_width);
}

function drawScore(score: number): void {
	ctx.font = (cell_size * 0.8) + "px " + SCORE_FONT_NAME;
	ctx.fillStyle = SCORE_COLOR;
	ctx.textAlign = "left";
	ctx.fillText("Score: " + score, 0, board_start * 0.8);
}

function drawBoard(board: Board): void {
	board_size = board.size;
	drawGrid();
	drawBorder();
	for (let i = 0; i < board_size; i++){
		for (let j = 0; j < board_size; j++){
			fillCell(i, j, board.content(new Position(i,j)));
		}
	}
	drawApple(board.getApplePosition().row, board.getApplePosition().col);
}

export function drawGame(game: Game): void {
	drawBoard(game.getBoard());
	drawScore(game.getScore());
}