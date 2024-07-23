import { sidebarManager } from './sidebar/sidebar-manager';
import { mainSectionManager } from './main-section/main-section-manager';

class InterfaceManager {
  constructor(sidebarManager, mainSectionManager) {
    this.sidebarManager = sidebarManager;
    this.mainSectionManager = mainSectionManager;
  }

  populateInterface() {
    this.sidebarManager.populateSidebar();
    this.mainSectionManager.populateMainSection();
  }
}

const interfaceManager = new InterfaceManager(
  sidebarManager,
  mainSectionManager,
);

// Exports to main-controller.js
export { interfaceManager };
