import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe = Universe.new();
const { width: universeWidth, height: universeHeight } = universe;

const gameOfLifeCanvas = document.getElementById("game-of-life-canvas");
gameOfLifeCanvas.height = (CELL_SIZE + 1) * universeHeight + 1;
gameOfLifeCanvas.width = (CELL_SIZE + 1) * universeWidth + 1;

const gameOfLifeCanvasContext = gameOfLifeCanvas.getContext("2d");

const renderLoop = () => {
  universe.tick();

  drawGrid();
  drawCells();

  requestAnimationFrame(renderLoop);
};

const drawGrid = () => {
  gameOfLifeCanvasContext.beginPath();
  gameOfLifeCanvasContext.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= universeWidth; i += 1) {
    gameOfLifeCanvasContext.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    gameOfLifeCanvasContext.lineTo(
      i * (CELL_SIZE + 1) + 1,
      (CELL_SIZE + 1) * universeHeight + 1
    );
  }

  // Horizontal lines.
  for (let i = 0; i <= universeHeight; i += 1) {
    gameOfLifeCanvasContext.moveTo(0, i * (CELL_SIZE + 1) + 1);
    gameOfLifeCanvasContext.lineTo(
      (CELL_SIZE + 1) * universeWidth + 1,
      i * (CELL_SIZE + 1) + 1
    );
  }

  gameOfLifeCanvasContext.stroke();
};

const getIndex = (row, column) => row * universeWidth + column;

const drawCells = () => {
  const cellsPointer = universe.cells();
  const cells = new Uint8Array(
    memory.buffer,
    cellsPointer,
    universeWidth * universeHeight
  );

  gameOfLifeCanvasContext.beginPath();

  for (let row = 0; row < universeHeight; row += 1) {
    for (let column = 0; column < universeWidth; column += 1) {
      const index = getIndex(row, column);

      gameOfLifeCanvasContext.fillStyle =
        cells[index] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

      gameOfLifeCanvasContext.fillRect(
        column * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  gameOfLifeCanvasContext.stroke();
};

// requestAnimationFrame(renderLoop);
