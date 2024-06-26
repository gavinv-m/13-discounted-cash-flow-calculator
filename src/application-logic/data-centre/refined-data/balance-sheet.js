import aggregateFinancialData from '../utils/data-aggregator';

class BalanceSheetDataManager {
  balanceSheetData = null;

  constructor() {}

  handleBalanceSheetData(balanceSheetData) {
    this.balanceSheetData = aggregateFinancialData(balanceSheetData);
  }
}

const balanceSheetDataManager = new BalanceSheetDataManager();

// Exports to data-centre.js
export { balanceSheetDataManager };
