class StatementVisibilityChecker {
  // Default on load
  activeStatement = 'Balance Sheet';
  yearsToShow = 5;
  sortedYears = 'latestToOldestYearsOnly';
  sortedYearsAndMonths = 'latestToOldestYearsAndMonth';

  constructor() {}

  getVisibilityOption(option) {
    return this[option];
  }

  checkActiveStatement(statementText) {
    if (statementText === this.activeStatement) {
      return true;
    }
    this.activeStatement = statementText;
  }

  // TODO: Check number of years to show
}

const statementVisibilityChecker = new StatementVisibilityChecker();

// Exports to ./buttons-event-listeners.js
export { statementVisibilityChecker };
