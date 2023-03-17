const baseUrl = 'https://api.scryfall.com';

// Declare dropdownContent here
let dropdownContent;

document.addEventListener("DOMContentLoaded", function () {
    ...
});

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

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";
    removeButton.addEventListener("click", function () {
        gallery.removeChild(container);
    });

    const duplicateButton = document.createElement("button");
    duplicateButton.textContent = "Duplicate";
    duplicateButton.className = "duplicate-btn";
    duplicateButton.addEventListener("click", function () {
        addToGallery(token);
    });

    const tapButton = document.createElement("button");
    tapButton.textContent = "Tap";
    tapButton.className = "tap-btn";
    tapButton.addEventListener("click", function () {
        img.classList.toggle("tapped");
    });

    const optionsButton = createOptionsButton();
    const optionsMenu = createOptionsMenu();

    container.appendChild(img);
    container.appendChild(removeButton);
    container.appendChild(duplicateButton);
    container.appendChild(tapButton);
    container.appendChild(optionsButton); // Add this line
    container.appendChild(optionsMenu); // Add this line
    gallery.appendChild(container);
}
});
