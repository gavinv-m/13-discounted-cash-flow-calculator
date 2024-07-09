import { overviewDataManager } from '../../../data-centre/refined-data/overview';

class WaccManager {
  marketRates = {
    riskFreeRate: 0.035,
    marketReturn: 0.1,
  };

  constructor(overviewDataManager) {
    this.overviewDataManager = overviewDataManager;
  }

  // Main method:
  calculateCostOfCapital() {
    this.calculateCostOfEquity();
  }

  calculateCostOfEquity() {
    const beta = Number(this.overviewDataManager.sendData('Beta').Beta);
  }
}

const waccManager = new WaccManager(overviewDataManager);

// Exports to discount-rate-manager.js
export { waccManager };
