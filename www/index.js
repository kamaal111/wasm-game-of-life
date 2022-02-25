import { Universe } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

let animationID = null;

const universe = Universe.new();
const { width: universeWidth, height: universeHeight } = universe;

const gameOfLifeCanvas = (() => {
  const canvas = document.getElementById("game-of-life-canvas");
  canvas.height = (CELL_SIZE + 1) * universeHeight + 1;
  canvas.width = (CELL_SIZE + 1) * universeWidth + 1;
  return canvas;
})();
const playPauseButton = document.getElementById("play-pause");
const randomizeButton = document.getElementById("randomize");
const killAllButton = document.getElementById("kill-all");
const ticksPerFrameSlider = document.getElementById("ticks-per-frame-slider");
const ticksPerFrameLabel = document.getElementById("ticks-per-frame-label");

const gameOfLifeCanvasContext = gameOfLifeCanvas.getContext("2d");

const renderLoop = () => {
  let ticksPerFrame = Number(ticksPerFrameSlider.value);
  if (Number.isNaN(ticksPerFrame)) ticksPerFrame = 1;

  for (let i = 0; i < ticksPerFrame; i += 1) {
    universe.tick();
  }

  drawGrid();
  drawCells();

  animationID = requestAnimationFrame(renderLoop);
};

const play = () => {
  playPauseButton.textContent = "⏸";
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = "▶";
  cancelAnimationFrame(animationID);
  animationID = null;
};

const isPaused = () => animationID === null;

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

const bitIsSet = (number, array) => {
  const byte = Math.floor(number / 8);
  const mask = 1 << number % 8;
  return (array[byte] & mask) === mask;
};

const drawCells = () => {
  const cellsPointer = universe.cells();

  const cells = new Uint8Array(
    memory.buffer,
    cellsPointer,
    (universeWidth * universeHeight) / 8
  );

  gameOfLifeCanvasContext.beginPath();

  for (let row = 0; row < universeHeight; row += 1) {
    for (let column = 0; column < universeWidth; column += 1) {
      const index = getIndex(row, column);

      if (bitIsSet(index, cells)) {
        gameOfLifeCanvasContext.fillStyle = ALIVE_COLOR;
      } else {
        gameOfLifeCanvasContext.fillStyle = DEAD_COLOR;
      }

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

gameOfLifeCanvas.addEventListener("click", (event) => {
  const boundingRect = gameOfLifeCanvas.getBoundingClientRect();

  const scaleX = gameOfLifeCanvas.width / boundingRect.width;
  const scaleY = gameOfLifeCanvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const row = Math.min(
    Math.floor(canvasTop / (CELL_SIZE + 1)),
    universeHeight - 1
  );
  const column = Math.min(
    Math.floor(canvasLeft / (CELL_SIZE + 1)),
    universeWidth - 1
  );

  universe.toggle_cell(row, column);

  drawGrid();
  drawCells();
});

playPauseButton.addEventListener("click", (_event) => {
  if (isPaused()) play();
  else pause();
});

randomizeButton.addEventListener("click", (_event) => {
  pause();

  universe.randomize_cells();

  universe.tick();

  drawGrid();
  drawCells();
});

killAllButton.addEventListener("click", (_event) => {
  pause();

  universe.kill_all_cells();

  drawGrid();
  drawCells();
});

ticksPerFrameSlider.addEventListener("change", (event) => {
  const value = Number(event.target.value);
  if (Number.isNaN(value)) return;

  let textPrefix;
  if (value === 1) textPrefix = "1 tick";
  else textPrefix = `${value} ticks`;

  ticksPerFrameLabel.textContent = `${textPrefix} per frame`;
});

play();
