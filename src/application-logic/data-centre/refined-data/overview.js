class OverviewDataManager {
  overviewData = null;

  constructor() {}

  handleOverViewData(overviewData) {
    this.overviewData = overviewData;
  }
}

const overviewDataManager = new OverviewDataManager();

// Exports to data-centre.js
export { overviewDataManager };
