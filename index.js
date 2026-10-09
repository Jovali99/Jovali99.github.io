var stop = false;
var frameCount = 0;
var fps, fpsInterval, startTime, now, then, elapsed;
let projects = [];

async function loadComponent(id, file) {
	const element = document.getElementById(id);
	const response = await fetch(file);
	if (!response.ok || element == null) {
		throw new Error(`Failed to load component: ${file}`);
	}
	element.innerHTML = await response.text();
}

class Project {
	constructor(id, title, stack, desc, imgUrls) {
		this.id = id;
		this.title = title;
		this.stack = stack;
		this.description = desc;
		this.imageUrls = imgUrls;
	}
}

async function loadProjects() {
	const basePath = "../../assets/projects";

	for (let id = 1; id <= 6; id++) {
		const projectFolder = `p${id}`;
		let path = `${basePath}/${projectFolder}/`;
		let response = await fetch(`${path}/project.json`);

		if (!response.ok) {
			path = `${basePath}/placeholder/`;
			response = await fetch(`${path}/project.json`);
		}
		if (!response.ok) throw new Error("Failed to load placeholder project");

		const data = await response.json();
		const imageUrls = data.images.map((image) => `${path}/${image}`);

		projects.push(new Project(id, data.title, data.stack, data.description, imageUrls));
	}
	console.log(projects);
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
    initCube();
	cube = document.querySelector(".cube");
});
