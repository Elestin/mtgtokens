const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const baseUrl = 'https://api.scryfall.com';

// Declare dropdownContent here
let dropdownContent;

document.addEventListener("DOMContentLoaded", function () {
    const search = document.getElementById("search");
    const gallery = document.getElementById("gallery");

    // Initialize dropdownContent here
    dropdownContent = document.getElementById("dropdown-content");

    search.addEventListener("input", function (event) {
        const query = event.target.value;
        if (query.length < 3) {
            dropdownContent.style.display = "none";
            return;
        }

        fetch(`https://api.scryfall.com/cards/search?q=t:token+${encodeURIComponent(query)}`)
            .then((response) => response.json())
            .then((data) => {
                dropdownContent.innerHTML = "";
                data.data.forEach((token) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${token.name} (${token.power}/${token.toughness})`;
                    listItem.addEventListener("click", function () {
                        addToGallery(token);
                    });
                    dropdownContent.appendChild(listItem);
                });
                dropdownContent.style.display = "block";
            });
    });
function addToGallery(token) {
    dropdownContent.style.display = "none";

    const container = document.createElement("div");
    container.className = "token-container";

    const img = document.createElement("img");
    img.src = token.image_uris.normal;
    img.alt = `${token.name} (${token.power}/${token.toughness})`;

    const optionsButton = document.createElement("button");
    optionsButton.textContent = "Options";
    optionsButton.className = "options-btn";
    optionsButton.addEventListener("click", function () {
        optionsMenu.style.display = optionsMenu.style.display === "block" ? "none" : "block";
    });

    const optionsMenu = document.createElement("div");
    optionsMenu.className = "options-menu";

    const tapButton = document.createElement("button");
    tapButton.textContent = "Tap";
    tapButton.addEventListener("click", function () {
        img.classList.toggle("tapped");
    });

    const duplicateButton = document.createElement("button");
    duplicateButton.textContent = "Duplicate";
    duplicateButton.addEventListener("click", function () {
        addToGallery(token);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        gallery.removeChild(container);
    });

    optionsMenu.appendChild(tapButton);
    optionsMenu.appendChild(duplicateButton);
    optionsMenu.appendChild(removeButton);

    container.appendChild(img);
    container.appendChild(optionsButton);
    container.appendChild(optionsMenu);
    gallery.appendChild(container);
}  
});
