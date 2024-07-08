import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { depreciationAmortisationProjectionsManager } from '../depreciation-amortisation-projections';
import sumValues from '../../utils/sum-values';

class EbitdaCalculator {
  projections = {};

  constructor(
    revenueAndExpenses,
    depreciationAmortisationProjectionsManager,
    sumValues,
  ) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
    this.sumValues = sumValues;
  }

  calculateEbitda() {
    const profitAndInterest = this.revenueAndExpenses.sendData(
      'profitBeforeTax',
      'interestIncome',
      'interestExpense',
    );

    const depreciationAmortisation =
      this.depreciationAmortisationProjectionsManager.sendData('totals').totals;

    const nonNegativeItems = [
      'profitBeforeTax',
      'interestExpense',
      'depreciationAmortisation',
    ];

    this.projections.ebitda = this.sumValues(
      { ...profitAndInterest, depreciationAmortisation },
      nonNegativeItems,
    );
  }
}

const ebitdaCalculator = new EbitdaCalculator(
  revenueAndExpenses,
  depreciationAmortisationProjectionsManager,
  sumValues,
);

// Exports to terminal-value-manager.js
export { ebitdaCalculator };
