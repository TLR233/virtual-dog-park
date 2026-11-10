// A short list keeps this first interaction easy to understand.
const careTips = [
  "Make time for a daily walk. Let your dog pause and explore new smells along the way.",
  "Keep fresh drinking water available, especially after a walk or a lively game.",
  "Try a short learning game. Gentle practice and praise make time together fun.",
  "Set aside a quiet, comfortable place where your dog can rest after a busy day."
];

let currentTip = 0;
const tipText = document.querySelector("#care-tip");
const tipButton = document.querySelector("#care-tip-button");

// Move to the next tip; after the last tip, start from the beginning.
function showNextTip() {
  currentTip = (currentTip + 1) % careTips.length;
  tipText.textContent = careTips[currentTip];
}

tipButton.addEventListener("click", showNextTip);
