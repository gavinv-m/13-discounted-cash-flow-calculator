import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';

class LoadRequestedContent {
  constructor(revenueAndExpensesUIManager) {
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
  }

  loadContent(projectionHeadingText, valuationContentBox) {
    if (projectionHeadingText === 'Revenue & Expenses') {
      this.revenueAndExpensesUIManager.addRevenueAndExpensesProjections(
        valuationContentBox,
      );
    }
  }
}

const loadRequestedContentManager = new LoadRequestedContent(
  revenueAndExpensesUIManager,
);

// Exports to heading-event-listeners.js
export { loadRequestedContentManager };
