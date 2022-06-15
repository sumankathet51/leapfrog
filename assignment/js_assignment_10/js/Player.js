class Player {
    constructor(element, lane, height, scoreElem) {
        this.element = element;
        this.marginTop = parseInt(getComputedStyle(this.element).marginTop);
        this.score = 0;
        this.scoreElem = scoreElem;
        this.lane = lane;
        this.height = height;
    }

    checkCollision(obstacle) {
        if (
            this.marginTop < obstacle.marginTop + offset &&
            this.height + this.marginTop > obstacle.marginTop + offset
        ) {
            return true;
        } else {
            return false;
        }
    }

    increaseScore() {
        this.score++;
        this.scoreElem.innerText = this.score;
    }
}