var layer = 1;
var transitionRunning = false;

function informationInit() {
  const infoLayer1 = document.querySelector(".info_text_layer1");
  infoLayer1.classList.add("itl_fade_in");
  startInformationTransition(null, infoLayer1, 1, true);
}

function informationAnimation() {
  const infoLayer1 = document.querySelector(".info_text_layer1");
  const infoLayer2 = document.querySelector(".info_text_layer2");

  const transitionDist = 100;

  if (currentScroll >= transitionDist && layer === 1 && !transitionRunning) {
    startInformationTransition(infoLayer1, infoLayer2, 2);
  }

  if (currentScroll < transitionDist && layer === 2 && !transitionRunning) {
    startInformationTransition(infoLayer2, infoLayer1, 1);
  }
}

function startInformationTransition(
  outgoingLayer,
  incomingLayer,
  targetLayer,
  initial = false,
) {
  transitionRunning = true;
  if (initial) {
    setHidden(incomingLayer);

    incomingLayer.classList.remove("itl_fade_out");
    incomingLayer.classList.add("itl_fade_in");

    function initialFinished(event) {
      if (event.animationName !== "fadeIn") return;

      incomingLayer.removeEventListener("animationend", initialFinished);

      setVisible(incomingLayer);
      incomingLayer.classList.remove("itl_fade_in");

      layer = targetLayer;
      transitionRunning = false;
    }

    incomingLayer.addEventListener("animationend", initialFinished);

    return;
  }

  setVisible(outgoingLayer);
  setHidden(incomingLayer);

  // Start outgoing animation
  outgoingLayer.classList.remove("itl_fade_in");
  outgoingLayer.classList.add("itl_fade_out");

  // Start incoming animation
  incomingLayer.classList.remove("itl_fade_out");
  incomingLayer.classList.add("itl_fade_in");

  function transitionFinished(event) {
    if (event.animationName !== "fadeOut") return;

    outgoingLayer.removeEventListener("animationend", transitionFinished);

    setHidden(outgoingLayer);
    setVisible(incomingLayer);

    outgoingLayer.classList.remove("itl_fade_out");
    incomingLayer.classList.remove("itl_fade_in");

    layer = targetLayer;
    transitionRunning = false;
  }
  outgoingLayer.addEventListener("animationend", transitionFinished);
}

function setVisible(element) {
  element.classList.add("itl_visible");
  element.classList.remove("itl_hidden");
}

function setHidden(element) {
  element.classList.add("itl_hidden");
  element.classList.remove("itl_visible");
}

function fadeOut() {
  const infoLayer1 = document.querySelector(".info_text_layer1");
  const infoLayer2 = document.querySelector(".info_text_layer2");
  switch (layer) {
    case 1:
      infoLayer1.classList.add("itl_fade_in");

      setTimeout(() => {
        console.log("L1: fade out");
        setVisible(infoLayer1);
        infoLayer1.classList.remove("itl_fade_in");
        infoLayer1.classList.add("itl_fade_out");
      }, 2000);
      setTimeout(() => {
        console.log("L1: Hidden");
        setHidden(infoLayer1);
        infoLayer1.classList.remove("itl_fade_out");
      }, 5000);

      setTimeout(() => {
        console.log("L2: fade in");
        infoLayer2.classList.add("itl_fade_in");
      }, 2600);
      setTimeout(() => {
        console.log("L2: visible");
        setVisible(infoLayer2);
        infoLayer2.classList.remove("itl_fade_in");
      }, 4600);
      break;
  }
}
