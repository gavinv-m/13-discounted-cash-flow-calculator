import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';
import aggregateSignedFinData from '../utils/aggregate-non-absolute';

class CashFlowStatementDataManager {
  cashFlowStatementData = null;
  signedCashFlowStatementData = null;

  latestToOldestYearsAndMonth = null;
  oldestToLatestYearsAndMonth = null;
  latestToOldestYearsOnly = null;
  oldestToLatestYearsOnly = null;

  constructor(getYearsAvailable, aggregateSignedFinData) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
    this.aggregateSignedFinData = aggregateSignedFinData;
  }

  handleCashFlowStatementData(cashFlowStatementData) {
    this.cashFlowStatementData = aggregateFinancialData(cashFlowStatementData);

    // Need to maintain signed version especially for changes between years
    this.signedCashFlowStatementData = this.aggregateSignedFinData(
      cashFlowStatementData,
    );

    const years = this.getYearsAvailable(cashFlowStatementData);
    this.latestToOldestYearsAndMonth = years.latestToOldestYearsAndMonth;
    this.oldestToLatestYearsAndMonth = years.oldestToLatestYearsAndMonth;
    this.latestToOldestYearsOnly = years.latestToOldestYearsOnly;
    this.oldestToLatestYearsOnly = years.oldestToLatestYearsOnly;
  }

  // Send aggregated with absolute values
  sendData(...args) {
    return this.getFinancialLineItems(args, this.cashFlowStatementData);
  }

  getYears(sortType) {
    return this[sortType];
  }
}

const cashFlowStatementDataManager = new CashFlowStatementDataManager(
  getYearsAvailable,
  aggregateSignedFinData,
);

// Exports to data-centre.js
export { cashFlowStatementDataManager };
