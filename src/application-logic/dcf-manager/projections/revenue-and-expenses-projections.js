import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';

class RevenueAndExpensesProjections {
  projections = {};

  constructor(incomeStatementDataManager) {
    this.incomeStatementDataManager = incomeStatementDataManager;
  }

  projectRevenueAndExpenses() {
    this.projectRevenue();
  }

  projectRevenue() {
    const revenueByYear =
      this.incomeStatementDataManager.sendData('totalRevenue');
  }
}

const revenueAndExpenses = new RevenueAndExpensesProjections(
  incomeStatementDataManager,
);

// Exports to dcf-manager.js
export { revenueAndExpenses };
