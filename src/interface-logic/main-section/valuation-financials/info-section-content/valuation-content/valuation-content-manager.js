import createProjectionsHeadings from './utils/projections-headings';
import renderValuationContentBox from './utils/render-val-content-box';
import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';

class ValuationContentManager {
  constructor(
    createProjectionsHeadings,
    renderValuationContentBox,
    revenueAndExpensesUIManager,
  ) {
    this.createProjectionsHeadings = createProjectionsHeadings;
    this.renderValuationContentBox = renderValuationContentBox;
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
  }

  addValuationContent(valFinInfoSection) {
    valFinInfoSection.appendChild(this.createProjectionsHeadings());

    // Create, store and append the content box headings will manipulate
    const valuationContentBox = valFinInfoSection.appendChild(
      this.renderValuationContentBox(),
    );

    // Load page with revenue and expenses projections
    this.revenueAndExpensesUIManager.addRevenueAndExpensesProjections(
      valuationContentBox,
    );
  }
}

const valuationContentManager = new ValuationContentManager(
  createProjectionsHeadings,
  renderValuationContentBox,
  revenueAndExpensesUIManager,
);

// Exports to valuation-financials-manager.js and valuation-heading-listener
export { valuationContentManager };
