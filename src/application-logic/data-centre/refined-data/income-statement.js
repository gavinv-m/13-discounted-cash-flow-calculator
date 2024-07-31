import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';

class IncomeStatementDataManager {
  incomeStatementData = null;

  latestToOldestYearsAndMonth = null;
  oldestToLatestYearsAndMonth = null;
  latestToOldestYearsOnly = null;
  oldestToLatestYearsOnly = null;

  constructor(getYearsAvailable) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
  }

  handleIncomeStatementData(incomeStatementData) {
    this.incomeStatementData = aggregateFinancialData(incomeStatementData);

    const years = this.getYearsAvailable(incomeStatementData);
    this.latestToOldestYearsAndMonth = years.latestToOldestYearsAndMonth;
    this.oldestToLatestYearsAndMonth = years.oldestToLatestYearsAndMonth;
    this.latestToOldestYearsOnly = years.latestToOldestYearsOnly;
    this.oldestToLatestYearsOnly = years.oldestToLatestYearsOnly;
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.incomeStatementData);
  }

  getYears(sortType) {
    return this[sortType];
  }
}

const incomeStatementDataManager = new IncomeStatementDataManager(
  getYearsAvailable,
);

// Exports to data-centre.js
export { incomeStatementDataManager };
