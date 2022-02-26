import { Universe } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

import Profiler from "./profiler";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const profiler = new Profiler("fps");

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
    drawGrid(this.universe, this.canvasContext);
    drawCells(this.universe, this.canvasContext);
  }

  killAllCells() {
    this.pause();
    this.universe.kill_all_cells();
    drawGrid(this.universe, this.canvasContext);
    drawCells(this.universe, this.canvasContext);
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

    drawGrid(this.universe, this.canvasContext);
    drawCells(this.universe, this.canvasContext);
  }

  renderLoop(ticksPerFrame) {
    profiler.render();

    if (Number.isNaN(ticksPerFrame)) ticksPerFrame = 1;

    for (let i = 0; i < ticksPerFrame; i += 1) {
      this.universe.tick();
    }

    drawGrid(this.universe, this.canvasContext);
    drawCells(this.universe, this.canvasContext);

    this.animationID = requestAnimationFrame((_animationFrame) =>
      this.renderLoop(ticksPerFrame)
    );
  }
}

const getIndex = (row, column, width) => row * width + column;

const bitIsSet = (number, array) => {
  const byte = Math.floor(number / 8);
  const mask = 1 << number % 8;
  return (array[byte] & mask) === mask;
};

const drawCells = (universe, canvasContext) => {
  const cellsPointer = universe.cells();
  const { height, width } = universe;
  const cells = new Uint8Array(
    memory.buffer,
    cellsPointer,
    (width * height) / 8
  );

  canvasContext.beginPath();

  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      const index = getIndex(row, column, width);

      if (bitIsSet(index, cells)) {
        canvasContext.fillStyle = ALIVE_COLOR;
      } else {
        canvasContext.fillStyle = DEAD_COLOR;
      }

      canvasContext.fillRect(
        column * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  canvasContext.stroke();
};

const drawGrid = (universe, canvasContext) => {
  canvasContext.beginPath();
  canvasContext.strokeStyle = GRID_COLOR;

  const { height, width } = universe;

  // Vertical lines.
  for (let i = 0; i <= width; i += 1) {
    canvasContext.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    canvasContext.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let i = 0; i <= height; i += 1) {
    canvasContext.moveTo(0, i * (CELL_SIZE + 1) + 1);
    canvasContext.lineTo((CELL_SIZE + 1) * width + 1, i * (CELL_SIZE + 1) + 1);
  }

  canvasContext.stroke();
};

export default Simulation;
