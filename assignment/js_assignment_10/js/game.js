let carCurrentMarginLeft = parseInt(getComputedStyle(car).marginLeft);
// let obstacles = [];
let highScore = 0;
let animationDuration = 6;
let player;

function startGame() {
    player = new Player(car, lanes[1], 150, scoreElem);

    obstacles = setInitialPosition(spawnMin, spawnMax);
    let id = setInterval(() => {
        moveDown();
    }, 1000 / 60);

    let increaseSpeed = setInterval(() => {
        levelUp();
    }, 5000);
    home.style.display = "none";
    game.style.display = "block";

    function moveDown() {
        let spawnMin = -100;
        let spawnMax = -containerHeight;
        obstacles.forEach((obstacle, index) => {
            if (obstacle.marginTop > containerHeight) {
                const lane = lanes[randomInt(0, Object.keys(lanes).length) + 1];
                let marginTop = randomInt(spawnMin, spawnMax);
                spawnMin = marginTop - 400;
                spawnMax -= spawnMax;
                obstacle.reset(marginTop, lane);
            }

            if (obstacle.move(player)) {
                clearInterval(id);
                clearInterval(increaseSpeed);
                road.style.animation = "none";
                gameOverScore.innerText = player.score;
                if (player.score > highScore) {
                    highScore = player.score;
                    homeHighScoreElem.innerText = highScore;
                    gameOverHighscoreElem.innerText = highScore;
                }
                game.style.display = "none";
                gameOver.style.display = "flex";
            }
        });
    }

    // let
}

function levelUp() {
    obstacles.forEach((obs) => {
        obs.increaseSpeed();
    });
    animationDuration -= 0.1 * animationDuration;
    road.style.animationDuration = animationDuration;
}

function reset() {
    obstacles.forEach((obs) => {
        obs.speed = 3;
    });

    animationDuration = 6;
    road.style.animationDuration = animationDuration;
}

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") {
        if (carCurrentMarginLeft < 300) {
            animate(
                200,
                player.element,
                carCurrentMarginLeft + difference,
                carCurrentMarginLeft
            );
            carCurrentMarginLeft += difference;
            player.lane = carCurrentMarginLeft;
        }
    } else if (e.key === "ArrowLeft" || e.key === "a") {
        if (carCurrentMarginLeft > 100) {
            // console.log(carCurrentMarginLeft);
            animate(
                200,
                player.element,
                carCurrentMarginLeft - difference,
                carCurrentMarginLeft
            );
            carCurrentMarginLeft -= difference;
            player.lane = carCurrentMarginLeft;
        }
    }
});