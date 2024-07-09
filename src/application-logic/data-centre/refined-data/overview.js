import getFinancialLineItems from '../utils/financial-data-utils';
class OverviewDataManager {
  overviewData = null;

  constructor(getFinancialLineItems) {
    this.getOverViewItems = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getOverViewItems(args, this.overviewData);
  }

  handleOverViewData(overviewData) {
    this.overviewData = overviewData;
  }
}

const overviewDataManager = new OverviewDataManager(getFinancialLineItems);

// Exports to data-centre.js
export { overviewDataManager };
