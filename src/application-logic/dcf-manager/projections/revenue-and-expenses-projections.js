import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';
import projectRevenue from '../utils/project-revenue';

class RevenueAndExpensesProjections {
  projections = {};
  revenueGrowthRates = null;

  constructor(incomeStatementDataManager) {
    this.incomeStatementDataManager = incomeStatementDataManager;
  }

  projectRevenueAndExpenses() {
    this.projectRevenue();
  }

  projectRevenue() {
    const revenueLineItemDescription = 'totalRevenue';

    let revenueByYear = this.incomeStatementDataManager.sendData(
      revenueLineItemDescription,
    );
    revenueByYear = revenueByYear[revenueLineItemDescription];
    const data = projectRevenue(revenueByYear);

    this.projections.revenueProjections = data.projections;
    this.revenueGrowthRates = data.growthRates;
  }
}

const revenueAndExpenses = new RevenueAndExpensesProjections(
  incomeStatementDataManager,
);

// Exports to dcf-manager.js
export { revenueAndExpenses };
