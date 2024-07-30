import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';
import getYearsAvailable from '../utils/years-available';

class BalanceSheetDataManager {
  balanceSheetData = null;
  yearsLatestToOldest = null;
  yearsOldestToLatest = null;

  constructor(getYearsAvailable) {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
    this.getYearsAvailable = getYearsAvailable;
  }

  handleBalanceSheetData(balanceSheetData) {
    this.balanceSheetData = aggregateFinancialData(balanceSheetData);

    const years = this.getYearsAvailable(balanceSheetData);
    this.yearsLatestToOldest = years.latestToOldest;
    this.yearsOldestToLatest = years.oldestToLatest;
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
