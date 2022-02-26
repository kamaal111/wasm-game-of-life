import Simulation from "./simulation";

const playPauseButton = document.getElementById("play-pause");
const randomizeButton = document.getElementById("randomize");
const killAllButton = document.getElementById("kill-all");
const ticksPerFrameSlider = document.getElementById("ticks-per-frame-slider");
const ticksPerFrameLabel = document.getElementById("ticks-per-frame-label");

const simulation = new Simulation("game-of-life-canvas");

simulation.canvas.addEventListener("click", (event) => {
  simulation.onCanvasClick(event);
});

playPauseButton.addEventListener("click", (_event) => {
  playPauseButton.textContent = !simulation.isPaused ? "▶" : "⏸";

  let ticksPerFrame = Number(ticksPerFrameSlider.value);
  if (Number.isNaN(ticksPerFrame)) ticksPerFrame = 1;
  simulation.togglePlay(ticksPerFrame);
});

randomizeButton.addEventListener("click", (_event) => {
  playPauseButton.textContent = "▶";
  simulation.pauseAndRandomize();
});

killAllButton.addEventListener("click", (_event) => {
  playPauseButton.textContent = "▶";
  simulation.killAllCells();
});

ticksPerFrameSlider.addEventListener("change", (event) => {
  const value = Number(event.target.value);
  if (Number.isNaN(value)) return;

  let textPrefix;
  if (value === 1) textPrefix = "1 tick";
  else textPrefix = `${value} ticks`;

  ticksPerFrameLabel.textContent = `${textPrefix} per frame`;
});

simulation.play(1);
