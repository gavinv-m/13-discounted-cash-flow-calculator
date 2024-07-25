import rendervalFinSection from './utils/render-valuation-financials-section';
import renderValFinHeadings from './utils/render-headings';
import renderValFinInfoSection from './utils/render-val-fin-info-section';

class ValuationFinancialsManager {
  constructor(
    rendervalFinSection,
    renderValFinHeadings,
    renderValFinInfoSection,
  ) {
    this.rendervalFinSection = rendervalFinSection;
    this.renderValFinHeadings = renderValFinHeadings;
    this.renderValFinInfoSection = renderValFinInfoSection;
  }

  populateValuationFinancialsSection(mainContent) {
    const valFinSection = this.rendervalFinSection(mainContent);
    this.renderValFinHeadings(valFinSection);
    this.renderValFinInfoSection(valFinSection);
  }
}

const valuationFinancialsManager = new ValuationFinancialsManager(
  rendervalFinSection,
  renderValFinHeadings,
  renderValFinInfoSection,
);

// Exports to main-section-manager.js
export { valuationFinancialsManager };
