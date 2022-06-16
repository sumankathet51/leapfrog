class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// initialize() {
//     const imageTop = document.createElement("img");
//     imageTop.setAttribute("src", "./assets/sprites/pipe-green.png");
//     imageTop.style.transform = "rotate(180deg)";
//     imageTop.style.marginTop = toPx(randomInt(0, MAX_MARGIN_TOP));

//     const imageBottom = document.createElement("img");
//     imageBottom.setAttribute("src", "./assets/sprites/pipe-green.png");
//     imageBottom.style.marginTop = toPx(randomInt(0, MAX_MARGIN_TOP));

//     this.element = document.createElement("div");
//     this.element.appendChild(imageTop);
//     this.element.appendChild(imageBottom);
//     this.element.style.marginLeft = toPx(this.x);
//     this.element.classList.add("obstacle");

//     // this.bottom = document.createElement("div");
//     // this.bottom.classList.add("obstacle");
//     // this.bottom.style.marginTop = toPx(obstacleGap);
//     // this.bottom.style.marginLeft = toPx(this.x);

//     // this.bottom.appendChild(image);

//     // gameContainer.appendChild(this.top);
//     gameContainer.appendChild(this.element);
// }