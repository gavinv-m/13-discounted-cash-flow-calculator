import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';
import { capexUIManager } from './capex-projections/capex-ui-manager';

class LoadRequestedContent {
  constructor(revenueAndExpensesUIManager, capexUIManager) {
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
    this.capexUIManager = capexUIManager;
  }

  loadContent(projectionHeadingText, valuationContentBox) {
    if (projectionHeadingText === 'Revenue & Expenses') {
      this.revenueAndExpensesUIManager.addRevenueAndExpensesProjections(
        valuationContentBox,
      );
    } else if (projectionHeadingText === 'CAPEX') {
      this.capexUIManager.addCapexProjections(valuationContentBox);
    }
  }
}

const loadRequestedContentManager = new LoadRequestedContent(
  revenueAndExpensesUIManager,
  capexUIManager,
);

// Exports to heading-event-listeners.js
export { loadRequestedContentManager };
