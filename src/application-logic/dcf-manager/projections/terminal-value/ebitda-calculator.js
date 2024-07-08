import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import { depreciationAmortisationProjectionsManager } from '../depreciation-amortisation-projections';

class EbitdaCalculator {
  constructor(revenueAndExpenses, depreciationAmortisationProjectionsManager) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
  }

  calculateEbitda() {
    const profitAndInterest = this.revenueAndExpenses.sendData(
      'profitBeforeTax',
      'interestIncome',
      'interestExpense',
    );

    const depreciationAmortisation =
      this.depreciationAmortisationProjectionsManager.sendData('totals').totals;
  }
}

const ebitdaCalculator = new EbitdaCalculator(
  revenueAndExpenses,
  depreciationAmortisationProjectionsManager,
);

// Exports to terminal-value-manager.js
export { ebitdaCalculator };
