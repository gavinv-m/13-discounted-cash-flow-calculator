import { trendingSearchesManager } from './trending-searches';

class SidebarManager {
  constructor(trendingSearchesManager) {
    this.trendingSearchesManager = trendingSearchesManager;
  }

  populateSidebar() {}
}

const sidebarManager = new SidebarManager(trendingSearchesManager);

// Exports to interface-manager.js
export { sidebarManager };
