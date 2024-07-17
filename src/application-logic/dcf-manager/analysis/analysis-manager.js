import { timeSeriesDataManager } from '../../data-centre/refined-data/time-series';
import { valuationManager } from '../projections/terminal-value/valuation-manager';
import calculateValuationStatus from '../utils/calculate-valuation-status';

class AnalysisManager {
  valuationAnalysis = {};

  constructor(
    timeSeriesDataManager,
    valuationManager,
    calculateValuationStatus,
  ) {
    this.timeSeriesDataManager = timeSeriesDataManager;
    this.valuationManager = valuationManager;
    this.calculateValuationStatus = calculateValuationStatus;
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

    this.valuationAnalysis.underOver = this.calculateValuationStatus(
      recentSharePrice,
      fairPrice,
    );
  }
}

const analysisManager = new AnalysisManager(
  timeSeriesDataManager,
  valuationManager,
  calculateValuationStatus,
);

// Exports to dcf-manager.js
export { analysisManager };
