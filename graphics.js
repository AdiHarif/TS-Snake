import { GameState, Position } from "./basic_types.js";
import { CellContent } from "./board.js";
const GRID_COLOR = "LightSkyBlue";
const SNAKE_COLOR = "lawngreen";
const SNAKE_HEAD_COLOR = "green";
const APPLE_COLOR = "red";
const BORDER_COLOR = "black";
const BACKGROUNG_COLOR = "white";
const SCORE_COLOR = "black";
const POPUP_COLOR = "Beige";
const POPUP_TEXT_COLOR = "black";
const SCORE_FONT_NAME = "monospace";
const POPUP_FONT_NAME = "monospace";
let canvas;
let ctx;
let board_size;
let board_start;
let board_end;
let cell_size;
let board_pixel_width;
export function initCanvas() {
    canvas = document.getElementById('canvas');
    resizeCanvas();
    ctx = canvas.getContext("2d");
}
export function clearCanvas() {
    resizeCanvas();
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.fillStyle = BACKGROUNG_COLOR;
    ctx.fillRect(0, 0, canvas.height, canvas.width);
}
function resizeCanvas() {
    const window_size = Math.min(window.innerHeight, window.innerWidth);
    canvas.height = window_size;
    canvas.width = window_size;
    cell_size = window_size / (board_size + 2);
    board_start = cell_size;
    board_end = window_size - cell_size;
    board_pixel_width = board_size * cell_size;
}
function drawLine(x1, y1, x2, y2, color, width) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function drawGrid() {
    let interval = cell_size;
    for (let i = 1; i < board_size; i++) {
        let line_pos = board_start + (interval * i);
        drawLine(line_pos, board_start, line_pos, board_end, GRID_COLOR, 1);
        drawLine(board_start, line_pos, board_end, line_pos, GRID_COLOR, 1);
    }
}
function fillCell(row, col, content) {
    let y = board_start + (row * cell_size);
    let x = board_start + (col * cell_size);
    let color;
    switch (content) {
        case CellContent.SNAKE: {
            color = SNAKE_COLOR;
            break;
        }
        case CellContent.SNAKE_HEAD: {
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
function drawApple(row, col) {
    let y = board_start + ((row + 0.5) * cell_size);
    let x = board_start + ((col + 0.5) * cell_size);
    let radius = cell_size / 3;
    ctx.beginPath();
    ctx.fillStyle = APPLE_COLOR;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = BORDER_COLOR;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
function drawBorder() {
    ctx.strokeStyle = BORDER_COLOR;
    ctx.lineWidth = 5;
    ctx.strokeRect(board_start, board_start, board_pixel_width, board_pixel_width);
}
function drawScore(score) {
    ctx.font = (cell_size * 0.8) + "px " + SCORE_FONT_NAME;
    ctx.fillStyle = SCORE_COLOR;
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 0, board_start * 0.8);
}
function drawBoard(board) {
    board_size = board.size;
    drawGrid();
    drawBorder();
    for (let i = 0; i < board_size; i++) {
        for (let j = 0; j < board_size; j++) {
            fillCell(i, j, board.content(new Position(i, j)));
        }
    }
    drawApple(board.getApplePosition().row, board.getApplePosition().col);
}
function drawGameOverMessage(score) {
    const popup_width = 15 * cell_size;
    const popup_height = 3 * cell_size;
    const popup_x = (canvas.width / 2) - (popup_width / 2);
    const popup_y = (canvas.height / 2) - (popup_height / 2);
    ctx.beginPath();
    ctx.fillStyle = POPUP_COLOR;
    ctx.fillRect(popup_x, popup_y, popup_width, popup_height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = BORDER_COLOR;
    ctx.strokeRect(popup_x, popup_y, popup_width, popup_height);
    const first_line_y = popup_y + cell_size;
    ctx.font = (cell_size * 0.8) + "px " + POPUP_FONT_NAME;
    ctx.fillStyle = POPUP_TEXT_COLOR;
    ctx.textAlign = "center";
    ctx.fillText("Game Over! Your score: " + score, canvas.width / 2, first_line_y);
    const second_line_y = popup_y + (2 * cell_size);
    ctx.font = (cell_size * 0.5) + "px " + POPUP_FONT_NAME;
    ctx.fillText("Press any key to restart and git gud", canvas.width / 2, second_line_y);
}
export function drawGame(game) {
    drawBoard(game.getBoard());
    drawScore(game.getScore());
    if (game.getState() == GameState.GAME_OVER) {
        drawGameOverMessage(game.getScore());
    }
}
//# sourceMappingURL=graphics.js.map