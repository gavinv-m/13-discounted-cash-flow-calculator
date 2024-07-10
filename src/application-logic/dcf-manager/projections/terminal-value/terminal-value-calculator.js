import { fcfManager } from './fcf-manager';
import { growthRateManager } from './growth-rate-manager';

class TerminalValueCalculator {
  constructor(fcfManager, growthRateManager) {
    this.fcfManager = fcfManager;
    this.growthRateManager = growthRateManager;
  }

  calculateTerminalValue() {
    const freeCashFlows = this.fcfManager.sendData('freeCashFlow').freeCashFlow;
    const growthRate = this.growthRateManager.sendData('growthRate').growthRate;
  }
}

const terminalValueCalculator = new TerminalValueCalculator(
  fcfManager,
  growthRateManager,
);

// Exports to terminal-value-manager.js
export { terminalValueCalculator };
