$(document).ready(function () {
    $("#search-input").on("input", function () {
        const query = $(this).val();

        if (query.length >= 3) {
            searchTokens(query);
        } else {
            $("#token-container").empty();
        }
    });
});

function searchTokens(query) {
    $.getJSON(`https://api.scryfall.com/cards/search?q=t:token+${query}`, function (data) {
        displayTokens(data.data);
    });
}

function displayTokens(tokens) {
    $("#token-container").empty();

    tokens.forEach(function (token) {
        const tokenItem = $("<div class='token-item'></div>");
        const tokenImage = $("<img class='token-image' src='" + token.image_uris.small + "'>");
        const tokenName = $("<p class='token-name'>" + token.name + "</p>");

        tokenItem.append(tokenImage);
        tokenItem.append(tokenName);
        $("#token-container").append(tokenItem);
    });
}
