import aggregateFinancialData from '../utils/data-aggregator';

class CashFlowStatementDataManager {
  cashFlowStatementData = null;

  constructor() {}

  handleCashFlowStatementData(cashFlowStatementData) {
    this.cashFlowStatementData = aggregateFinancialData(cashFlowStatementData);
  }
}

const cashFlowStatementDataManager = new CashFlowStatementDataManager();

// Exports to data-centre.js
export { cashFlowStatementDataManager };
