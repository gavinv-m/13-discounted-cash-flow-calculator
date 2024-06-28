import { incomeStatementDataManager } from '../data-centre/refined-data/income-statement';

class ProjectionYearsManager {
  startingProjectionYear = null;
  endingProjectionYear = null;

  constructor(incomeStatementDataManager) {
    this.incomeStatementDataManager = incomeStatementDataManager;
  }

  calculateProjectionYears() {
    const recentYear = this.getRecentYear();
    this.startingProjectionYear = recentYear + 1;
    this.endingProjectionYear = recentYear + 5;
  }

  /**
   * Most recent financial year not in overview
   * Will have to source from the statements
   * Have chosen income statement, revenue line item */
  getRecentYear() {
    const revenueLineItemDescription = 'totalRevenue';

    let revenueByYear = this.incomeStatementDataManager.sendData(
      revenueLineItemDescription,
    );
    revenueByYear = revenueByYear[revenueLineItemDescription];
    revenueByYear = Object.keys(revenueByYear);

    // Data is organised by oldest year to recent year
    return Number(revenueByYear[revenueByYear.length - 1]);
  }
}

const projectionYears = new ProjectionYearsManager(incomeStatementDataManager);

// exports to dcf-manager.js
export { projectionYears };
