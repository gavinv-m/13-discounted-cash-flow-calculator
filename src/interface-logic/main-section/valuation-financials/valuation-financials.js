import valFinSection from './utils/render-valuation-financials-section';

class ValuationFinancialsManager {
  constructor(valFinSection) {
    this.valFinSection = valFinSection;
  }

  populateValuationFinancialsSection(mainContent) {
    const valFinSection = this.valFinSection(mainContent);
  }
}

const valuationFinancialsManager = new ValuationFinancialsManager(
  valFinSection,
);

// Exports to main-section-manager.js
export { valuationFinancialsManager };
