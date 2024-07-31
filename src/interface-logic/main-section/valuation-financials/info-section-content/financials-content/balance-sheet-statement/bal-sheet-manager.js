import displayBalanceSheet from './utils/display-bal-sheet';

class BalanceSheetUIManager {
  constructor(displayBalanceSheet) {
    this.displayBalanceSheet = displayBalanceSheet;
  }

  addBalanceSheetUI(
    financialContentBox,
    sortedYearsOnly,
    sortedYearsAndMonths,
    numberOfYears,
  ) {
    financialContentBox.appendChild(
      this.displayBalanceSheet(
        sortedYearsOnly,
        sortedYearsAndMonths,
        numberOfYears,
      ),
    );
  }
}

const balanceSheetUIManager = new BalanceSheetUIManager(displayBalanceSheet);

// Exports to financial-content-manager.js & load-requested-statement
export { balanceSheetUIManager };
