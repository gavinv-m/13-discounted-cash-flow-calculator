import displayIncomeStatement from './utils/display-inc-statement';

class IncomeStatementUIManager {
  constructor(displayIncomeStatement) {
    this.displayIncomeStatement = displayIncomeStatement;
  }

  addIncStatementUI(
    financialContentBox,
    sortedYearsOnly,
    sortedYearsAndMonths,
    numberOfYears,
  ) {
    financialContentBox.appendChild(
      this.displayIncomeStatement(
        sortedYearsOnly,
        sortedYearsAndMonths,
        numberOfYears,
      ),
    );
  }
}

const incomeStatementUIManager = new IncomeStatementUIManager(
  displayIncomeStatement,
);

// Exports to load-requested-statement.js
export { incomeStatementUIManager };
