import { incomeStatementDataManager } from '../../../../../../../application-logic/data-centre/refined-data/income-statement';
import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createContributionMarginSection,
  createGrossProfitTotal,
  createIncomeExpensesSection,
  createNetProfitTotal,
  createProfitBeforeTaxTotal,
  createTableBody,
  createTableHead,
  createTaxExpenseSection,
} from './create-table-rows';

// Exports to inc-statement-ui-manager
export default function displayIncomeStatement(
  sortedYearsOnly,
  sortedYearsAndMonths,
  numberOfYears,
) {
  const sortYearsOnly = incomeStatementDataManager.getYears(sortedYearsOnly);
  const sortYearsAndMonth =
    incomeStatementDataManager.getYears(sortedYearsAndMonths);

  const yearsOnly = sortYearsOnly.slice(0, numberOfYears);
  const yearsAndMonth = sortYearsAndMonth.slice(0, numberOfYears);

  const table = createElement('table', {
    id: 'inc-statement-table',
  });
  table.appendChild(createTableHead(yearsAndMonth));

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  createContributionMarginSection(tableBody, yearsOnly);
  tableBody.appendChild(createGrossProfitTotal(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createIncomeExpensesSection(tableBody, yearsOnly);
  tableBody.appendChild(createProfitBeforeTaxTotal(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createTaxExpenseSection(tableBody, yearsOnly);
  tableBody.appendChild(createNetProfitTotal(yearsOnly));

  table.appendChild(tableBody);

  return table;
}
