import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createExpenseRows,
  createRevenueRow,
  createRevenuePercentRow,
  createTableBody,
  createTableHead,
  createYearsRow,
} from './create-table-rows';

// Exports to rev-and-exp-manager.js
export default function displayRevenueAndExpensesProjections() {
  const table = createElement('table', {
    id: 'revenue-and-expenses-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createYearsRow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createRevenueRow());
  tableBody.appendChild(createRevenuePercentRow());
  createExpenseRows(tableBody); // Send table body for quicker appending
  table.appendChild(tableBody);

  return table;
}
