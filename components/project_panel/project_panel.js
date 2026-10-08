let currentSlide = 0;
let track;
let projects = [];

class Project {
	constructor(id, title, stack, desc, imgUrls) {
		this.id = id;
		this.title = title;
		this.stack = stack;
		this.description = desc;
		this.imageUrls = imgUrls;
	}
}

function updateCarousel() {
	track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function initPP() {
	track = document.querySelector(".carousel_track");
	const slides = document.querySelectorAll(".carousel_track li");

	const previousButton = document.querySelector(".carousel_previous");
	const nextButton = document.querySelector(".carousel_next");

	nextButton.addEventListener("click", () => {
		currentSlide++;
		if (currentSlide >= slides.length) currentSlide = 0;
		updateCarousel();
	});

	previousButton.addEventListener("click", () => {
		currentSlide--;
		if (currentSlide < 0) currentSlide = slides.length - 1;
		updateCarousel();
	});
}

function clearProject() {
	const element = document.getElementById("project_panel");
	if (element == null) return;
	for (const child of element.children) {
		element.removeChild(child);
	}
}

async function loadProjects() {
	const basePath = "../../assets/projects";

	for (let id = 1; id <= 6; id++) {
		const projectFolder = `p${id}`;
		let response = await fetch(`${basePath}/${projectFolder}/project.json`);

		if (!response.ok) {
			response = await fetch(`${basePath}/placeholder/project.json`);
		}
		if (!response.ok) {
			throw new Error("Failed to load placeholder project");
		}

		const data = await response.json();

		const imageUrls = data.images.map(
			(image) => `${basePath}/${response.ok ? projectFolder : "placeholder"}/${image}`,
		);

		projects.push(new Project(id, data.title, data.stack, data.description, imageUrls));
	}
    console.log(projects);
}
