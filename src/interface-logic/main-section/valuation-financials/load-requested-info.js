import { valuationContentManager } from './info-section-content/valuation-content/valuation-content-manager';
import { financialContentManager } from './info-section-content/financials-content/financial-content-manager';

class LoadRequestedInfo {
  constructor(valuationContentManager, financialContentManager) {
    this.valuationContentManager = valuationContentManager;
    this.financialContentManager = financialContentManager;
  }

  loadInfo(headingText, infoContentContainer) {
    if (headingText === 'Valuation') {
      this.valuationContentManager.addValuationContent(infoContentContainer);
    } else if (headingText === 'Financials') {
      this.financialContentManager.addFinancialContent(infoContentContainer);
    }
  }
}

const loadRequestedInfo = new LoadRequestedInfo(
  valuationContentManager,
  financialContentManager,
);

// Exports to valuation, financials heading event listener
export { loadRequestedInfo };
