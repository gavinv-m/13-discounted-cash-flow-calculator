import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';

class IncomeStatementDataManager {
  incomeStatementData = null;
  yearsLatestToOldest = null;
  yearsOldestToLatest = null;

  constructor(getYearsAvailable) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
  }

  handleIncomeStatementData(incomeStatementData) {
    this.incomeStatementData = aggregateFinancialData(incomeStatementData);

    const years = this.getYearsAvailable(incomeStatementData);
    this.yearsLatestToOldest = years.latestToOldest;
    this.yearsOldestToLatest = years.oldestToLatest;
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.incomeStatementData);
  }
}

const incomeStatementDataManager = new IncomeStatementDataManager(
  getYearsAvailable,
);

// Exports to data-centre.js
export { incomeStatementDataManager };
