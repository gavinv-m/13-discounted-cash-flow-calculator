import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';

class CashFlowStatementDataManager {
  cashFlowStatementData = null;

  latestToOldestYearsAndMonth = null;
  oldestToLatestYearsAndMonth = null;
  latestToOldestYearsOnly = null;
  oldestToLatestYearsOnly = null;

  constructor(getYearsAvailable) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
  }

  handleCashFlowStatementData(cashFlowStatementData) {
    this.cashFlowStatementData = aggregateFinancialData(cashFlowStatementData);

    const years = this.getYearsAvailable(cashFlowStatementData);
    this.latestToOldestYearsAndMonth = years.latestToOldestYearsAndMonth;
    this.oldestToLatestYearsAndMonth = years.oldestToLatestYearsAndMonth;
    this.latestToOldestYearsOnly = years.latestToOldestYearsOnly;
    this.oldestToLatestYearsOnly = years.oldestToLatestYearsOnly;
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.cashFlowStatementData);
  }

  getYears(sortType) {
    return this[sortType];
  }
}

const cashFlowStatementDataManager = new CashFlowStatementDataManager(
  getYearsAvailable,
);

// Exports to data-centre.js
export { cashFlowStatementDataManager };
