import { fcfManager } from './fcf-manager';
import { terminalValueCalculator } from './terminal-value-calculator';

class ValuationManager {
  projections = {};

  constructor(fcfManager, terminalValueCalculator) {
    this.fcfManager = fcfManager;
    this.terminalValueCalculator = terminalValueCalculator;
  }

  calculateEnterpriseValue() {
    let presentFCFs = this.fcfManager.sendData('pvCashFlows').pvCashFlows;
    presentFCFs = Object.values(presentFCFs);

    const sumOfpresentFCFs = presentFCFs.reduce(
      (sum, currentAmount) => sum + currentAmount,
      0,
    );
    const presentTerminalValue = this.terminalValueCalculator.sendData(
      'presentTerminalValue',
    ).presentTerminalValue;

    this.projections.enterpriseValue = sumOfpresentFCFs + presentTerminalValue;
  }
}

const valuationManager = new ValuationManager(
  fcfManager,
  terminalValueCalculator,
);

// Exports to terminal-value-manager.js
export { valuationManager };
