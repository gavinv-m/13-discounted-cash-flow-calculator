import getFinancialLineItems from '../utils/financial-data-utils';

class TimeSeriesDataManager {
  timeSeriesData = null;

  constructor(getFinancialLineItems) {
    this.getTimeSeriesData = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getTimeSeriesData(args, this.timeSeriesData);
  }

  handleTimeSeriesData(timeSeriesData) {
    this.timeSeriesData = timeSeriesData;
  }
}

const timeSeriesDataManager = new TimeSeriesDataManager(getFinancialLineItems);

// Exports to data-centre.js
export { timeSeriesDataManager };
