class TimeSeriesDataManager {
  timeSeriesData = null;

  constructor() {}

  handleTimeSeriesData(timeSeriesData) {
    this.timeSeriesData = timeSeriesData;
  }
}

const timeSeriesDataManager = new TimeSeriesDataManager();

// Exports to data-centre.js
export { timeSeriesDataManager };
