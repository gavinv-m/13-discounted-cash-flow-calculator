import { ebitdaCalculator } from './ebitda-manager';
import { fcfManager } from './fcf-manager';
import { discountRatesManager } from './discount-rate-manager';
import { terminalValueCalculator } from './terminal-value-calculator';

class TerminalValueManager {
  projections = {};

  constructor(
    ebitdaCalculator,
    fcfManager,
    discountRatesManager,
    terminalValueCalculator,
  ) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.fcfManager = fcfManager;
    this.discountRatesManager = discountRatesManager;
    this.terminalValueCalculator = terminalValueCalculator;
  }

  calcuateSharePrice() {
    this.ebitdaCalculator.calculateEbitda();
    this.fcfManager.calculateFreeCashFlow();
    this.discountRatesManager.calculateDiscountRates();
    this.fcfManager.discountFreeCashFlows();
    this.terminalValueCalculator.calculateTerminalValue();
  }
}

const terminalValueManager = new TerminalValueManager(
  ebitdaCalculator,
  fcfManager,
  discountRatesManager,
  terminalValueCalculator,
);

// Exports to dcf-manager.js
export { terminalValueManager };
