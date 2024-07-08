import { ebitdaCalculator } from './ebitda-manager';
import { fcfManager } from './fcf-manager';

class TerminalValueManager {
  projections = {};

  constructor(ebitdaCalculator, fcfManager) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.fcfManager = fcfManager;
  }

  calcuateSharePrice() {
    this.ebitdaCalculator.calculateEbitda();
    this.fcfManager.calculateFreeCashFlow();
  }
}

const terminalValueManager = new TerminalValueManager(
  ebitdaCalculator,
  fcfManager,
);

// Exports to dcf-manager.js
export { terminalValueManager };
