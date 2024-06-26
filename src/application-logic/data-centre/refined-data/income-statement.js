import aggregateFinancialData from '../utils/data-aggregator';

class IncomeStatementDataManager {
  incomeStatementData = null;

  constructor() {}

  handleIncomeStatementData(incomeStatementData) {
    this.incomeStatementData = aggregateFinancialData(incomeStatementData);
  }
}

const incomeStatementDataManager = new IncomeStatementDataManager();

// Exports to data-centre.js
export { incomeStatementDataManager };
