import valFinSection from './utils/render-valuation-financials-section';
import renderValFinHeadings from './utils/render-headings';
import renderValFinInfoSection from './utils/render-val-fin-info-section';

class ValuationFinancialsManager {
  constructor(valFinSection, renderValFinHeadings, renderValFinInfoSection) {
    this.valFinSection = valFinSection;
    this.renderValFinHeadings = renderValFinHeadings;
    this.renderValFinInfoSection = renderValFinInfoSection;
  }

  populateValuationFinancialsSection(mainContent) {
    const valFinSection = this.valFinSection(mainContent);
    this.renderValFinHeadings(valFinSection);
    this.renderValFinInfoSection(valFinSection);
  }
}

const valuationFinancialsManager = new ValuationFinancialsManager(
  valFinSection,
  renderValFinHeadings,
  renderValFinInfoSection,
);

// Exports to main-section-manager.js
export { valuationFinancialsManager };
