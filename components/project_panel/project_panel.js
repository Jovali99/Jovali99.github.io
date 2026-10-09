let currentSlide = 0;
let track;

function updateCarousel() {
	track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function initPP(id) {
	const slides = initProject(id);

	const previousButton = document.querySelector(".carousel_previous");
	const nextButton = document.querySelector(".carousel_next");

	nextButton?.addEventListener("click", () => {
		currentSlide++;
		if (currentSlide >= slides.length) currentSlide = 0;
		updateCarousel();
	});

	previousButton?.addEventListener("click", () => {
		currentSlide--;
		if (currentSlide < 0) currentSlide = slides.length - 1;
		updateCarousel();
	});
	if (slides?.length <= 1) {
		nextButton.style.visibility = "hidden";
		previousButton.style.visibility = "hidden";
	}
}

function initProject(id) {
	track = document.querySelector(".carousel_track");
	let project = projects[id - 1];
	console.log(project);
	for (const src of project.imageUrls) {
		let listItem = document.createElement("li");
		let img = document.createElement("img");
		img.src = src;
		listItem.appendChild(img);
		track?.appendChild(listItem);
	}

	const infoCont = document.querySelector(".information_panel_container");
	const title = document.querySelector(".ip_title");
	const desc = document.querySelector(".description");
	const stack = document.querySelector(".stack");

	title.textContent = project.title;
	desc.textContent = project.description;
	for (const tech of project.stack) {
		const listItem = document.createElement("li");
		listItem.textContent = tech;
		stack?.appendChild(listItem);
	}

	return track?.children;
}

function clearProject() {
	const element = document.getElementById("project_panel");
	if (element == null) return;
	for (const child of element.children) {
		element.removeChild(child);
	}
}
