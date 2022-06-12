const DEFAULT_SPEED_X = -1;
const DEFAULT_SPEED_y = 1;
const DEFAULT_DIRECTION_X = 2;
const DEFAULT_DIRECTION_y = 1;
const DEFAULT_COLOR = "#49b";
// const DEFAULT_WIDTH = 25;
const DEFAULT_RADIUS = 12;
const boundaryW = 700;
const boundaryH = 700;
let container = document.getElementById("container");
container.style.width = toPx(boundaryW);
container.style.height = toPx(boundaryH);
container.style.border = "2px solid #000";
container.style.position = "relative";

function toPx(value) {
    return `${value}px`;
}

function generateRandom(min = 0, max = 100) {
    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

class Ball {
    constructor(
        x = boundaryW / 2,
        y = boundaryH / 2,
        speedX = DEFAULT_SPEED_X,
        speedY = DEFAULT_SPEED_X,
        directionX = DEFAULT_DIRECTION_X,
        directionY = DEFAULT_DIRECTION_y,
        radius = DEFAULT_RADIUS,
        color = DEFAULT_COLOR
    ) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.directionX = directionX;
        this.directionY = directionY;
        this.h = radius * 2;
        this.w = radius * 2;
        this.radius = radius;
        this.color = color;
    }

    create() {
        this.ball = document.createElement("div");
        this.ball.style.height = toPx(this.h);
        this.ball.style.width = toPx(this.w);
        this.ball.style.top = toPx(this.x);
        this.ball.style.left = toPx(this.y);
        this.ball.style.borderRadius = "50%";
        this.ball.style.background = this.color;
        this.ball.style.position = "absolute";
        container.appendChild(this.ball);
    }

    move() {
        this.x += this.speedX * this.directionX;
        this.y += this.speedY * this.directionY;

        this.ball.style.top = toPx(this.y);
        this.ball.style.left = toPx(this.x);
    }

    checkWallCollision() {
        if (this.x >= boundaryW - this.w) this.directionX = -1;
        if (this.y >= boundaryH - this.h) this.directionY = -1;

        if (this.x <= 0) this.directionX = 1;
        if (this.y <= 0) this.directionY = 1;
    }

    detectCollision(balls) {
        let collision = false;
        // console.log(this);
        balls.forEach((ball) => {
            if (ball !== this) {
                let squareDist =
                    (ball.x - this.x) * (ball.x - this.x) +
                    (ball.y - this.y) * (ball.y - this.y);
                if (
                    squareDist <=
                    (ball.radius + this.radius) * (ball.radius + this.radius)
                ) {
                    // collision detected!
                    this.directionX === -1 ?
                        (this.directionX = 1) :
                        (this.directionX = -1);
                    this.directionY === -1 ?
                        (this.directionY = 1) :
                        (this.directionY = -1);
                    collision = true;
                }
            }
        });
        return collision;
    }
}

let balls = [];

for (let i = 0; i < 10; i++) {
    let color =
        "rgb(" +
        String(generateRandom(1, 256)) +
        ", " +
        String(Math.floor(Math.random() * 256)) +
        ", " +
        String(Math.floor(Math.random() * 256)) +
        ")";
    const radius = generateRandom(15, 30);
    const x = generateRandom(1, boundaryW - radius);
    const y = generateRandom(1, boundaryH - radius);
    let ball = new Ball(
        generateRandom(1, boundaryW - radius),
        generateRandom(1, boundaryH - radius),
        generateRandom(1, 4),
        generateRandom(1, 4),
        Math.random() > 0.5 ? 1 : -1,
        Math.random() > 0.5 ? 1 : -1,
        radius,
        color
    );
    if (balls.length > 1) {
        let collision = ball.detectCollision(balls);
        console.log(collision);
        while (collision) {
            ball = new Ball(
                generateRandom(-1, boundaryW),
                generateRandom(1, boundaryH),
                generateRandom(1, 2),
                generateRandom(1, 2),
                Math.random() > 0.5 ? 1 : -1,
                Math.random() > 0.5 ? 1 : -1,
                generateRandom(20, 30),
                color
            );
            collision = ball.detectCollision(balls);
        }
    }
    ball.create();
    balls.push(ball);
}

function play() {
    balls.forEach((ball) => {
        ball.checkWallCollision();
        ball.detectCollision(balls);
        ball.move();
    });
    window.requestAnimationFrame(() => {
        play();
    });
}
play();