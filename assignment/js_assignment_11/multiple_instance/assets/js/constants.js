const OBSTACLE_GAP = 90;
const MAX_MARGIN_TOP = -280;
const BIRD_OFFSET = 4;

const gameContainers = document.querySelectorAll(".game-container");
const base = document.querySelectorAll(".base");
const birds = document.querySelectorAll(".bird");
const start = document.querySelectorAll(".start");
const gameOver = document.querySelectorAll(".game-over");
const obstacleContainer = document.querySelectorAll(".obstacles");
const scoreContainer = document.querySelectorAll(".score");
const currentScore = document.querySelectorAll(".game-score");
const highScore = document.querySelectorAll(".high-score");
const resetButtons = document.querySelectorAll(".reset-btn");

console.log(base);
// obstacleContainer.style.rowGap = toPx(OBSTACLE_GAP);