const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const baseUrl = 'https://api.scryfall.com';

document.addEventListener("DOMContentLoaded", function () {
    const search = document.getElementById("search");
    const dropdownContent = document.getElementById("dropdown-content");
    const gallery = document.getElementById("gallery");

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
        const img = document.createElement("img");
        img.src = token.image_uris.normal;
        img.alt = `${token.name} (${token.power}/${token.toughness})`;
        gallery.appendChild(img);
    }
});
