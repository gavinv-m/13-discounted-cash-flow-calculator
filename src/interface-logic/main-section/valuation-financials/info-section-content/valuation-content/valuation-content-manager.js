import createProjectionsHeadings from './utils/projections-headings';
import renderValuationContentBox from './utils/render-val-content-box';

class ValuationContentManager {
  constructor(createProjectionsHeadings, renderValuationContentBox) {
    this.createProjectionsHeadings = createProjectionsHeadings;
    this.renderValuationContentBox = renderValuationContentBox;
  }

  addValuationContent(valFinInfoSection) {
    valFinInfoSection.appendChild(this.createProjectionsHeadings());

    // Create, store and append the content box headings will manipulate
    const valuationContentBox = valFinInfoSection.appendChild(
      this.renderValuationContentBox(),
    );

    //
  }
}

const valuationContentManager = new ValuationContentManager(
  createProjectionsHeadings,
  renderValuationContentBox,
);

// Exports to valuation-financials-manager.js and valuation-heading-listener
export { valuationContentManager };
