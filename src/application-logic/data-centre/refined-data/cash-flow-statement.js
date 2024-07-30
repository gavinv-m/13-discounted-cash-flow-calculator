import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';

class CashFlowStatementDataManager {
  cashFlowStatementData = null;
  yearsLatestToOldest = null;
  yearsOldestToLatest = null;

  constructor(getYearsAvailable) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
  }

  handleCashFlowStatementData(cashFlowStatementData) {
    this.cashFlowStatementData = aggregateFinancialData(cashFlowStatementData);

    const years = this.getYearsAvailable(cashFlowStatementData);
    this.yearsLatestToOldest = years.latestToOldest;
    this.yearsOldestToLatest = years.oldestToLatest;
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.cashFlowStatementData);
  }
}

const cashFlowStatementDataManager = new CashFlowStatementDataManager(
  getYearsAvailable,
);

// Exports to data-centre.js
export { cashFlowStatementDataManager };
