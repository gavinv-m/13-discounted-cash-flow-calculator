import { balanceSheetUIManager } from './balance-sheet-statement/bal-sheet-manager';
import { incomeStatementUIManager } from './income-statement/inc-statement-ui-manager';

class LoadRequestedStatement {
  constructor(balanceSheetUIManager, incomeStatementUIManager) {
    this.balanceSheetUIManager = balanceSheetUIManager;
    this.incomeStatementUIManager = incomeStatementUIManager;
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
    } else if (statementText === 'Income Statement') {
      this.incomeStatementUIManager.addIncStatementUI(
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
  incomeStatementUIManager,
);

// Exports to buttons-event-listeners.js, periods-buttons
export { loadRequestedStatement };
