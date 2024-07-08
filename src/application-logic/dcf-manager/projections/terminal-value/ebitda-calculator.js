import { revenueAndExpenses } from '../revenue-and-expenses-projections';

class EbitdaCalculator {
  constructor(revenueAndExpenses) {
    this.revenueAndExpenses = revenueAndExpenses;
  }

  calculateEbitda() {
    const profitAndInterest = this.revenueAndExpenses.sendData(
      'profitBeforeTax',
      'interestIncome',
      'interestExpense',
    );

    // TODO: Get total depreciation and amortisation for projected years
  }
}

const ebitdaCalculator = new EbitdaCalculator(revenueAndExpenses);

// Exports to terminal-value-manager.js
export { ebitdaCalculator };
