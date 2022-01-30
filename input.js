import { Direction } from "./basic_types.js";
export let pending_direction;
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
        case 'p':
            game_inst.handlePause();
    }
}
let game_inst;
export function initInput(game) {
    pending_direction = Direction.EAST;
    game_inst = game;
    window.addEventListener('keydown', inputHandler);
}
//# sourceMappingURL=input.js.map