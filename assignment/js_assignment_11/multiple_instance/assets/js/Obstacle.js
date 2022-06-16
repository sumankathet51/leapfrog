class Obstacle {
    constructor(x, game) {
        this.x = x;
        this.speed = 1;
        this.game = game;
    }
    initialize() {
        this.imageTop = document.createElement("img");
        this.imageTop.setAttribute("src", "./assets/sprites/pipe-green.png");
        this.imageTop.style.transform = "rotate(180deg)";
        this.imageTop.style.marginTop = toPx(randomInt(0, MAX_MARGIN_TOP));

        this.imageBottom = document.createElement("img");
        this.imageBottom.setAttribute("src", "./assets/sprites/pipe-green.png");

        this.element = document.createElement("div");
        this.element.appendChild(this.imageTop);
        this.element.appendChild(this.imageBottom);
        this.element.style.marginLeft = toPx(this.x);
        this.element.style.rowGap = toPx(OBSTACLE_GAP);
        this.element.classList.add("obstacle");
        obstacleContainer[this.game.gameIndex].appendChild(this.element);

        this.increaseSpeed();
    }

    move() {
        if (this.game.state.current === this.game.state.game) {
            this.x -= this.speed;
            this.element.style.marginLeft = toPx(this.x);
        }
    }

    increaseSpeed() {
        if (this.game.state.current === this.game.state.game) {
            setInterval(() => {
                if (this.game.state.current !== this.game.state.game) return;
                this.speed += 1;
            }, 5000);
        }
    }
}