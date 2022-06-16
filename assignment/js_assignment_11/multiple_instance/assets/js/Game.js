class Game {
    constructor(gameContainer, gameIndex, key) {
        this.state = {
            current: 0,
            ready: 0,
            game: 1,
            over: 2,
        };
        this.base = 0;
        this.speed = 5;
        this.score = 0;
        this.gameWindow = gameContainer;
        this.gameIndex = gameIndex;
        this.key = key;
        this.highScore = localStorage.getItem(`score${gameIndex}`) ?
            localStorage.getItem("score") :
            0;
        console.log(gameIndex);
        highScore[this.gameIndex].innerText = this.highScore;
    }

    initialize() {
        this.bird = new Bird(
            100,
            200,
            2.5,
            this.speed,
            birds[this.gameIndex],
            27,
            33,
            this.gameIndex,
            this.highScore
        );
        this.bird.initialize();
        this.obstacles = [];
        for (let i = 0; i < 4; i++) {
            const obstacle = new Obstacle(
                this.obstacles.length < 1 ? 600 : randomInt(100, 300),
                this
            );
            obstacle.initialize();
            this.obstacles.push(obstacle);
        }
        this.addEvent();
        this.changeState(this.state.ready);
    }

    changeState(state) {
        this.state.current = state;
        switch (this.state.current) {
            case this.state.ready:
                this.flapInterval = setInterval(() => {
                    this.bird.flap();
                }, 300);
                gameOver[this.gameIndex].style.top = "100%";
                gameOver[this.gameIndex].style.display = "none";
                start[this.gameIndex].style.top = "10%";
                break;
            case this.state.game:
                this.animate();
                start[this.gameIndex].style.top = "100%";
                clearInterval(this.flapInterval);
                this.interval = setInterval(() => {
                    if (this.bird.isJumping) return;
                    if (!this.bird.moveDown()) {
                        this.changeState(this.state.over);
                        clearInterval(this.interval);
                    }
                    this.bird.flap();
                }, 100);
                break;
            case this.state.over:
                if (this.score > this.highScore) {
                    this.highScore = this.score;
                    highScore[this.gameIndex].innerText = this.highScore;
                    localStorage.setItem(`score${this.gameIndex}`, this.score);
                }
                gameOver[this.gameIndex].style.top = "10%";
                gameOver[this.gameIndex].style.display = "block";

                clearInterval(this.interval);
        }
    }

    animate() {
        if (this.obstacles[0].x < -52) {
            this.score++;
            console.log(this.gameIndex, scoreContainer);
            scoreContainer[this.gameIndex].innerText = this.score;
            currentScore[this.gameIndex].innerText = this.score;
            this.obstacles[0].element.remove();
            this.obstacles.splice(0, 1);
            const newObstacle = new Obstacle(randomInt(150, 300), this);
            newObstacle.initialize();
            this.obstacles.push(newObstacle);
            this.obstacles.push(newObstacle);
        }
        this.obstacles[0].move();

        if (this.bird.detectCollision(this.obstacles[0])) {
            this.changeState((this.state.current = this.state.over));
            this.bird.fall();
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }

    addEvent() {
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
            if (e.code === this.key) {
                switch (this.state.current) {
                    case this.state.ready:
                        this.changeState(this.state.game);
                        break;
                    case this.state.game:
                        this.bird.moveUp();
                        break;
                    case this.state.over:
                        this.state.current = this.state.ready;
                }
            }
        });

        resetButtons[this.gameIndex].addEventListener("click", (e) => {
            e.preventDefault();
            this.restartGame();
        });
    }

    restartGame() {
        this.changeState(this.state.ready);
        this.base = 0;
        this.speed = 5;
        this.score = 0;
        scoreContainer[this.gameIndex].innerText = this.score;
        currentScore[this.gameIndex].innerText = this.score;
        this.obstacles.forEach((obstacle) => {
            obstacle.element.remove();
        });
        this.bird = null;
        clearInterval(this.flapInterval);
        clearInterval(this.interval);
        cancelAnimationFrame(this.animationFrame);

        this.bird = new Bird(
            100,
            200,
            2.5,
            this.speed,
            birds[this.gameIndex],
            27,
            33,
            this.gameIndex,
            this.highScore
        );

        this.bird.initialize();
        this.obstacles = [];
        for (let i = 0; i < 4; i++) {
            const obstacle = new Obstacle(
                this.obstacles.length < 1 ? 600 : randomInt(100, 300),
                this
            );
            obstacle.initialize();
            this.obstacles.push(obstacle);
        }
    }
}

// let game = new Game();
// game.initialize();

const games = [];
keys = ["Space", "ArrowUp", "KeyW"];
for (let index = 0; index < gameContainers.length; index++) {
    const game = new Game(gameContainers[index], index, keys[index]);
    game.initialize();
    games.push(game);
}
console.log(games);