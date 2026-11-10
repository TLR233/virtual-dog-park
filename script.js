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
const STORAGE_KEY = "virtualDogParkPetV1";
const storageNote = "Progress is saved automatically in this browser. Use the same browser and website address to continue.";
const growthStages = ["Puppy", "Young Dog", "Adult Dog"];
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
const nextDayButton = document.querySelector("#next-day-button");
const startOverButton = document.querySelector("#start-over-button");
const storageMessage = document.querySelector("#storage-message");

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
    happiness: 50
  };

  saveDog();
  renderDog();
  petMessage.textContent = "Welcome to the park, " + dog.name + "!";
  petName.focus();
}

// Copy the dog's current information onto the page, safely as text.
function renderDog() {
  adoptionForm.hidden = true;
  petCard.hidden = false;
  const stage = stageFor(dog.day);
  petName.textContent = dog.name;
  document.querySelector("#pet-breed").textContent = dog.breed;
  document.querySelector("#pet-day").textContent = dog.day;
  document.querySelector("#pet-stage").textContent = stage;
  document.querySelector("#happiness-value").textContent = dog.happiness + " / 100";

  const growthBar = document.querySelector("#pet-growth");
  growthBar.value = growthStages.indexOf(stage) + 1;
  growthBar.textContent = growthBar.value + " / 3";

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
  saveDog();
  renderDog();
  petMessage.textContent = action + " time with " + dog.name + ". Happiness: " + dog.happiness + " / 100.";
}

// The stage always comes from the day, so saved data cannot disagree with it.
function stageFor(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

function nextDay() {
  if (dog === null) return;
  dog.day += 1;
  dog.happiness = Math.max(0, dog.happiness - 5);
  saveDog();
  renderDog();
  petMessage.textContent = "Day " + dog.day + " with " + dog.name + ". Growth stage: " + stageFor(dog.day) + ".";
}

// localStorage keeps one JSON record on this browser and website address.
function saveDog() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dog));
    storageMessage.textContent = storageNote;
  } catch (error) {
    storageMessage.textContent = "This browser could not save progress. Keep this page open to continue playing.";
  }
}

// Check stored values before using them, in case the record is damaged.
function isValidDog(savedDog) {
  return savedDog !== null && typeof savedDog === "object"
    && typeof savedDog.name === "string"
    && savedDog.name.trim().length > 0 && savedDog.name.trim().length <= 20
    && Object.keys(breedImages).includes(savedDog.breed)
    && Number.isInteger(savedDog.day) && savedDog.day >= 1
    && Number.isInteger(savedDog.happiness)
    && savedDog.happiness >= 0 && savedDog.happiness <= 100;
}

function loadDog() {
  try {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText === null) return;
    const savedDog = JSON.parse(savedText);
    if (!isValidDog(savedDog)) {
      storageMessage.textContent = "Saved progress could not be read. You can adopt a new dog to start again.";
      return;
    }
    dog = {
      name: savedDog.name.trim(),
      breed: savedDog.breed,
      day: savedDog.day,
      happiness: savedDog.happiness
    };
    renderDog();
    petMessage.textContent = "Welcome back, " + dog.name + "!";
  } catch (error) {
    storageMessage.textContent = "Saved progress could not be loaded. You can adopt a dog to start again.";
  }
}

function startOver() {
  if (dog === null) return;
  const confirmed = window.confirm("Start over? Your dog and its saved progress will be deleted.");
  if (!confirmed) return;

  // Remove only this project's record, keeping other browser data untouched.
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    storageMessage.textContent = "Saved progress could not be deleted. Your dog has been kept. Please allow browser storage and try again.";
    return;
  }
  dog = null;
  adoptionForm.reset();
  clearNameError();
  petCard.hidden = true;
  adoptionForm.hidden = false;
  petMessage.textContent = "Ready for a new friend? Choose a breed and a name.";
  storageMessage.textContent = storageNote;
  nameInput.focus();
}

adoptionForm.addEventListener("submit", adoptDog);
nameInput.addEventListener("input", clearNameError);
feedButton.addEventListener("click", function () {
  increaseHappiness("Feeding");
});
playButton.addEventListener("click", function () {
  increaseHappiness("Play");
});
nextDayButton.addEventListener("click", nextDay);
startOverButton.addEventListener("click", startOver);

// Restore a saved dog as soon as the page opens.
loadDog();
