import aggregateFinancialData from '../utils/data-aggregator';
import getFinancialLineItems from '../utils/financial-data-utils';

class BalanceSheetDataManager {
  balanceSheetData = null;

  constructor() {
    this.getFinancialLineItems = getFinancialLineItems.bind(this);
  }

  handleBalanceSheetData(balanceSheetData) {
    this.balanceSheetData = aggregateFinancialData(balanceSheetData);
  }

  sendData(...args) {
    return this.getFinancialLineItems(args, this.balanceSheetData);
  }
}

const balanceSheetDataManager = new BalanceSheetDataManager();

// Exports to data-centre.js
export { balanceSheetDataManager };
