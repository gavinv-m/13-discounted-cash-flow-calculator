import { timeSeriesDataManager } from '../../data-centre/refined-data/time-series';

class AnalysisManager {
  valuationAnalysis = {};

  constructor(timeSeriesDataManager) {
    this.timeSeriesDataManager = timeSeriesDataManager;
  }

  startAnalysis() {
    this.determineValuation();
  }

  determineValuation() {
    const recentClosingDate =
      this.timeSeriesDataManager.sendData('Meta Data')['Meta Data'][
        '3. Last Refreshed'
      ];
  }
}

const analysisManager = new AnalysisManager(timeSeriesDataManager);

// Exports to dcf-manager.js
export { analysisManager };
