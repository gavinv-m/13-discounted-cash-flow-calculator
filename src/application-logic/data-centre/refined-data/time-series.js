import getFinancialLineItems from '../utils/financial-data-utils';

class TimeSeriesDataManager {
  timeSeriesData = null;
  recentClosingPrice = null;

  constructor(getFinancialLineItems) {
    this.getTimeSeriesData = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getTimeSeriesData(args, this.timeSeriesData);
  }

  handleTimeSeriesData(timeSeriesData) {
    this.timeSeriesData = timeSeriesData;
    this.storeRecentClosingPrice();
  }

  storeRecentClosingPrice() {
    const recentClosingDate =
      this.timeSeriesData['Meta Data']['3. Last Refreshed'];
    this.timeSeriesData.recentClosingDate = recentClosingDate;

    const recentClosingPrice =
      this.timeSeriesData['Time Series (Daily)'][recentClosingDate]['4. close'];
    this.timeSeriesData.recentClosingPrice = Number(recentClosingPrice);
  }
}

const timeSeriesDataManager = new TimeSeriesDataManager(getFinancialLineItems);

// Exports to data-centre.js
export { timeSeriesDataManager };
