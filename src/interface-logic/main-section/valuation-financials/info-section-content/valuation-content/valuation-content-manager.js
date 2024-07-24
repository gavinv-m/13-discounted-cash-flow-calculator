class ValuationContentManager {
  constructor() {}

  addValuationContent(valFinInfoSection) {
    const jasHeading = document.createElement('h1');
    jasHeading.textContent = 'Jasmine';
    valFinInfoSection.appendChild(jasHeading);
  }
}

const valuationContentManager = new ValuationContentManager();

// Exports to valuation-financials.js and valuation-heading-listener
export { valuationContentManager };
