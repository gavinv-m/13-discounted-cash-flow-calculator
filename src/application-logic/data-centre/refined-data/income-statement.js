import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';

class IncomeStatementDataManager {
  incomeStatementData = null;

  constructor() {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
  }

  handleIncomeStatementData(incomeStatementData) {
    this.incomeStatementData = aggregateFinancialData(incomeStatementData);
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.incomeStatementData);
  }
}

const incomeStatementDataManager = new IncomeStatementDataManager();

// Exports to data-centre.js
export { incomeStatementDataManager };
