import createProjectionsHeadings from './utils/projections-headings';

class ValuationContentManager {
  constructor(createProjectionsHeadings) {
    this.createProjectionsHeadings = createProjectionsHeadings;
  }

  addValuationContent(valFinInfoSection) {
    // Add headings
    valFinInfoSection.appendChild(this.createProjectionsHeadings());
  }
}

const valuationContentManager = new ValuationContentManager(
  createProjectionsHeadings,
);

// Exports to valuation-financials-manager.js and valuation-heading-listener
export { valuationContentManager };
