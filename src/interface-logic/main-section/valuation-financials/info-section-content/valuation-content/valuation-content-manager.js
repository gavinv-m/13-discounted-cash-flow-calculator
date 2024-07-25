import createProjectionsHeadings from './utils/projections-headings';
import renderValuationContentBox from './utils/render-val-content-box';
import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';
import addHeadingsEventListeners from './utils/heading-event-listeners';

class ValuationContentManager {
  constructor(
    createProjectionsHeadings,
    renderValuationContentBox,
    revenueAndExpensesUIManager,
    addHeadingsEventListeners,
  ) {
    this.createProjectionsHeadings = createProjectionsHeadings;
    this.renderValuationContentBox = renderValuationContentBox;
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
    this.addHeadingsEventListeners = addHeadingsEventListeners;
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

    // Add event listeners to headings
    const projectionHeadings = document.querySelectorAll('.projection-heading');
    this.addHeadingsEventListeners(projectionHeadings, valuationContentBox);
  }
}

const valuationContentManager = new ValuationContentManager(
  createProjectionsHeadings,
  renderValuationContentBox,
  revenueAndExpensesUIManager,
  addHeadingsEventListeners,
);

// Exports to valuation-financials-manager.js and valuation-heading-listener
export { valuationContentManager };
