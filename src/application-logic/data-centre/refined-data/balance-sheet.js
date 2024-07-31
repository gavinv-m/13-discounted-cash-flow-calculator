import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';

class BalanceSheetDataManager {
  balanceSheetData = null;

  latestToOldestYearsAndMonth = null;
  oldestToLatestYearsAndMonth = null;
  latestToOldestYearsOnly = null;
  oldestToLatestYearsOnly = null;

  constructor(getYearsAvailable) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
  }

  handleBalanceSheetData(balanceSheetData) {
    this.balanceSheetData = aggregateFinancialData(balanceSheetData);

    const years = this.getYearsAvailable(balanceSheetData);
    this.latestToOldestYearsAndMonth = years.latestToOldestYearsAndMonth;
    this.oldestToLatestYearsAndMonth = years.oldestToLatestYearsAndMonth;
    this.latestToOldestYearsOnly = years.latestToOldestYearsOnly;
    this.oldestToLatestYearsOnly = years.oldestToLatestYearsOnly;
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.balanceSheetData);
  }

  getYears(sortType) {
    return this[sortType];
  }
}

const balanceSheetDataManager = new BalanceSheetDataManager(getYearsAvailable);

// Exports to data-centre.js
export { balanceSheetDataManager };
