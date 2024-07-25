import rendervalFinSection from './utils/render-valuation-financials-section';
import renderValFinHeadings from './utils/render-headings';
import renderValFinInfoSection from './utils/render-val-fin-info-section';
import { valuationContentManager } from './info-section-content/valuation-content/valuation-content-manager';

class ValuationFinancialsManager {
  constructor(
    rendervalFinSection,
    renderValFinHeadings,
    renderValFinInfoSection,
    valuationContentManager,
  ) {
    this.rendervalFinSection = rendervalFinSection;
    this.renderValFinHeadings = renderValFinHeadings;
    this.renderValFinInfoSection = renderValFinInfoSection;
    this.valuationContentManager = valuationContentManager;
  }

  populateValuationFinancialsSection(mainContent) {
    const valFinSection = this.rendervalFinSection(mainContent);
    this.renderValFinHeadings(valFinSection);
    const infoContentContainer = this.renderValFinInfoSection(valFinSection);

    // Add valuation content on load
    this.valuationContentManager.addValuationContent(infoContentContainer);
  }
}

const valuationFinancialsManager = new ValuationFinancialsManager(
  rendervalFinSection,
  renderValFinHeadings,
  renderValFinInfoSection,
  valuationContentManager,
);

// Exports to main-section-manager.js
export { valuationFinancialsManager };
