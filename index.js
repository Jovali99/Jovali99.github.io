var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(timestamp) {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        frameCount++;
        const smoothing = 0.2;
        then = now - (elapsed % fpsInterval);
        currentScroll += (scroll - currentScroll)*smoothing;

        titleAnimation(currentScroll);
        animateMetorites();
        //animatePlanet();
        animateCube();
    }
}

let scroll = 0;
let currentScroll = 0;
window.addEventListener('scroll', () => {
    scroll = window.scrollY || document.documentElement.scrollTop;
});

// --------------- Cube Start --------------- 
let isMouseDown = false;
let startX, startY;
window.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener("mouseup", () => {
    isMouseDown = false;
});

window.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    cubeState.targetY += deltaX * 0.3; // rotateY
    cubeState.targetX -= deltaY * 0.3; // rotateX


    startX = e.clientX;
    startY = e.clientY;
});

const cubeState = {
    rotationX: 0,         // actual applied rotation X
    rotationY: 0,         // actual applied rotation Y
    targetX: 0,           // updated on drag
    targetY: 0,           // updated on drag
    autoRotateY: 0,       // accumulates idle rotation
    rotationAmount: 0.5   // how fast auto rotation happens
}

function animateCube() {
    if (!isMouseDown) {
        cubeState.autoRotateY += cubeState.rotationAmount;
    }

    // Smooth transition to drag targets
    cubeState.rotationX += (cubeState.targetX - cubeState.rotationX) * 0.15;
    cubeState.rotationY += (cubeState.targetY - cubeState.rotationY) * 0.15;

    const totalRotateX = cubeState.rotationX;
    const totalRotateY = cubeState.rotationY + cubeState.autoRotateY;

    cube.style.transform = `rotateX(${totalRotateX}deg) rotateY(${totalRotateY}deg)`;
}

// --------------- Cube End --------------- 

function animateMetorites() {
    meteorAnimation(currentScroll, ".meteor0", metState0);
    meteorAnimation(currentScroll, ".meteor1", metState1);
    meteorAnimation(currentScroll, ".meteor2", metState2);
    meteorAnimation(currentScroll, ".meteor3", metState3);
}

const planetState = {
    tx: 50,
    ty: 50,
    scale: 1,
    rotation: 0,
    rotationAmount: 0.5
};

function titleAnimation(currentScroll) {
    const spaceTitle = document.querySelector('.space-title');

    const scrollStart1 = 0;
    const scrollEnd1 = 300;
    const prog1 = Math.max(0, Math.min(currentScroll/(scrollEnd1 - scrollStart1), 1));

    let translateX = -25 + 50 * prog1; // From -25vw to +25vw
    let scale = 100 + 50 * prog1;
    
    const scrollStart2 = 400;
    const scrollEnd2 = 600;
    const prog2 = Math.max(0, Math.min((currentScroll - scrollStart2)/(scrollEnd2 - scrollStart2), 1));

    translateX = translateX - 22 * prog2;
    scale =  scale - 50 * prog2;
    
    spaceTitle.style.transform = `translateX(${translateX}vw) scale(${scale}%)`;
    const marginTop = 7 - 5*prog2;
    spaceTitle.style.marginTop = `${marginTop}vh`;
}

const metState0 = {
    tx: 110,
    ty: -10,
    scale: 1,
    initScroll: 0
};

const metState1 = {
    tx: 70,
    ty: -10,
    scale: 1,
    initScroll: 330
};

const metState2 = {
    tx: 180,
    ty: -30,
    scale: 1,
    initScroll: 450
};

const metState3 = {
    tx: 80,
    ty: -10,
    scale: 1,
    initScroll: 600
};

function meteorAnimation(cScroll, element, metState) {
    const met = document.querySelector(element);
    if (!met) return;

    let { tx, ty, scale, initScroll } = metState;

    // Step 1
    ({ tx, ty, scale } = moveMeteor(cScroll, tx, ty, scale, {
        txDelta: -30,
        tyDelta: 30,
        scaleDelta: 10,
        scrollStart: 0 + initScroll,
        scrollEnd: 300 + initScroll
    }));

    // Step 2
    ({ tx, ty, scale } = moveMeteor(cScroll, tx, ty, scale, {
        txDelta: -30,
        tyDelta: 30,
        scaleDelta: 30,
        scrollStart: 300 + initScroll,
        scrollEnd: 600 + initScroll
    }));

    ({ tx, ty, scale } = moveMeteor(cScroll, tx, ty, scale, {
        txDelta: -30,
        tyDelta: 30,
        scaleDelta: 140,
        scrollStart: 600 + initScroll,
        scrollEnd: 900 + initScroll
    }));

    ({ tx, ty, scale } = moveMeteor(cScroll, tx, ty, scale, {
        txDelta: -45,
        tyDelta: 45,
        scaleDelta: 250,
        scrollStart: 900 + initScroll,
        scrollEnd: 1300 + initScroll
    }));

    ({ tx, ty, scale } = moveMeteor(cScroll, tx, ty, scale, {
        txDelta: -50,
        tyDelta: 50,
        scaleDelta: 250,
        scrollStart: 1300 + initScroll,
        scrollEnd: 1500 + initScroll
    }));

    met.style.transform = `translateX(${tx}vw) translateY(${ty}vh) scale(${scale}%)`;
}

function moveMeteor(cScroll, tx, ty, scale, { txDelta, tyDelta, scaleDelta, scrollStart, scrollEnd }) {
    const prog = Math.max(0, Math.min((cScroll - scrollStart) / (scrollEnd - scrollStart), 1));
    tx += txDelta * prog;
    ty += tyDelta * prog;
    scale += scaleDelta * prog;
    return { tx, ty, scale};
}

function adjustWrapperSize() {
    const wrapper = document.querySelector('.white-card-wrapper');
    const card = document.querySelector('.white-card-container');

    const rect = card.getBoundingClientRect();
    const height = Math.sqrt(rect.width*rect.width + rect.height*rect.height);

    wrapper.style.height = `${height}px`;
}
window.addEventListener('load', adjustWrapperSize);
window.addEventListener('resize', adjustWrapperSize);

let cube;
document.addEventListener('DOMContentLoaded', () => {
    startAnimating(60);
    cube = document.querySelector('.cube');
});
