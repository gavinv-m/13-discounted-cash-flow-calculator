import { appendChildren, createElement } from '../../utils/element-utils';
import { trendingSearchesManager } from '../../../application-logic/data-centre/searches/trending-searches';
import createTrendingSearchListener from './trending-search-listener';

const addList = function addTrendingSearches() {
  const companiesContainer = createElement('div', {
    id: 'all-trending-searches',
  });
  const trendingSearches = trendingSearchesManager.sendData();

  for (let company in trendingSearches) {
    const companyContainer = createElement('div', {
      id: company,
      classList: ['search-term'],
    });

    const tickerSymbol = createElement('div', { text: company });
    const companyFullName = createElement('div', {
      text: trendingSearches[company],
    });

    createTrendingSearchListener(companyContainer);

    // Append to single company container
    appendChildren(companyContainer, tickerSymbol, companyFullName);

    // Append to companies container
    companiesContainer.appendChild(companyContainer);
  }
  return companiesContainer;
};

// Exports to trending-searches-ui
export default function createTrendingSearches() {
  const trendingSection = document.getElementById('trending-searches');
  const trendingHeading = createElement('h1', { text: 'Trending Searches' });
  trendingSection.appendChild(trendingHeading);

  // Create section with trending searches
  trendingSection.appendChild(addList());
}
