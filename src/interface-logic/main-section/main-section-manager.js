import { dcfInfoManager } from './dcf-info/dcf-info';

class MainSectionManager {
  constructor(dcfInfoManager) {
    this.dcfInfoManager = dcfInfoManager;
  }

  populateMainSection() {
    this.dcfInfoManager.populateDCFInfoSection();
  }
}

const mainSectionManager = new MainSectionManager(dcfInfoManager);

// Exports to interface-manager.js
export { mainSectionManager };
