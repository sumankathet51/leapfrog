class Game {
    constructor() {
        this.state = {
            current: 0,
            ready: 0,
            game: 1,
            over: 2,
        };
        this.base = 0;
        this.speed = 5;
        this.score = 0;
    }

    initialize() {
        this.bird = new Bird(
            100,
            200,
            2.5,
            this.speed,
            document.querySelector(".bird"),
            27,
            33
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
                gameOver.style.top = "100%";
                gameOver.style.display = "none";
                start.style.top = "10%";
                break;
            case this.state.game:
                this.animate();
                start.style.top = "100%";
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
                if (this.score > highestScore) {
                    highestScore = this.score;
                    highScore.innerText = highestScore;
                    localStorage.setItem("score", this.score);
                }
                gameOver.style.top = "10%";
                gameOver.style.display = "block";

                clearInterval(this.interval);
        }
    }

    animate() {
        if (this.obstacles[0].x < -52) {
            this.score++;
            scoreContainer.innerText = this.score;
            currentScore.innerText = this.score;
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
            if (e.code === "ArrowUp" || e.code === "Space") {
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
    }

    restartGame() {
        this.changeState(this.state.ready);
        this.base = 0;
        this.speed = 5;
        this.score = 0;
        scoreContainer.innerText = this.score;
        currentScore.innerText = this.score;
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
            document.querySelector(".bird"),
            27,
            33
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

let highestScore = localStorage.getItem("score") ?
    localStorage.getItem("score") :
    0;
highScore.innerText = highestScore;
let game = new Game();
game.initialize();

document.getElementById("reset-btn").addEventListener("click", (e) => {
    e.preventDefault();
    game.restartGame();
});