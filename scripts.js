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

    // Create options button
    const optionsButton = document.createElement("button");
    optionsButton.textContent = "Options";
    optionsButton.className = "options-btn";
    optionsButton.style.position = "absolute";
    optionsButton.style.bottom = "4px";
    optionsButton.style.left = "4px";

    // Create options menu
    const optionsMenu = document.createElement("div");
    optionsMenu.className = "options-menu";
    optionsMenu.style.display = "none";

    // Add Keyword button
    const addKeywordButton = document.createElement("button");
    addKeywordButton.textContent = "Add Keyword";
    addKeywordButton.className = "add-keyword-btn";
    // Implement the functionality for adding keywords here

    // Add Counter button
    const addCounterButton = document.createElement("button");
    addCounterButton.textContent = "Add Counter";
    addCounterButton.className = "add-counter-btn";
    // Implement the functionality for adding counters here

    optionsMenu.appendChild(addKeywordButton);
    optionsMenu.appendChild(addCounterButton);

    // Toggle options menu on options button click
    optionsButton.addEventListener("click", function () {
        optionsMenu.style.display = optionsMenu.style.display === "none" ? "block" : "none";
    });

    container.appendChild(img);
    container.appendChild(removeButton);
    container.appendChild(duplicateButton);
    container.appendChild(tapButton);
    container.appendChild(optionsButton);
    container.appendChild(optionsMenu);
    gallery.appendChild(container);
}

});
