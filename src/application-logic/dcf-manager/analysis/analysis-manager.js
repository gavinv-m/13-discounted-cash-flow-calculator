import { timeSeriesDataManager } from '../../data-centre/refined-data/time-series';
import { valuationManager } from '../projections/terminal-value/valuation-manager';

class AnalysisManager {
  valuationAnalysis = {};

  constructor(timeSeriesDataManager, valuationManager) {
    this.timeSeriesDataManager = timeSeriesDataManager;
    this.valuationManager = valuationManager;
  }

  startAnalysis() {
    this.determineValuation();
  }

  determineValuation() {
    const recentSharePrice =
      this.timeSeriesDataManager.sendData(
        'recentClosingPrice',
      ).recentClosingPrice;

    const fairPrice = this.valuationManager.sendData('fairPrice').fairPrice;
  }
}

const analysisManager = new AnalysisManager(
  timeSeriesDataManager,
  valuationManager,
);

// Exports to dcf-manager.js
export { analysisManager };
