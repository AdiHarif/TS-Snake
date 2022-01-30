
import { Position } from "./basic_types.js";
import { Board, CellContent } from "./board.js"

const GRID_COLOR: string = "LightSkyBlue";
const SNAKE_COLOR: string = "lawngreen";
const SNAKE_HEAD_COLOR: string = "green";
const APPLE_COLOR: string = "red";
const BORDER_COLOR: string = "black";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let board_size: number;

export function initCanvas(): void {
	canvas = <HTMLCanvasElement>document.getElementById('canvas');
	resizeCanvas();
	ctx = canvas.getContext("2d");
}

export function clearCanvas(): void {
	resizeCanvas();
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.height, canvas.width);
}

function resizeCanvas(){
	let size: number = Math.min(window.innerHeight, window.innerWidth);
	canvas.height = size;
	canvas.width = size;
}

function drawLine(x1: number, y1: number, x2: number, y2: number): void {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawGrid(): void {
	let canvas_size: number = canvas.width;
	let interval: number =  canvas_size / board_size;
	ctx.strokeStyle = GRID_COLOR;
	ctx.lineWidth = 1;
	for (let i = 1; i < board_size; i++) {
		let line_pos = interval * i;
		drawLine(line_pos, 0, line_pos, canvas_size);
		drawLine(0, line_pos, canvas_size, line_pos);
	}
}

function fillCell(row: number, col: number, content: CellContent): void {
	let rect_size: number =  canvas.width / board_size;
	let y: number  = row * rect_size;
	let x: number  = col * rect_size;
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
	ctx.fillRect(x, y, rect_size, rect_size);
	ctx.lineWidth = 3;
	ctx.strokeStyle = BORDER_COLOR;
	ctx.strokeRect(x, y, rect_size, rect_size);
}

function drawApple(row: number, col: number): void {
	let rect_size: number =  canvas.width / board_size;
	let y: number  = (row + 0.5) * rect_size;
	let x: number  = (col + 0.5) * rect_size;
	let radius: number = rect_size / 3;

	ctx.beginPath();
	ctx.fillStyle = APPLE_COLOR;
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = BORDER_COLOR;
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
}

export function drawBoard(board: Board): void {
	board_size = board.size;
	drawGrid();
	for (let i = 0; i < board_size; i++){
		for (let j = 0; j < board_size; j++){
			fillCell(i, j, board.content(new Position(i,j)));
		}
	}
	drawApple(board.getApplePosition().row, board.getApplePosition().col);
}