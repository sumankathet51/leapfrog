class Bird {
    constructor(x, y, accl, velocity, element, height, width) {
        this.x = x;
        this.y = y;
        this.accl = accl;
        this.velocity = velocity;
        this.initial = velocity;
        this.element = element;
        this.height = height;
        this.width = width;
        this.isJumping = false;

        this.sprites = [{
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: -64,
            },
            {
                x: 0,
                y: -128,
            },
            {
                x: 0,
                y: -64,
            },
        ];
        this.frame = 0;
        const baseHeight = parseInt(getComputedStyle(base).height);
        const gameHeight = parseInt(getComputedStyle(gameContainer).height);
        this.maxDown = gameHeight - baseHeight - this.height + BIRD_OFFSET;
    }

    initialize() {
        this.element.style.height = toPx(this.height);
        this.element.style.width = toPx(this.width);
        this.element.style.backgroundImage =
            'url("./assets/sprites/wings-flap.png")';
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.marginLeft = toPx(this.x);
        this.element.style.marginTop = toPx(this.y);
    }

    flap() {
        this.element.style.backgroundPosition = `0px ${
      this.sprites[this.frame].y
    }px`;
        this.frame = (this.frame + 1) % 4;
    }

    moveDown() {
        if (this.y < this.maxDown) {
            this.y += this.velocity;
            if (this.y > this.maxDown) this.y = this.maxDown;
            this.element.style.marginTop = toPx(this.y);
            this.velocity += this.accl;
            return true;
        } else {
            return false;
        }
    }

    fall() {
        if (this.moveDown()) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = window.requestAnimationFrame(() => this.fall());
    }

    moveUp() {
        this.y -= 50;
        // this.isJumping = true;
        this.velocity = this.initial;
        this.element.style.marginTop = toPx(this.y);
        // this.isJumping = false;
    }

    detectCollision(obstacle) {
        if (
            this.x <
            obstacle.x + parseInt(getComputedStyle(obstacle.imageTop).width) &&
            this.width + this.x > obstacle.x &&
            (this.y <
                parseInt(getComputedStyle(obstacle.imageTop).marginTop) +
                parseInt(getComputedStyle(obstacle.imageTop).height) ||
                this.y >
                parseInt(getComputedStyle(obstacle.imageTop).marginTop) +
                OBSTACLE_GAP +
                parseInt(getComputedStyle(obstacle.imageBottom).height)) &&
            this.height + this.y >
            parseInt(getComputedStyle(obstacle.imageTop).marginTop)
        ) {
            return true;
        }
        return false;
    }
}