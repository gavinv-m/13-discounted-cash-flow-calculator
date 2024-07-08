import { ebitdaCalculator } from './ebitda-manager';

class TerminalValueManager {
  projections = {};

  constructor(ebitdaCalculator) {
    this.ebitdaCalculator = ebitdaCalculator;
  }

  calcuateSharePrice() {
    this.ebitdaCalculator.calculateEbitda();
  }
}

const terminalValueManager = new TerminalValueManager(ebitdaCalculator);

// Exports to dcf-manager.js
export { terminalValueManager };
