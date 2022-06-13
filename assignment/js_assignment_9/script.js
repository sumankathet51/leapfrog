class Slider {
    constructor(
        id = "carousel-container",
        transitionTime = 1000,
        holdTime = 3000
    ) {
        this.holdTime = holdTime;
        this.transitionTime = transitionTime;
        this.id = id;
        this.setUp();
        this.autoSlide();

        // this.keyboardControls();
    }

    setUp() {
        this.carouselContainer = document.getElementById(this.id);
        this.imgWrapper = this.carouselContainer.getElementsByClassName(
            "carousel-image-wrapper"
        );
        this.current_index = 0;
        this.dots = document.createElement("div");
        this.SlideInterval;
        this.containerWidth = getComputedStyle(this.imgWrapper[0]).width;
        this.dots.classList.add("dots");

        let controls = document.createElement("div");
        controls.classList.add("carousel__controls");

        let left = document.createElement("span");
        left.classList.add("left");
        left.addEventListener("click", () => {
            this.slide(-1);
        });
        controls.appendChild(left);
        let right = document.createElement("span");
        right.classList.add("right");
        right.addEventListener("click", () => {
            this.slide(1);
        });

        controls.appendChild(right);

        this.carouselContainer.appendChild(controls);

        for (let i = 0; i < this.imgWrapper[0].children.length; i++) {
            // console.log(this.imgWrapper[0].children[i]);
            this.imgWrapper[0].children[i].style.position = "absolute";
            this.imgWrapper[0].children[i].style.width = "100%";
            this.imgWrapper[0].children[i].style.left = i * 100 + "%";
            let elem = document.createElement("span");
            elem.style.height = "25px";
            elem.style.width = "25px";
            elem.style.margin = "5px";
            elem.style.display = "inline-block";
            elem.style.borderRadius = "50%";
            elem.classList.add("dot");
            elem.addEventListener("click", () => this.slide(0, i));
            if (i === 0) {
                elem.classList.add("active");
            }
            this.dots.appendChild(elem);
        }
        this.carouselContainer.appendChild(this.dots);
    }

    slide(difference, index) {
        clearInterval(this.SlideInterval);
        this.dots.children[this.current_index].classList.remove("active");
        if (difference !== 0) {
            this.current_index += difference;
            if (this.current_index >= this.imgWrapper[0].children.length) {
                this.current_index = 0;
            }
            if (this.current_index < 0) {
                this.current_index = this.imgWrapper[0].children.length - 1;
            }
        } else {
            this.current_index = index;
            // console.log(index);
        }
        this.dots.children[this.current_index].classList.add("active");

        this.currentMargin = parseInt(
            getComputedStyle(this.imgWrapper[0]).marginLeft
        );
        this.targetMargin = this.current_index * -parseInt(this.containerWidth);
        this.marginChange =
            (this.targetMargin - this.currentMargin) / (this.transitionTime / 10);
        this.interval;

        this.interval = setInterval(() => {
            this.currentMargin = this.currentMargin + this.marginChange;
            this.imgWrapper[0].style.marginLeft = String(this.currentMargin) + "px";
        }, 10);

        setTimeout(() => {
            clearInterval(this.interval);
        }, this.transitionTime);

        this.SlideInterval = setInterval(() => {
            this.slide(1);
        }, this.holdTime);
    }

    autoSlide() {
        this.SlideInterval = setInterval(() => {
            this.slide(1);
        }, this.holdTime);
    }

    // resize() {
    //     window.addEventListener("resize", () {

    //     })
    // }
}

let slider = new Slider();
let slider1 = new Slider("carousel2-container", 2000, 5000);
let slider2 = new Slider("carousel3-container", 1500, 2000);