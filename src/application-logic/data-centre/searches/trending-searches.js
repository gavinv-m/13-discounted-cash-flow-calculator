class TrendingSearchesManager {
  trendingSearches = {
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft Corporation',
    NVIDIA: 'NVIDIA Corporation',
    GOOG: 'Alphabet Inc.',
    AMZN: 'Amazon.com, Inc.',
  };

  constructor() {}

  sendData() {
    return this.trendingSearches;
  }
}

const trendingSearchesManager = new TrendingSearchesManager();

export { trendingSearchesManager };
