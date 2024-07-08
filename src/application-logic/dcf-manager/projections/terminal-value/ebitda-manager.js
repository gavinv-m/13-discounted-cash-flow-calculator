import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { depreciationAmortisationProjectionsManager } from '../depreciation-amortisation-projections';
import computeEbitda from '../../utils/calculate-ebidta';

class EbitdaCalculator {
  constructor(
    revenueAndExpenses,
    depreciationAmortisationProjectionsManager,
    computeEbitda,
  ) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
    this.computeEbitda = computeEbitda;
  }

  calculateEbitda() {
    const profitAndInterest = this.revenueAndExpenses.sendData(
      'profitBeforeTax',
      'interestIncome',
      'interestExpense',
    );

    const depreciationAmortisation =
      this.depreciationAmortisationProjectionsManager.sendData('totals').totals;

    this.computeEbitda(profitAndInterest, depreciationAmortisation);
  }
}

const ebitdaCalculator = new EbitdaCalculator(
  revenueAndExpenses,
  depreciationAmortisationProjectionsManager,
  computeEbitda,
);

// Exports to terminal-value-manager.js
export { ebitdaCalculator };
