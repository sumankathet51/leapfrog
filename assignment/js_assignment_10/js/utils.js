function animate(duration, element, targetValue, CurrentValue) {
    let marginDifference = (targetValue - CurrentValue) / (duration / 10);
    let id = setInterval(() => {
        CurrentValue += marginDifference;
        element.style.marginLeft = `${CurrentValue}px`;
    }, 10);
    console.log(targetValue);
    setTimeout(() => {
        clearInterval(id);
    }, duration + 10);
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

function randomProperty(obj) {
    const keys = Object.keys(obj);
    const rand = keys[Math.floor(Math.random() * keys.length)];
    return rand;
}

function setInitialPosition() {
    const prevLanes = {};
    const obstacles = [];
    let spawnMin = -100;
    let spawnMax = containerHeight;
    for (img of spawnCarContainer.children) {
        const lane = lanes[randomInt(0, Object.keys(lanes).length) + 1];
        let marginTop = randomInt(spawnMin, spawnMax);
        spawnMin = marginTop - 300;
        spawnMax += spawnMax;
        prevLanes[`${lane}`] = marginTop;
        const obstacle = new Obstacle(img, 3, lane, marginTop, 150);
        obstacle.init();
        obstacles.push(obstacle);
    }
    // checkEmptyLane(obstacles, lanesCount);
    return obstacles;
}

function checkEqualSets(a, b) {
    return a.size === b.size && [...a].every((value) => b.has(value));
}

function checkEmptyLane(obstacles, lanesCount) {
    const laneArray = [];
    const newObstacles = [];
    let lowest = obstacles[0];

    obstacles.forEach((obs) => {
        if (!laneArray.includes(obs.lane)) {
            laneArray.push(obs.lane);
            newObstacles.push(obs);
            if (obs.marginTop < lowest.marginTop) {
                lowest = obs;
            }
        }
    });

    newObstacles.sort(
        (firstElement, secondElement) =>
        firstElement.marginTop - secondElement.marginTop
    );

    if (laneArray.length === lanesCount) {
        for (let i = 0; i < newObstacles.length - 1; i++) {
            if (newObstacles[i].marginTop < lowest.marginTop) {
                lowest = newObstacles[i];
            }
        }
        newObstacles[newObstacles.length - 1].reset(
            newObstacles[newObstacles.length - 2].marginTop - 500,
            newObstacles[newObstacles.length - 1].lane
        );
    }
}