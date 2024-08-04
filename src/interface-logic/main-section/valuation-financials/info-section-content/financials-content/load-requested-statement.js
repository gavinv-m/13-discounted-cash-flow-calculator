import { balanceSheetUIManager } from './balance-sheet-statement/bal-sheet-manager';
import { incomeStatementUIManager } from './income-statement/inc-statement-ui-manager';
import { cashFlowUIManager } from './cash-flow/cash-flow-ui-manager';
import clearFinancialContent from './utils/clear-financial-content';

class LoadRequestedStatement {
  constructor(
    balanceSheetUIManager,
    incomeStatementUIManager,
    cashFlowUIManager,
    clearFinancialContent,
  ) {
    this.balanceSheetUIManager = balanceSheetUIManager;
    this.incomeStatementUIManager = incomeStatementUIManager;
    this.cashFlowUIManager = cashFlowUIManager;
    this.clearFinancialContent = clearFinancialContent;
  }

  loadStatement(
    statementText,
    financialContentBox,
    sortedYearsOnly,
    sortedYearsAndMonths,
    numberOfYears,
  ) {
    // Clear financial content box/information
    this.clearFinancialContent(financialContentBox);

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
    } else if (statementText === 'Cash Flow Statement') {
      this.cashFlowUIManager.addCashFlowUI(
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
  cashFlowUIManager,
  clearFinancialContent,
);

// Exports to buttons-event-listeners.js, periods-buttons
export { loadRequestedStatement };
