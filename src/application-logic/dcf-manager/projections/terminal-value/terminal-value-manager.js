import { ebitdaCalculator } from './ebitda-manager';
import { fcfManager } from './fcf-manager';
import { discountRatesManager } from './discount-rate-manager';
import { terminalValueCalculator } from './terminal-value-calculator';
import { valuationManager } from './valuation-manager';

class TerminalValueManager {
  projections = {};

  constructor(
    ebitdaCalculator,
    fcfManager,
    discountRatesManager,
    terminalValueCalculator,
    valuationManager,
  ) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.fcfManager = fcfManager;
    this.discountRatesManager = discountRatesManager;
    this.terminalValueCalculator = terminalValueCalculator;
    this.valuationManager = valuationManager;
  }

  calcuateSharePrice() {
    this.ebitdaCalculator.calculateEbitda();
    this.fcfManager.calculateFreeCashFlow();
    this.discountRatesManager.calculateDiscountRates();
    this.fcfManager.discountFreeCashFlows();
    this.terminalValueCalculator.calculateTerminalValue();
    this.terminalValueCalculator.discountTerminalValue();
    this.valuationManager.calculateEnterpriseValue();
    this.valuationManager.calculateEquityValue();
    this.valuationManager.calculateFairPrice();
  }
}

const terminalValueManager = new TerminalValueManager(
  ebitdaCalculator,
  fcfManager,
  discountRatesManager,
  terminalValueCalculator,
  valuationManager,
);

// Exports to dcf-manager.js
export { terminalValueManager };
