import { Direction } from "./basic_types.js";
import { Snake } from "./snake.js";
import { Board, CellContent } from "./board.js";
let game;
function update(game) {
    game.snake.updateDirection(pending_direction);
    game.snake.advance();
}
let pending_direction = Direction.EAST;
function inputHandler(event) {
    switch (event.key) {
        case 'ArrowUp':
            pending_direction = Direction.NORTH;
            break;
        case 'ArrowRight':
            pending_direction = Direction.EAST;
            break;
        case 'ArrowDown':
            pending_direction = Direction.SOUTH;
            break;
        case 'ArrowLeft':
            pending_direction = Direction.WEST;
            break;
    }
}
const board_size = 21;
const snake_speed = 10;
function initGame() {
    let game_board = new Board(board_size);
    game = {
        snake: new Snake(game_board),
        board: game_board,
        last_frame_timestamp: 0,
        board_element: document.getElementById('board')
    };
    game.board.placeApple();
}
function drawCell(pos) {
    const element = document.createElement('div');
    element.style.gridRowStart = (pos.row + 1).toString();
    element.style.gridColumnStart = (pos.col + 1).toString();
    const element_type = game.board.cells[pos.row][pos.col];
    switch (element_type) {
        case CellContent.SNAKE: {
            element.classList.add('snake');
            break;
        }
        case CellContent.SNAKE_HEAD: {
            element.classList.add('snake-head');
            break;
        }
        case CellContent.APPLE: {
            element.classList.add('apple');
            break;
        }
    }
    game.board_element.appendChild(element);
}
function draw(game) {
    game.board_element.innerHTML = '';
    game.snake.locations.forEach(drawCell);
    drawCell(game.board.getApplePosition());
}
function gameLoop(current_time) {
    window.requestAnimationFrame(gameLoop);
    const frame_duration = (current_time - game.last_frame_timestamp) / 1000;
    if (frame_duration < 1 / snake_speed) {
        return;
    }
    game.last_frame_timestamp = current_time;
    update(game);
    draw(game);
}
function main() {
    window.addEventListener('keydown', inputHandler);
    initGame();
    gameLoop(game.last_frame_timestamp);
}
main();
//# sourceMappingURL=app.js.map