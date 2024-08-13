import { sidebarManager } from './sidebar/sidebar-manager';
import { mainSectionManager } from './main-section/main-section-manager';
import closeVisibleDropDowns from './utils/document-click-listener';

class InterfaceManager {
  constructor(sidebarManager, mainSectionManager, closeVisibleDropDowns) {
    this.sidebarManager = sidebarManager;
    this.mainSectionManager = mainSectionManager;
    this.closeVisibleDropDowns = closeVisibleDropDowns;
  }

  populateInterface() {
    this.sidebarManager.populateSidebar();
    this.mainSectionManager.populateMainSection();
    this.closeVisibleDropDowns();
  }
}

const interfaceManager = new InterfaceManager(
  sidebarManager,
  mainSectionManager,
  closeVisibleDropDowns,
);

// Exports to main-controller.js
export { interfaceManager };
