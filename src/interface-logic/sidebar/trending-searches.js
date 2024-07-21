import createTrendingSearches from './utils/create-trending-searches';

class TrendingSearchesUI {
  constructor(createTrendingSearches) {
    this.createTrendingSearches = createTrendingSearches;
  }

  populateTrendingSearches() {
    this.createTrendingSearches();
  }
}

const trendingSearchesUI = new TrendingSearchesUI(createTrendingSearches);

// Exports to sidebar-manager.js
export { trendingSearchesUI };
