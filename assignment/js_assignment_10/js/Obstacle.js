class Obstacle {
    constructor(element, speed, lane, marginTop, height) {
        this.element = element;
        this.speed = speed;
        this.lane = lane;
        this.height = height;
        this.marginTop = marginTop;
    }

    init() {
        this.element.style.marginTop = this.marginTop + "px";
        this.element.style.marginLeft = this.lane + "px";
    }

    move(player) {
        this.marginTop += this.speed;
        this.element.style.marginTop = this.marginTop + "px";
        if (this.marginTop > containerHeight) {
            player.increaseScore();
        }
        if (
            this.marginTop > 0 &&
            this.marginTop < containerHeight &&
            this.lane === player.lane
        ) {
            return player.checkCollision(this);
        }
    }

    reset(marginTop, lane) {
        this.marginTop = marginTop;
        this.lane = lane;
        this.element.style.marginLeft = this.lane + "px";
    }

    increaseSpeed() {
        this.speed += 0.1 * this.speed;
    }
}