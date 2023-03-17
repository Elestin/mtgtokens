const baseUrl = 'https://api.scryfall.com';

// Declare dropdownContent here
let dropdownContent;

document.addEventListener("DOMContentLoaded", function () {
    const search = document.getElementById("search");
    const gallery = document.getElementById("gallery");
    const tapUntapAllButton = document.getElementById("tap-untap-all");
    const removeAllButton = document.getElementById("remove-all");

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
                    listItem.textContent = `${token.name} (${token.power}/${token.toughness}) - ${token.color_identity}`;
                    listItem.addEventListener("click", function () {
                        addToGallery(token);
                    });
                    dropdownContent.appendChild(listItem);
                });
                dropdownContent.style.display = "block";
            });
    });


    tapUntapAllButton.addEventListener("click", function () {
        const tokenContainers = document.querySelectorAll(".token-container");
        tokenContainers.forEach((container) => {
            const img = container.querySelector("img");
            img.classList.toggle("tapped");
        });
    });
    
    removeAllButton.addEventListener("click", function () {
        while (gallery.firstChild) {
            gallery.removeChild(gallery.firstChild);
        }
    });

function addToGallery(token) {
    dropdownContent.style.display = "none";

    const container = document.createElement("div");
    container.className = "token-container";

    const img = document.createElement("img");
    img.src = token.image_uris.normal;
    img.alt = `${token.name} (${token.power}/${token.toughness})`;

    img.addEventListener("click", function () {
        img.classList.toggle("tapped");
        if (img.classList.contains("tapped")) {
            container.classList.add("tapped");
        } else {
            container.classList.remove("tapped");
        }
    });

    const counter = document.createElement("div");
    counter.className = "counter";
    counter.textContent = "1";
    counter.addEventListener("click", function () {
        const newCount = parseInt(prompt("Enter new count"));
        if (!isNaN(newCount)) {
            counter.textContent = newCount;
        }
    });

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

    container.appendChild(img);
    container.appendChild(counter);
    container.appendChild(removeButton);
    container.appendChild(duplicateButton);
    gallery.appendChild(container);
}
    function toggleSize() {
        gallery.classList.toggle("small");
}

const toggleSizeButton = document.getElementById("toggle-size");
toggleSizeButton.addEventListener("click", toggleSize);
const toggleFullscreenButton = document.getElementById("toggle-fullscreen");

toggleFullscreenButton.addEventListener("click", function () {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

});
