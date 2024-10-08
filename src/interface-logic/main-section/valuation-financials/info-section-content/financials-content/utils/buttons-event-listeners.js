import { statementVisibilityChecker } from './check-active-statement';
import { loadRequestedStatement } from '../load-requested-statement';

// Exports to financial-content-manager
export default function addButtonsEventListeners(buttons, financialContentBox) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const statementText = button.textContent;
      const currentlyActive =
        statementVisibilityChecker.checkActiveStatement(statementText);

      if (currentlyActive === true) {
        return;
      }

      const sortedYears =
        statementVisibilityChecker.getVisibilityOption('sortedYears');
      const sortedYearsAndMonths =
        statementVisibilityChecker.getVisibilityOption('sortedYearsAndMonths');
      const yearsToShow =
        statementVisibilityChecker.getVisibilityOption('yearsToShow');

      loadRequestedStatement.loadStatement(
        statementText,
        financialContentBox,
        sortedYears,
        sortedYearsAndMonths,
        yearsToShow,
      );
    });
  });
}
