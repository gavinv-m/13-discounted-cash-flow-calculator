import { fcfManager } from './fcf-manager';
import { growthRateManager } from './growth-rate-manager';
import { waccManager } from './wacc-manager';
import computeTerminalValue from '../../utils/calculate-terminal-value';

class TerminalValueCalculator {
  projections = {};

  constructor(
    fcfManager,
    growthRateManager,
    waccManager,
    computeTerminalValue,
  ) {
    this.fcfManager = fcfManager;
    this.growthRateManager = growthRateManager;
    this.waccManager = waccManager;
    this.computeTerminalValue = computeTerminalValue;
  }

  calculateTerminalValue() {
    const freeCashFlows = this.fcfManager.sendData('freeCashFlow').freeCashFlow;
    const growthRate = this.growthRateManager.sendData('growthRate').growthRate;
    const wacc = this.waccManager.sendData('wacc').wacc;

    this.projections.terminalValue = this.computeTerminalValue(
      freeCashFlows,
      wacc,
      growthRate,
    );
  }
}

const terminalValueCalculator = new TerminalValueCalculator(
  fcfManager,
  growthRateManager,
  waccManager,
  computeTerminalValue,
);

// Exports to terminal-value-manager.js
export { terminalValueCalculator };
