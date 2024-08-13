import { balanceSheetDataManager } from '../../../../../../application-logic/data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../../../../application-logic/data-centre/refined-data/income-statement';
import { cashFlowStatementDataManager } from '../../../../../../application-logic/data-centre/refined-data/cash-flow-statement';
import { statementVisibilityChecker } from './check-active-statement';
import { loadRequestedStatement } from '../load-requested-statement';
import {
  appendChildren,
  createElement,
} from '../../../../../utils/element-utils';

const showAvailablePeriods = function handleShowPeriodsButtonClick(
  contentContainer,
) {
  contentContainer.style.visibility =
    contentContainer.style.visibility === 'hidden' ? 'visible' : 'hidden';
};

const selectPeriod = function handlePeriodButtonClick(
  years,
  financialContentBox,
) {
  // Update number in years to show
  statementVisibilityChecker.updateYearsToShow(years);

  const statementText =
    statementVisibilityChecker.getVisibilityOption('activeStatement');
  const sortedYears =
    statementVisibilityChecker.getVisibilityOption('sortedYears');
  const sortedYearsAndMonths = statementVisibilityChecker.getVisibilityOption(
    'sortedYearsAndMonths',
  );

  loadRequestedStatement.loadStatement(
    statementText,
    financialContentBox,
    sortedYears,
    sortedYearsAndMonths,
    years,
  );
};

const years = function determineYearsToDisplay() {
  const balYears = balanceSheetDataManager.getYears(
    'latestToOldestYearsOnly',
  ).length;
  const incYears = incomeStatementDataManager.getYears(
    'latestToOldestYearsOnly',
  ).length;
  const cashYears = cashFlowStatementDataManager.getYears(
    'latestToOldestYearsOnly',
  ).length;

  const years = [balYears, incYears, cashYears];
  const acceptedYearrs = years.reduce((acc, currentValue) => {
    if (
      years.every((element) => currentValue <= element) &&
      acc.includes(currentValue) === false
    ) {
      acc.push(currentValue);
    }
    return acc;
  }, []);

  acceptedYearrs.sort((a, b) => a - b);
  if (acceptedYearrs[0] > 5) {
    acceptedYearrs.unshift(5);
  }

  return acceptedYearrs;
};

// Exports to financial-content-manager.js
export default function createPeriodButtons(financialContentBox) {
  const acceptedYears = years();

  const dropDown = createElement('div', { classList: ['dropdown-section'] });
  const mainButton = createElement('button', {
    innerHTML: `5 periods  <span class='down-arrowhead'>&#8964;</span>`,
    classList: ['dropdown-btn'],
  });
  const contentContainer = createElement('div', {
    classList: ['dropdown-container'],
    id: 'periods-dropdown',
  });
  contentContainer.style.visibility = 'hidden';

  acceptedYears.forEach((year) => {
    const periodContainer = createElement('div', {
      text: `${year} periods`,
      classList: ['period'],
    });

    // TODO: Add event listener to when button pressed
    periodContainer.addEventListener('click', () => {
      const text = periodContainer.textContent;

      if (text !== mainButton.textContent) {
        mainButton.innerHTML = `${text} <span class='down-arrowhead'>&#8964;</span>`;
        const years = Number(text.split(' ')[0]);
        selectPeriod(years, financialContentBox);
      }
      contentContainer.style.visibility = 'hidden';
    });

    contentContainer.appendChild(periodContainer);
  });

  // Show periods when main button clicked
  mainButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from reaching the document listener that closes active dropdowns
    contentContainer.classList.add('active-dropdown');
    showAvailablePeriods(contentContainer);
  });
  appendChildren(dropDown, mainButton, contentContainer);
  return dropDown;
}
