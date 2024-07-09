import { overviewDataManager } from '../../../data-centre/refined-data/overview';
import calculateEquityCost from '../../utils/calculate-equity-cost';

class WaccManager {
  marketRates = {
    riskFreeRate: 0.035,
    marketReturn: 0.1,
  };

  constructor(overviewDataManager, calculateEquityCost) {
    this.overviewDataManager = overviewDataManager;
    this.calculateEquityCost = calculateEquityCost;
  }

  // Main method:
  calculateCostOfCapital() {
    this.calculateCostOfEquity();
  }

  calculateCostOfEquity() {
    const beta = Number(this.overviewDataManager.sendData('Beta').Beta);
    this.marketRates.costOfEquity = this.calculateEquityCost(
      this.marketRates.riskFreeRate,
      this.marketRates.marketReturn,
      beta,
    );
  }
}

const waccManager = new WaccManager(overviewDataManager, calculateEquityCost);

// Exports to discount-rate-manager.js
export { waccManager };
