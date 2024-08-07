import { displayBestMatches } from './best-matches';

const ticker = async function searchTicker(keyword) {
  const apiKey = 'demo';
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

// Exports to render-search-section.js
export default function addSearchBoxEventListener(searchBox) {
  const debouncedSearch = debounce(async (keyword) => {
    const bestMatches = await ticker(keyword);
    displayBestMatches(bestMatches);
  }, 600);

  searchBox.addEventListener('input', (event) => {
    // If input clear, remove prev loaded matches
    if (searchBox.value === '') {
      const parentContainer = document.getElementById('search-box-error');
      const bestMatches = document.getElementById('best-matches');
      const prevLoaded = parentContainer.contains(bestMatches);

      if (prevLoaded === true) parentContainer.removeChild(bestMatches);
    }
    debouncedSearch(event.target.value);
  });
}
