import { balanceSheetUIManager } from './balance-sheet-statement/bal-sheet-manager';

class LoadRequestedStatement {
  constructor(balanceSheetUIManager) {
    this.balanceSheetUIManager = balanceSheetUIManager;
  }

  loadStatement(
    statementText,
    financialContentBox,
    sortedYearsOnly,
    sortedYearsAndMonths,
    numberOfYears,
  ) {
    if (statementText === 'Balance Sheet') {
      this.balanceSheetUIManager.addBalanceSheetUI(
        financialContentBox,
        sortedYearsOnly,
        sortedYearsAndMonths,
        numberOfYears,
      );
    }
  }
}

const loadRequestedStatement = new LoadRequestedStatement(
  balanceSheetUIManager,
);

// Exports to buttons-event-listeners.js, periods-buttons
export { loadRequestedStatement };
