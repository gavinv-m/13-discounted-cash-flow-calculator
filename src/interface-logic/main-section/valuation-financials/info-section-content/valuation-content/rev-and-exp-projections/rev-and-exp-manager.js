import displayProjections from './utils/display-rev-and-exp-projections';

class RevenueAndExpensesUIManager {
  constructor(displayProjections) {
    this.displayProjections = displayProjections;
  }

  addRevenueAndExpensesProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.displayProjections());
  }
}

const revenueAndExpensesUIManager = new RevenueAndExpensesUIManager(
  displayProjections,
);

// Exports to valuation-content-manager, and load-requested-content.js
export { revenueAndExpensesUIManager };
