const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const baseUrl = 'https://api.scryfall.com';

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length >= 3) {
        searchTokens(query);
    } else {
        searchResults.style.display = 'none';
    }
});

function searchTokens(query) {
    fetch(`${baseUrl}/cards/search?q=t:token+${query}`)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data.data);
        });
}

function displayResults(tokens) {
    searchResults.innerHTML = '';
    tokens.forEach((token) => {
        const li = document.createElement('li');
        li.textContent = `${token.name} (${token.power}/${token.toughness})`;
        searchResults.appendChild(li);
    });
    searchResults.style.display = 'block';
}
