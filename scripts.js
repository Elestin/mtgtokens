const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
const dropdown = document.querySelector(".dropdown-content");
const gallery = document.getElementById("gallery");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchTokens(searchInput.value);
});

async function searchTokens(query) {
  const response = await fetch(`https://api.scryfall.com/cards/search?order=name&q=t%3Atoken+${query}`);
  const data = await response.json();

  displayResults(data.data);
}

function displayResults(tokens) {
  resultsList.innerHTML = "";
  tokens.slice(0, 10).forEach((token) => {
    const option = document.createElement("option");
    option.value = `${token.name} (${token.power}/${token.toughness})`;
    option.dataset.imageUrl = token.image_uris.normal;
    resultsList.appendChild(option);
  });
  dropdown.style.display = "block";
}

resultsList.addEventListener("change", (event) => {
  addTokenToGallery(event.target.selectedOptions[0].dataset.imageUrl);
  dropdown.style.display = "none";
});

function addTokenToGallery(imageUrl) {
  const tokenDiv = document.createElement("div");
  tokenDiv.classList.add("token-container");

  const tokenImage = document.createElement("img");
  tokenImage.src = imageUrl;
  tokenDiv.appendChild(tokenImage);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    tokenDiv.remove();
  });
  tokenDiv.appendChild(removeButton);

  const duplicateButton = document.createElement("button");
  duplicateButton.classList.add("duplicate-btn");
  duplicateButton.textContent = "Duplicate";
  duplicateButton.addEventListener("click", () => {
    addTokenToGallery(imageUrl);
  });
  tokenDiv.appendChild(duplicateButton);

  const tapButton = document.createElement("button");
  tapButton.classList.add("tap-btn");
  tapButton.textContent = "Tap";
  tapButton.addEventListener("click", () => {
    tokenImage.classList.toggle("tapped");
  });
  tokenDiv.appendChild(tapButton);

  gallery.appendChild(tokenDiv);

  dropdown.style.display = "none";
}
