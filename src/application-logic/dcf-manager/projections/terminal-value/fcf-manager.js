import { ebitdaCalculator } from './ebitda-manager';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { capexProjectionsManager } from '../capex-projections';
import { workingCapProjectionsManager } from '../working-capital/working-capital-manager';
import sumValues from '../../utils/sum-values';

class FreeCashFlowManager {
  projections = {};

  constructor(
    ebitdaCalculator,
    revenueAndExpenses,
    capexProjectionsManager,
    workingCapProjectionsManager,
    sumValues,
  ) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.revenueAndExpenses = revenueAndExpenses;
    this.capexProjectionsManager = capexProjectionsManager;
    this.workingCapProjectionsManager = workingCapProjectionsManager;
    this.sumValues = sumValues;
  }

  calculateFreeCashFlow() {
    const ebitda = this.ebitdaCalculator.sendData('ebitda');
    const tax = this.revenueAndExpenses.sendData('taxExpense');
    const capex = this.capexProjectionsManager.sendData('capitalExpenditures');
    const changesInNWC = this.workingCapProjectionsManager.sendData(
      'changesInNetWorkingCapital',
    );
    const nonNegativeItems = ['ebitda'];

    this.projections.freeCashFlow = this.sumValues(
      { ...ebitda, ...tax, ...capex, ...changesInNWC },
      nonNegativeItems,
    );
  }
}

const fcfManager = new FreeCashFlowManager(
  ebitdaCalculator,
  revenueAndExpenses,
  capexProjectionsManager,
  workingCapProjectionsManager,
  sumValues,
);

// Export to terminal-value-manager.js
export { fcfManager };
