import { balanceSheetDataManager } from '../../../../../../../application-logic/data-centre/refined-data/balance-sheet';
import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createCurrentAssetsSection,
  createCurrentLiabilitiesSection,
  createEquitySection,
  createNonCurrentAssetsSection,
  createNonCurrentLiabilitiesSection,
  createTableBody,
  createTableHead,
  createTableFooter,
  createTotalAssetsRow,
  createTotalLiabilitiesRow,
  createTotalShareholdersEquityRow,
  createTotalLiabilitiesAndShareholders,
} from './create-table-rows';

// Exports to bal-sheet-manager.js
export default function displayBalanceSheet(
  sortedYearsOnly,
  sortedYearsAndMonths,
  numberOfYears,
) {
  const sortYearsOnly = balanceSheetDataManager.getYears(sortedYearsOnly);
  const sortYearsAndMonth =
    balanceSheetDataManager.getYears(sortedYearsAndMonths);

  const yearsOnly = sortYearsOnly.slice(0, numberOfYears);
  const yearsAndMonth = sortYearsAndMonth.slice(0, numberOfYears);

  const table = createElement('table', {
    id: 'bal-sheet-table',
  });

  table.appendChild(createTableHead(yearsAndMonth));

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  createCurrentAssetsSection(tableBody, yearsOnly);
  tableBody.appendChild(createBlankRow());
  createNonCurrentAssetsSection(tableBody, yearsOnly);
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createTotalAssetsRow(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createCurrentLiabilitiesSection(tableBody, yearsOnly);
  tableBody.appendChild(createBlankRow());
  createNonCurrentLiabilitiesSection(tableBody, yearsOnly);
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createTotalLiabilitiesRow(yearsOnly));
  tableBody.appendChild(createBlankRow());
  createEquitySection(tableBody, yearsOnly);
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createTotalShareholdersEquityRow(yearsOnly));
  tableBody.appendChild(createBlankRow());

  const tableFooter = createTableFooter();
  tableFooter.appendChild(createTotalLiabilitiesAndShareholders(yearsOnly));

  table.appendChild(tableBody);
  table.appendChild(tableFooter);

  return table;
}
