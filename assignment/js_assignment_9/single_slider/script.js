let left = document.getElementById("left");
let right = document.getElementById("right");
let carouselContainer = document.getElementById("carousel-container");
let imgWrapper = document.getElementsByClassName("carousel-image-wrapper");
let current_index = 0;
let dots = document.createElement("div");
let autoSlide;
dots.classList.add("dots");

// imgWrapper.style.height = getComputedStyle(imgWrapper[0].children[0]).height;

for (let i = 0; i < imgWrapper[0].children.length; i++) {
    console.log(imgWrapper[0].children[i]);
    imgWrapper[0].children[i].style.position = "absolute";
    imgWrapper[0].children[i].style.width = "100%";
    imgWrapper[0].children[i].style.left = i * 100 + "%";
    let elem = document.createElement("span");
    elem.style.height = "25px";
    elem.style.width = "25px";
    elem.style.margin = "5px";
    elem.style.display = "inline-block";
    elem.style.borderRadius = "50%";
    elem.classList.add("dot");
    elem.setAttribute("onclick", "slide(0, " + i + ")");
    if (i === 0) {
        elem.classList.add("active");
    }
    dots.appendChild(elem);
}
carouselContainer.appendChild(dots);
let containerWidth = getComputedStyle(imgWrapper[0]).width;

function slide(difference, index) {
    clearInterval(autoSlide);
    dots.children[current_index].classList.remove("active");
    if (difference !== 0) {
        current_index += difference;
        if (current_index >= imgWrapper[0].children.length) {
            current_index = 0;
        }
        if (current_index < 0) {
            current_index = imgWrapper[0].children.length - 1;
        }
    } else {
        current_index = index;
        console.log(index);
    }
    dots.children[current_index].classList.add("active");

    // else current_index -= difference;
    let currentMargin = parseInt(getComputedStyle(imgWrapper[0]).marginLeft);
    let targetMargin = current_index * -parseInt(containerWidth);
    let marginChange = (targetMargin - currentMargin) / 100;
    let interval;

    interval = setInterval(() => {
        currentMargin = currentMargin + marginChange;
        imgWrapper[0].style.marginLeft = String(currentMargin) + "px";
    }, 10);

    setTimeout(() => {
        clearInterval(interval);
    }, 1000);
    autoSlide = setInterval(() => {
        slide(1);
    }, 3000);
}

// function slideFromLeft() {

// }

autoSlide = setInterval(() => {
    slide(1);
}, 3000);

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        slide(1);
    } else if (event.key === "ArrowLeft") {
        slide(-1);
    }
});