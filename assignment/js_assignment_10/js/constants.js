const car = document.getElementById("car");
const road = document.getElementById("road");
const game = document.querySelector(".game-wrapper");
const scoreElem = document.getElementById("score");
const homeHighScoreElem = document.getElementById("high-score");
const gameOverHighscoreElem = document.getElementById("game-high-score");
const home = document.querySelector(".home");
const gameOver = document.querySelector(".game-over");
const gameOverScore = document.querySelector("#game-over-score");
const currentScore = 0;
const lanesCount = 3;
const difference = 600 / lanesCount;
// const containerHeight = parseInt(getComputedStyle(road).height);
const containerHeight = 852;
const spawnCarContainer = document.getElementById("spawns");
const spawnMin = -100;
const spawnMax = -containerHeight / 2;
const lanes = {
    1: 0,
    2: difference,
    3: difference * 2,
};

const offset = 40;

// console.log(lanes[3]);