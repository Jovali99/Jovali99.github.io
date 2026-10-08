//  const star = {
//    color: "white",
//    size: star_size,
//  };

//  const star_size = {
//    large: 4,
//    medium: 4,
//    small: 4,
//  };

function initStars(frequency = 1, size = 200) {
	const grid_container = document.getElementById("grid_container");
	const star_grid = document.getElementById("star_grid");
	if (grid_container == null || star_grid == null) return;

	const width = grid_container.offsetWidth;
	const height = grid_container.offsetHeight;

	console.log("width", width);
	console.log("height", height);

	const columns = Math.floor(width / size);
	const rows = Math.floor(height / size);
	console.log("cols", columns);
	console.log("rows", rows);
	star_grid.style.gridTemplateRows = `repeat(${rows}, ${size}px)`;
	star_grid.style.gridTemplateColumns = `repeat(${columns}, ${size}px)`;
	let count = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			let cell = document.createElement("div");
            cell.classList = "cell";
			star_grid.appendChild(cell);

            let star_quantity = (1 + Math.floor(Math.random()*4))*frequency;
            for(let k = 0; k < star_quantity; k++) {
                let star = createStar();
                cell.appendChild(star);
                count++;
            }
		}
	}
    console.log("star count: ", count);

}

    function createStar() {
        let star = document.createElement("div");
        star.classList.add("star");

        // Size
        const rng = Math.random();
        if(rng > 0.8) star.classList.add("l-star");
        else if(rng > 0.5) star.classList.add("m-star");
        else star.classList.add("s-star");

        // Color
        let c_rng = Math.random();
        if(c_rng > 0.66) star.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        else if(c_rng > 0.33) star.style.backgroundColor = "rgba(207, 241, 255, 0.8)";
        else star.style.backgroundColor = "rgba(181, 233, 255, 0.8)";

        // Pos
        let y = Math.random()*100;
        let x = Math.random()*100;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;

        // Twinkle animation
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * duration;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `-${delay}s`;

        return star;
    }

	////const quantity = (width / 100) * freq;
