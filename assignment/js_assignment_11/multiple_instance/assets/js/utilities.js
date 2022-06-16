function toPx(value) {
    return `${value}px`;
}

function randomInt(min, max) {
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor(rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}