import createValuationStatement from './utils/valuation-statement';

class RevenueAndExpensesUIManager {
  constructor(createValuationStatement) {
    this.createValuationStatement = createValuationStatement;
  }

  addRevenueAndExpensesProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.createValuationStatement());
  }
}

const revenueAndExpensesUIManager = new RevenueAndExpensesUIManager(
  createValuationStatement,
);

// Exports to valuation-content-manager, and load-requested-content.js
export { revenueAndExpensesUIManager };
