class RevenueAndExpensesUIManager {
  constructor() {}

  addRevenueAndExpensesProjections(valuationContentBox) {
    const mockRE = document.createElement('h1');
    mockRE.textContent = 'Revenue & Expenses Projections';
    valuationContentBox.appendChild(mockRE);
  }
}

const revenueAndExpensesUIManager = new RevenueAndExpensesUIManager();

// Exports to valuation-content-manager, and load-requested-content.js
export { revenueAndExpensesUIManager };
