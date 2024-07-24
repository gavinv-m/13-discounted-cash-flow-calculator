import { dcfInfoManager } from './dcf-info/dcf-info';
import { companyInfoManager } from './company-details/company-info';
import { valuationFinancialsManager } from './valuation-financials/valuation-financials';

class MainSectionManager {
  constructor(dcfInfoManager, companyInfoManager, valuationFinancialsManager) {
    this.mainContent = document.getElementById('main-content');
    this.dcfInfoManager = dcfInfoManager;
    this.companyInfoManager = companyInfoManager;
    this.valuationFinancialsManager = valuationFinancialsManager;
  }

  populateMainSection() {
    this.dcfInfoManager.populateDCFInfoSection(this.mainContent);
    this.companyInfoManager.populateCompanyInfoSection(this.mainContent);
    this.valuationFinancialsManager.populateValuationFinancialsSection(
      this.mainContent,
    );
  }
}

const mainSectionManager = new MainSectionManager(
  dcfInfoManager,
  companyInfoManager,
  valuationFinancialsManager,
);

// Exports to interface-manager.js
export { mainSectionManager };
