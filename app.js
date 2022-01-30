import { initInput } from "./input.js";
import { initCanvas } from "./graphics.js";
import { Game } from "./game.js";
const BOARD_SIZE = 21;
const snake_speed = 10;
function main() {
    initCanvas();
    let game = new Game(BOARD_SIZE, snake_speed);
    initInput(game);
    game.start();
}
main();
//# sourceMappingURL=app.js.map