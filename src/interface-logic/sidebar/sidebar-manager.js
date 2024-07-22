import { trendingSearchesUI } from './trending-searches';
import { customInputsUI } from './custom-inputs-ui';

class SidebarManager {
  constructor(trendingSearchesUI, customInputsUI) {
    this.trendingSearchesUI = trendingSearchesUI;
    this.customInputsUI = customInputsUI;
  }

  populateSidebar() {
    this.trendingSearchesUI.populateTrendingSearches();
    this.customInputsUI.populateCustomInputs();
  }
}

const sidebarManager = new SidebarManager(trendingSearchesUI, customInputsUI);

// Exports to interface-manager.js
export { sidebarManager };
