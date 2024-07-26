import createValuationStatement from './utils/valuation-statement';
import displayProjections from './utils/display-rev-and-exp-projections';

class RevenueAndExpensesUIManager {
  constructor(createValuationStatement, displayProjections) {
    this.createValuationStatement = createValuationStatement;
    this.displayProjections = displayProjections;
  }

  addRevenueAndExpensesProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.createValuationStatement());
    valuationContentBox.appendChild(this.displayProjections());
  }
}

const revenueAndExpensesUIManager = new RevenueAndExpensesUIManager(
  createValuationStatement,
  displayProjections,
);

// Exports to valuation-content-manager, and load-requested-content.js
export { revenueAndExpensesUIManager };
