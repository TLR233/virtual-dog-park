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

// One object holds the adopted dog's information. No dog is adopted at first.
let dog = null;
const breedImages = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

const adoptionForm = document.querySelector("#adoption-form");
const breedSelect = document.querySelector("#dog-breed");
const nameInput = document.querySelector("#dog-name");
const nameError = document.querySelector("#name-error");
const petCard = document.querySelector("#pet-card");
const petName = document.querySelector("#pet-name");
const petMessage = document.querySelector("#pet-message");
const feedButton = document.querySelector("#feed-button");
const playButton = document.querySelector("#play-button");

function showNameError(message) {
  nameError.textContent = message;
  nameError.hidden = false;
  nameInput.setAttribute("aria-invalid", "true");
  nameInput.focus();
}

function clearNameError() {
  nameError.textContent = "";
  nameError.hidden = true;
  nameInput.setAttribute("aria-invalid", "false");
}

// Check the name, then create one dog with the required starting values.
function adoptDog(event) {
  event.preventDefault();
  if (dog !== null) return;

  const name = nameInput.value.trim();
  if (name.length === 0) {
    showNameError("Please enter a dog name. A name cannot contain only spaces.");
    return;
  }
  if (name.length > 20) {
    showNameError("Please use a name with 20 characters or fewer.");
    return;
  }

  clearNameError();
  nameInput.value = name;
  dog = {
    name: name,
    breed: breedSelect.value,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  adoptionForm.hidden = true;
  petCard.hidden = false;
  renderDog();
  petMessage.textContent = "Welcome to the park, " + dog.name + "!";
  petName.focus();
}

// Copy the dog's current information onto the page, safely as text.
function renderDog() {
  petName.textContent = dog.name;
  document.querySelector("#pet-breed").textContent = dog.breed;
  document.querySelector("#pet-day").textContent = dog.day;
  document.querySelector("#pet-stage").textContent = dog.stage;
  document.querySelector("#happiness-value").textContent = dog.happiness + " / 100";

  const happinessBar = document.querySelector("#pet-happiness");
  happinessBar.value = dog.happiness;
  happinessBar.textContent = dog.happiness + " / 100";

  const petImage = document.querySelector("#pet-image");
  petImage.src = breedImages[dog.breed];
  petImage.alt = "Illustration of a " + dog.breed + ".";
}

// Feed and Play share the same rule: add 10, stopping at 100.
function increaseHappiness(action) {
  if (dog === null) return;
  dog.happiness = Math.min(100, dog.happiness + 10);
  renderDog();
  petMessage.textContent = action + " time with " + dog.name + ". Happiness: " + dog.happiness + " / 100.";
}

adoptionForm.addEventListener("submit", adoptDog);
nameInput.addEventListener("input", clearNameError);
feedButton.addEventListener("click", function () {
  increaseHappiness("Feeding");
});
playButton.addEventListener("click", function () {
  increaseHappiness("Play");
});
