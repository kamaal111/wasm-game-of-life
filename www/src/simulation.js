import { Universe } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

class Simulation {
  constructor(canvasID) {
    const universe = Universe.new();
    this.universe = universe;

    const canvas = document.getElementById(canvasID);
    canvas.height = (CELL_SIZE + 1) * universe.height + 1;
    canvas.width = (CELL_SIZE + 1) * universe.width + 1;
    this.canvas = canvas;
    this.canvasContext = canvas.getContext("2d");
  }

  get universeWidth() {
    return this.universe.width;
  }

  get universeHeight() {
    return this.universe.height;
  }

  get isPaused() {
    return this.animationID === null;
  }

  play(ticksPerFrame) {
    this.renderLoop(ticksPerFrame);
  }

  pause() {
    cancelAnimationFrame(this.animationID);
    this.animationID = null;
  }

  togglePlay(ticksPerFrame) {
    if (this.isPaused) this.play(ticksPerFrame);
    else this.pause();
  }

  pauseAndRandomize() {
    this.pause();
    this.universe.randomize_cells();
    this.universe.tick();
    this.drawGrid();
    this.drawCells();
  }

  killAllCells() {
    this.pause();
    this.universe.kill_all_cells();
    this.drawGrid();
    this.drawCells();
  }

  onCanvasClick(event) {
    const boundingRect = this.canvas.getBoundingClientRect();

    const scaleX = this.canvas.width / boundingRect.width;
    const scaleY = this.canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(
      Math.floor(canvasTop / (CELL_SIZE + 1)),
      this.universeHeight - 1
    );
    const column = Math.min(
      Math.floor(canvasLeft / (CELL_SIZE + 1)),
      this.universeWidth - 1
    );

    if (event.metaKey) {
      this.universe.insert_glider(row, column);
    } else if (event.shiftKey) {
      this.universe.insert_pulsar(row, column);
    } else {
      this.universe.toggle_cell(row, column);
    }

    this.drawGrid();
    this.drawCells();
  }

  renderLoop(ticksPerFrame) {
    if (Number.isNaN(ticksPerFrame)) ticksPerFrame = 1;

    for (let i = 0; i < ticksPerFrame; i += 1) {
      this.universe.tick();
    }

    this.drawGrid();
    this.drawCells();

    this.animationID = requestAnimationFrame(() =>
      this.renderLoop(ticksPerFrame)
    );
  }

  drawGrid() {
    this.canvasContext.beginPath();
    this.canvasContext.strokeStyle = GRID_COLOR;

    // Vertical lines.
    for (let i = 0; i <= this.universeWidth; i += 1) {
      this.canvasContext.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      this.canvasContext.lineTo(
        i * (CELL_SIZE + 1) + 1,
        (CELL_SIZE + 1) * this.universeHeight + 1
      );
    }

    // Horizontal lines.
    for (let i = 0; i <= this.universeHeight; i += 1) {
      this.canvasContext.moveTo(0, i * (CELL_SIZE + 1) + 1);
      this.canvasContext.lineTo(
        (CELL_SIZE + 1) * this.universeWidth + 1,
        i * (CELL_SIZE + 1) + 1
      );
    }

    this.canvasContext.stroke();
  }

  drawCells() {
    const cellsPointer = this.universe.cells();

    const cells = new Uint8Array(
      memory.buffer,
      cellsPointer,
      (this.universeWidth * this.universeHeight) / 8
    );

    this.canvasContext.beginPath();

    for (let row = 0; row < this.universeHeight; row += 1) {
      for (let column = 0; column < this.universeWidth; column += 1) {
        const index = this.getIndex(row, column);

        if (this.bitIsSet(index, cells)) {
          this.canvasContext.fillStyle = ALIVE_COLOR;
        } else {
          this.canvasContext.fillStyle = DEAD_COLOR;
        }

        this.canvasContext.fillRect(
          column * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    }

    this.canvasContext.stroke();
  }

  getIndex(row, column) {
    return row * this.universeWidth + column;
  }

  bitIsSet(number, array) {
    const byte = Math.floor(number / 8);
    const mask = 1 << number % 8;
    return (array[byte] & mask) === mask;
  }
}

export default Simulation;
