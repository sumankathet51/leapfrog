const OBSTACLE_GAP = 90;
const MAX_MARGIN_TOP = -280;
const BIRD_OFFSET = 4;

const gameContainer = document.querySelector(".game-container");
const base = document.querySelector(".base");
const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");
const obstacleContainer = document.querySelector(".obstacles");
const scoreContainer = document.querySelector("#score");
const currentScore = document.querySelector(".game-score");
const highScore = document.querySelector("#high-score");
// obstacleContainer.style.rowGap = toPx(OBSTACLE_GAP);