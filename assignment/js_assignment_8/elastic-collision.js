var canvas = document.createElement("canvas");
canvas.style.border = "2px solid #333";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");

document.body.appendChild(canvas);

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

function randomInt(min, max) {
    return min + Math.random() * (max - min);
}

function randomColor() {
    return (
        "rgb(" +
        String(randomInt(0, 255)) +
        ", " +
        String(randomInt(0, 255)) +
        ", " +
        String(randomInt(0, 255))
    );
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(vect1, vect2) {
        return new Vector(vect1.x + vect2.x, vect1.y + vect2.y);
    }

    static subtract(vect1, vect2) {
        return new Vector(vect1.x - vect2.x, vect1.y - vect2.y);
    }

    static multiply(vect, scaler) {
        return new Vector(vect.x * scaler, vect.y * scaler);
    }

    static divide(vect, scalar) {
        return new Vector(vect.x / scalar, vect.y / scalar);
    }

    dotProduct(vect) {
        return this.x * vect.x + this.y * vect.y;
    }

    getTangent() {
        return new Vector(-this.y, this.x);
    }

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    static random(minX, maxX, minY, maxY) {
        return new Vector(randomInt(minX, maxX), randomInt(minY, maxY));
    }
}

class Ball {
    constructor(x, y, radius) {
        this.position = new Vector(x, y);
        this.velocity = Vector.random(-4, 4, -4, 4);
        this.acceleration = new Vector(0, 0);
        this.radius = radius;
        this.color = randomColor();
    }

    move() {
        context.clearRect(0, 0, canvas.innerWidth, canvas.innerHeight);
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        context.fill();
        context.strokeStyle = "#333";
        context.stroke();
        this.position = Vector.add(this.position, this.velocity);
        this.velocity = Vector.add(this.velocity, this.acceleration);
        this.acceleration = Vector.multiply(this.acceleration, 0);
    }

    checkWallCollision(width, height) {
        if (this.position.x - this.radius <= 0) {
            this.position.x = this.radius;
        }
        if (this.position.x + this.radius >= canvas.width) {
            this.position.x = canvas.width - this.radius;
        }
        if (
            (this.position.x - this.radius <= 0 && this.velocity.x < 0) ||
            (this.position.x + this.radius >= canvas.width && this.velocity.x > 0)
        ) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.position.y - this.radius <= 0) {
            this.position.y = this.radius;
        }
        if (this.position.y + this.radius >= canvas.height) {
            this.position.y = canvas.height - this.radius;
        }
        if (
            (this.position.y - this.radius <= 0 && this.velocity.y < 0) ||
            (this.position.y + this.radius >= canvas.height && this.velocity.y > 0)
        ) {
            this.velocity.y = -this.velocity.y;
        }
    }

    checkBallCollision(ball) {
        const v = Vector.subtract(this.position, ball.position);
        const dist = v.magnitude();
        if (dist <= this.radius + ball.radius) {
            const unitNormal = Vector.divide(v, v.magnitude());
            const unitTangent = unitNormal.getTangent();

            const correction = Vector.multiply(unitNormal, this.radius + ball.radius);
            this.position = Vector.add(ball.position, correction);

            const a_n = this.velocity.dotProduct(unitNormal);
            const b_n = ball.velocity.dotProduct(unitNormal);
            const a_t = this.velocity.dotProduct(unitTangent);
            const b_t = ball.velocity.dotProduct(unitTangent);

            const a_n_final =
                (a_n * (this.radius - ball.radius) + 2 * ball.radius * b_n) /
                (this.radius + ball.radius);
            const b_n_final =
                (b_n * (ball.radius - this.radius) + 2 * this.radius * a_n) /
                (this.radius + ball.radius);
            const a_n_after = Vector.multiply(unitNormal, a_n_final);
            const b_n_after = Vector.multiply(unitNormal, b_n_final);
            const a_t_after = Vector.multiply(unitTangent, a_t);
            const b_t_after = Vector.multiply(unitTangent, b_t);

            this.velocity = Vector.add(a_n_after, a_t_after);
            ball.velocity = Vector.add(b_n_after, b_t_after);

            this.color = randomColor();
            ball.color = randomColor();
        }
    }
}
class Canvas {
    constructor() {
        this.setup();
        requestAnimationFrame(() => this.animate());
    }
    setup() {
        const NUMBER_OF_BALLS = 500;
        this.balls = [];

        for (let i = 0; i < NUMBER_OF_BALLS; i++) {
            const radius = randomInt(5, 15);
            this.balls.push(
                new Ball(
                    randomInt(radius * 2, canvas.width - radius * 2),
                    randomInt(radius * 2, canvas.height - radius * 2),
                    radius
                )
            );
        }
    }

    animate() {
        context.canvas.height = windowHeight;
        context.canvas.width = windowWidth;
        for (let i = 0; i < this.balls.length; i++) {
            const current = this.balls[i];
            const remainingBalls = this.balls.slice(i + 1);

            for (let ball of remainingBalls) {
                ball.checkBallCollision(current);
            }
        }

        for (let ball of this.balls) {
            ball.move();
            ball.checkWallCollision(canvas.width, canvas.height);
        }

        requestAnimationFrame(() => this.animate());
    }
}

new Canvas();

window.addEventListener("resize", () => {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    canvas.style.width = windowWidth;
    canvas.style.height = windowHeight;
});