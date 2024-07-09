import { waccManager } from './wacc-manager';

class DiscountRateManager {
  discountRates = {};

  constructor(waccManager) {
    this.waccManager = waccManager;
  }

  // Main method
  calculateDiscountRates() {}
}

const discountRatesManager = new DiscountRateManager(waccManager);

// Exports to terminal-value-manager.js
export { discountRatesManager };
