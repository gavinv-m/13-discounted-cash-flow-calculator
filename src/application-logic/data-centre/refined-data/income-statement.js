import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';

class IncomeStatementDataManager {
  incomeStatementData = null;

  constructor() {}

  handleIncomeStatementData(incomeStatementData) {
    this.incomeStatementData = aggregateFinancialData(incomeStatementData);
  }

  sendData(...args) {
    getFinancialLineItems.call(this, args, this.incomeStatementData);
  }
}

const incomeStatementDataManager = new IncomeStatementDataManager();

// Exports to data-centre.js
export { incomeStatementDataManager };
