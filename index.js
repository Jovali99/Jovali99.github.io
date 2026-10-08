var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;

async function loadComponent(id, file) {
	const element = document.getElementById(id);
	const response = await fetch(file);
	if (!response.ok) {
		throw new Error(`Failed to load component: ${file}`);
	}
	element.innerHTML = await response.text();
}

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
		currentScroll += (scroll - currentScroll) * smoothing;

		animateCube();
		informationAnimation();
	}
}

let scroll = 0;
let currentScroll = 0;
window.addEventListener("scroll", () => {
	scroll = window.scrollY || document.documentElement.scrollTop;
});

let cube;
document.addEventListener("DOMContentLoaded", async () => {
	startAnimating(60);

	await loadComponent("stars_background", "components/stars/stars.html");
	initStars(4);

	await loadProjects();

	await loadComponent("information_panel", "components/information_panel/information_panel.html");
	informationInit();

	await loadComponent("cube_scene", "components/cube/cube.html");
	cube = document.querySelector(".cube");

	//await loadComponent("project_panel", "components/project_panel/project_panel.html");
	//initPP();
});
