import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';

class CashFlowStatementDataManager {
  cashFlowStatementData = null;

  constructor() {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
  }

  handleCashFlowStatementData(cashFlowStatementData) {
    this.cashFlowStatementData = aggregateFinancialData(cashFlowStatementData);
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.cashFlowStatementData);
  }
}

const cashFlowStatementDataManager = new CashFlowStatementDataManager();

// Exports to data-centre.js
export { cashFlowStatementDataManager };
