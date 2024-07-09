import { ebitdaCalculator } from './ebitda-manager';
import { fcfManager } from './fcf-manager';
import { discountRatesManager } from './discount-rate-manager';

class TerminalValueManager {
  projections = {};

  constructor(ebitdaCalculator, fcfManager, discountRatesManager) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.fcfManager = fcfManager;
    this.discountRatesManager = discountRatesManager;
  }

  calcuateSharePrice() {
    this.ebitdaCalculator.calculateEbitda();
    this.fcfManager.calculateFreeCashFlow();
    this.discountRatesManager.calculateDiscountRates();
  }
}

const terminalValueManager = new TerminalValueManager(
  ebitdaCalculator,
  fcfManager,
  discountRatesManager,
);

// Exports to dcf-manager.js
export { terminalValueManager };
