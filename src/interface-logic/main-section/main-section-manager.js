import { dcfInfoManager } from './dcf-info/dcf-info';
import { companyInfoManager } from './company-details/company-info';

class MainSectionManager {
  constructor(dcfInfoManager, companyInfoManager) {
    this.mainContent = document.getElementById('main-content');
    this.dcfInfoManager = dcfInfoManager;
    this.companyInfoManager = companyInfoManager;
  }

  populateMainSection() {
    this.dcfInfoManager.populateDCFInfoSection(this.mainContent);
    this.companyInfoManager.populateCompanyInfoSection();
  }
}

const mainSectionManager = new MainSectionManager(
  dcfInfoManager,
  companyInfoManager,
);

// Exports to interface-manager.js
export { mainSectionManager };
