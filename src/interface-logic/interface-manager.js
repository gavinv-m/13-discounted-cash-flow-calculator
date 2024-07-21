import { sidebarManager } from './sidebar/sidebar-manager';

class InterfaceManager {
  constructor(sidebarManager) {
    this.sidebarManager = sidebarManager;
  }

  populateInterface() {
    this.sidebarManager.populateSidebar();
  }
}

const interfaceManager = new InterfaceManager(sidebarManager);

// Exports to main-controller.js
export { interfaceManager };
