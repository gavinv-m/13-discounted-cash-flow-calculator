import { displayBestMatches } from './best-matches';
import { mainController } from '../../../../main-controller';

const ticker = async function searchTicker(keyword) {
  const apiKey = 'HWDS4EPSIAUWSY7X';
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${apiKey}`;

  try {
    const response = await fetch(url, { mode: 'cors' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const debounce = function debounceSearchTicker(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const debouncedSearch = debounce(async (keyword) => {
  // Check if the input is empty and the best matches container exists
  const bestMatchesContainer = document.getElementById('best-matches');
  if (keyword === '' && bestMatchesContainer) {
    bestMatchesContainer.parentNode.removeChild(bestMatchesContainer);
    return;
  }

  const bestMatches = await ticker(keyword);

  // If the best matches container already exists, remove it
  if (bestMatchesContainer) {
    bestMatchesContainer.parentNode.removeChild(bestMatchesContainer);
    displayBestMatches(bestMatches);
  } else {
    // Otherwise, create a new best matches container
    displayBestMatches(bestMatches);
  }
}, 600);

// Exports to render-search-section.js
export default function addSearchBoxEventListener(searchBox) {
  // Display best matches
  searchBox.addEventListener('input', (event) => {
    const errorBox = document.getElementById('error-box'); // Error box doesnt exist when this function is called
    if (errorBox.textContent !== '') {
      errorBox.textContent = '';
    }

    debouncedSearch(event.target.value);
  });

  // Where no best matches, if user ENTERS ticker manually
  searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && searchBox.value !== '') {
      const symbol = event.target.value;

      // Clear any matches
      const parentContainer = document.getElementById('search-box-error');
      const bestMatches = document.getElementById('best-matches');
      const prevLoaded = parentContainer.contains(bestMatches);

      if (prevLoaded === true) parentContainer.removeChild(bestMatches);

      // Call for requested ticker
      mainController.initializeApp(symbol, 'HWDS4EPSIAUWSY7X');
    }
  });
}
