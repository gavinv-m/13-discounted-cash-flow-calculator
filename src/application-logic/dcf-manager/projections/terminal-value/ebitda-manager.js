import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { depreciationAmortisationProjectionsManager } from '../depreciation-amortisation-projections';
import sumValues from '../../utils/sum-values';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class EbitdaCalculator {
  projections = {};

  constructor(
    revenueAndExpenses,
    depreciationAmortisationProjectionsManager,
    sumValues,
    getFinancialLineItems,
  ) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
    this.sumValues = sumValues;
    this.getEbitda = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getEbitda(args, this.projections);
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
  getFinancialLineItems,
);

// Exports to terminal-value-manager.js, fcf-manager.js
export { ebitdaCalculator };
