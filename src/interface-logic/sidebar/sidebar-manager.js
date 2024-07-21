import { trendingSearchesUI } from './trending-searches';

class SidebarManager {
  constructor(trendingSearchesUI) {
    this.trendingSearchesUI = trendingSearchesUI;
  }

  populateSidebar() {
    this.trendingSearchesUI.populateTrendingSearches();
  }
}

const sidebarManager = new SidebarManager(trendingSearchesUI);

// Exports to interface-manager.js
export { sidebarManager };
