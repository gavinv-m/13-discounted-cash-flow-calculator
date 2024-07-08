import { ebitdaCalculator } from './ebitda-manager';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { capexProjectionsManager } from '../capex-projections';

class FreeCashFlowManager {
  projections = {};

  constructor(ebitdaCalculator, revenueAndExpenses, capexProjectionsManager) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.revenueAndExpenses = revenueAndExpenses;
    this.capexProjectionsManager = capexProjectionsManager;
  }

  calculateFreeCashFlow() {
    const ebitda = this.ebitdaCalculator.sendData('ebitda');
    const tax = this.revenueAndExpenses.sendData('taxExpense');
    const capex = this.capexProjectionsManager.sendData('capitalExpenditures');
    console.log(capex);
  }
}

const fcfManager = new FreeCashFlowManager(
  ebitdaCalculator,
  revenueAndExpenses,
  capexProjectionsManager,
);

// Export to terminal-value-manager.js
export { fcfManager };
