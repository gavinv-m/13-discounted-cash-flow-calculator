import { ebitdaCalculator } from './ebitda-manager';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { capexProjectionsManager } from '../capex-projections';
import { workingCapProjectionsManager } from '../working-capital/working-capital-manager';
import { waccManager } from './wacc-manager';
import sumValues from '../../utils/sum-values';
import discountCashFlows from '../../utils/discount-cash-flows';

class FreeCashFlowManager {
  projections = {};

  constructor(
    ebitdaCalculator,
    revenueAndExpenses,
    capexProjectionsManager,
    workingCapProjectionsManager,
    waccManager,
    sumValues,
    discountCashFlows,
  ) {
    this.ebitdaCalculator = ebitdaCalculator;
    this.revenueAndExpenses = revenueAndExpenses;
    this.capexProjectionsManager = capexProjectionsManager;
    this.workingCapProjectionsManager = workingCapProjectionsManager;
    this.waccManager = waccManager;
    this.sumValues = sumValues;
    this.discountCashFlows = discountCashFlows;
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

  discountFreeCashFlows() {
    const wacc = this.waccManager.sendData('wacc').wacc;
    this.projections.pvCashFlows = this.discountCashFlows(
      this.projections.freeCashFlow,
      wacc,
    );
  }
}

const fcfManager = new FreeCashFlowManager(
  ebitdaCalculator,
  revenueAndExpenses,
  capexProjectionsManager,
  workingCapProjectionsManager,
  waccManager,
  sumValues,
  discountCashFlows,
);

// Export to terminal-value-manager.js
export { fcfManager };
