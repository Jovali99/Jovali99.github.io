let isMouseDown = false;
let startX, startY;

window.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("face")) return;

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
  rotationX: 0, // actual applied rotation X
  rotationY: 0, // actual applied rotation Y
  targetX: 0, // updated on drag
  targetY: 0, // updated on drag
  autoRotateY: 0, // accumulates idle rotation
  rotationAmount: 0.2, // how fast auto rotation happens
};

function animateCube() {
  if (!isMouseDown) {
    cubeState.autoRotateY += cubeState.rotationAmount;
  }

  // Smooth transition to drag targets
  cubeState.rotationX += (cubeState.targetX - cubeState.rotationX) * 0.15;
  cubeState.rotationY += (cubeState.targetY - cubeState.rotationY) * 0.15;

  const totalRotateX = cubeState.rotationX;
  const totalRotateY = cubeState.rotationY + cubeState.autoRotateY;

  if (cube == null) return;
  cube.style.transform = `rotateX(${totalRotateX}deg) rotateY(${totalRotateY}deg)`;
}

function cubeButtonClicked(face) {
  console.log("Cube button: ", face, " clicked");
}
