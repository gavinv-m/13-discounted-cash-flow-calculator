import { fcfManager } from './fcf-manager';
import { growthRateManager } from './growth-rate-manager';
import { waccManager } from './wacc-manager';
import computeTerminalValue from '../../utils/calculate-terminal-value';
import calculatePresentTerminalValue from '../../utils/discount-terminal-value';

class TerminalValueCalculator {
  projections = {};

  constructor(
    fcfManager,
    growthRateManager,
    waccManager,
    computeTerminalValue,
    calculatePresentTerminalValue,
  ) {
    this.fcfManager = fcfManager;
    this.growthRateManager = growthRateManager;
    this.waccManager = waccManager;
    this.computeTerminalValue = computeTerminalValue;
    this.presentTerminalValue = calculatePresentTerminalValue;
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

  discountTerminalValue() {
    const wacc = this.waccManager.sendData('wacc').wacc;

    this.projections.presentTerminalValue = this.presentTerminalValue(
      this.projections.terminalValue,
      wacc,
    );
  }
}

const terminalValueCalculator = new TerminalValueCalculator(
  fcfManager,
  growthRateManager,
  waccManager,
  computeTerminalValue,
  calculatePresentTerminalValue,
);

// Exports to terminal-value-manager.js
export { terminalValueCalculator };
