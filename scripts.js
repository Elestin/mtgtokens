document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = document.getElementById('searchInput').value;
  const response = await fetch(`https://api.scryfall.com/cards/search?q=t:token+${query}`);
  const data = await response.json();
  const tokens = data.data;

  updateDropdown(tokens);
});

function updateDropdown(tokens) {
  const dropdown = document.getElementById('tokenDropdown');
  dropdown.innerHTML = '';

  tokens.slice(0, 10).forEach((token) => {
    const option = document.createElement('option');
    option.value = token.id;
    option.textContent = `${token.name} (${token.power}/${token.toughness})`;
    option.tokenData = token;
    dropdown.appendChild(option);
  });
}

document.getElementById('tokenDropdown').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const token = selectedOption.tokenData;

  if (token) {
    const tokenElement = createTokenElement(token);
    const gallery = document.getElementById('gallery');
    gallery.appendChild(tokenElement);
  }
});

function createTokenElement(token) {
  const tokenElement = document.createElement('div');
  tokenElement.classList.add('token');

  const tokenImage = document.createElement('img');
  tokenImage.src = token.image_url;
  tokenElement.appendChild(tokenImage);

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    tokenElement.remove();
  });
  tokenElement.appendChild(removeButton);

  const duplicateButton = document.createElement('button');
  duplicateButton.textContent = 'Duplicate';
  duplicateButton.addEventListener('click', () => {
    const duplicateToken = createTokenElement(token);
    gallery.appendChild(duplicateToken);
  });
  tokenElement.appendChild(duplicateButton);

  const tapButton = document.createElement('button');
  tapButton.textContent = 'Tap';
  tapButton.addEventListener('click', () => {
    tokenElement.classList.toggle('tapped');
  });
  tokenElement.appendChild(tapButton);

  const addCounterButton = document.createElement('button');
  addCounterButton.textContent = 'Add Counter';
  addCounterButton.addEventListener('click', () => {
    const counter = document.createElement('div');
    counter.classList.add('counter');
    tokenElement.appendChild(counter);
  });
  tokenElement.appendChild(addCounterButton);

  const removeCounterButton = document.createElement('button');
  removeCounterButton.textContent = 'Remove Counter';
  removeCounterButton.addEventListener('click', () => {
    const counters = tokenElement.getElementsByClassName('counter');
    if (counters.length > 0) {
      counters[counters.length - 1].remove();
    }
  });
  tokenElement.appendChild(removeCounterButton);

  return tokenElement;
}
