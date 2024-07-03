import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from './revenue-and-expenses-projections';

class CapexManager {
  constructor(incomeStatementDataManager, revenueAndExpensesProjections) {
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpensesProjections = revenueAndExpensesProjections;
  }

  calculateCapexProjections() {
    console.log('midnight snack');
  }
}

const capexProjectionsManager = new CapexManager(
  incomeStatementDataManager,
  revenueAndExpenses,
);

export { capexProjectionsManager };
