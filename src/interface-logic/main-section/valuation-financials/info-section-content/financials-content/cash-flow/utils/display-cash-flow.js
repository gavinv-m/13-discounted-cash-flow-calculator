import { cashFlowStatementDataManager } from '../../../../../../../application-logic/data-centre/refined-data/cash-flow-statement';
import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createChangeInCashRow,
  createChangeInNWCRow,
  createExchangeDifferenceSection,
  createFinancingActivitiesSection,
  createFinancingActivitiesTotal,
  createInvestingActivitiesSection,
  createInvestingActivitiesTotal,
  createOperatingActivitiesSection,
  createOperatingActivityTotal,
  createTableBody,
  createTableHead,
  createTableFooter,
} from './create-table-rows';

// Exports to cash-flow-ui
export default function displayCashFlow(
  sortedYearsOnly,
  sortedYearsAndMonths,
  numberOfYears,
) {
  const sortYearsOnly = cashFlowStatementDataManager.getYears(sortedYearsOnly);
  const sortYearsAndMonth =
    cashFlowStatementDataManager.getYears(sortedYearsAndMonths);

  const yearsOnly = sortYearsOnly.slice(0, numberOfYears);
  const yearsAndMonth = sortYearsAndMonth.slice(0, numberOfYears);

  const table = createElement('table', {
    id: 'cash-flow-table',
  });
  table.appendChild(createTableHead(yearsAndMonth));

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  createOperatingActivitiesSection(tableBody, yearsOnly);
  tableBody.appendChild(createChangeInNWCRow(yearsOnly));
  tableBody.appendChild(createOperatingActivityTotal(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createInvestingActivitiesSection(tableBody, yearsOnly);
  tableBody.appendChild(createInvestingActivitiesTotal(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createFinancingActivitiesSection(tableBody, yearsOnly);
  tableBody.appendChild(createFinancingActivitiesTotal(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createExchangeDifferenceSection(tableBody, yearsOnly);

  const tableFooter = createTableFooter();
  tableFooter.appendChild(createChangeInCashRow(yearsOnly));

  table.appendChild(tableBody);
  table.appendChild(tableFooter);

  return table;
}
