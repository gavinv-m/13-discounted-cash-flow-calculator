import displayCashFlow from './utils/display-cash-flow';

class CashFlowUIManager {
  constructor(displayCashFlow) {
    this.displayCashFlow = displayCashFlow;
  }

  addCashFlowUI(
    financialContentBox,
    sortedYearsOnly,
    sortedYearsAndMonths,
    numberOfYears,
  ) {
    financialContentBox.appendChild(
      this.displayCashFlow(
        sortedYearsOnly,
        sortedYearsAndMonths,
        numberOfYears,
      ),
    );
  }
}

const cashFlowUIManager = new CashFlowUIManager(displayCashFlow);

// Exports to load-requested-statement.js
export { cashFlowUIManager };
