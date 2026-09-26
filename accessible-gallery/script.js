const DEFAULT_MESSAGE = "Hover over or tab to an image below to display it here.";

function findImage(element) {
  return element.tagName === "IMG" ? element : element.querySelector("img");
}

function upDate(previewPic) {
  const source = findImage(previewPic);
  const display = document.getElementById("image");
  display.style.backgroundImage = "url('" + source.src + "')";
  display.textContent = source.alt;
}

function undo() {
  const display = document.getElementById("image");
  display.style.backgroundImage = "url('')";
  display.textContent = DEFAULT_MESSAGE;
}

function activateOnEnterOrSpace(event, figure) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    upDate(figure);
  }
}

function prepareFigures() {
  const figures = document.querySelectorAll("#thumbnails figure");
  console.log("onload fired, preparing " + figures.length + " figures");

  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];
    const source = findImage(figure);

    figure.setAttribute("tabindex", "0");
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "Preview " + source.alt);

    figure.addEventListener("click", function () {
      upDate(figure);
    });
    figure.addEventListener("keydown", function (event) {
      activateOnEnterOrSpace(event, figure);
    });
  }

  console.log("tabindex added to " + figures.length + " figures");
}
