const DEFAULT_MESSAGE = "Hover over an image below to display here.";

function upDate(previewPic) {
  const display = document.getElementById("image");
  display.style.backgroundImage = "url('" + previewPic.src + "')";
  display.textContent = previewPic.alt;
}

function undo() {
  const display = document.getElementById("image");
  display.style.backgroundImage = "url('')";
  display.textContent = DEFAULT_MESSAGE;
}
