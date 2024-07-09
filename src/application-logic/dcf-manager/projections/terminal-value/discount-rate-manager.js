import { waccManager } from './wacc-manager';
import { growthRateManager } from './growth-rate-manager';

class DiscountRateManager {
  discountRates = {};

  constructor(waccManager, growthRateManager) {
    this.waccManager = waccManager;
    this.growthRateManager = growthRateManager;
  }

  // Main method
  calculateDiscountRates() {
    this.waccManager.calculateCostOfCapital();
    this.growthRateManager.calculateGrowthRate();
  }
}

const discountRatesManager = new DiscountRateManager(
  waccManager,
  growthRateManager,
);

// Exports to terminal-value-manager.js
export { discountRatesManager };
