import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createExpenseRows,
  createNetProfitRow,
  createRevenueRow,
  createRevenuePercentRow,
  createTableBody,
  createTableHead,
  createTableFooter,
} from './create-table-rows';

// Exports to rev-and-exp-manager.js
export default function displayRevenueAndExpensesProjections() {
  const table = createElement('table', {
    id: 'revenue-and-expenses-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createRevenueRow());
  tableBody.appendChild(createRevenuePercentRow());
  createExpenseRows(tableBody); // Send table body for quicker appending

  const tableFooter = createTableFooter();
  tableFooter.appendChild(createNetProfitRow());
  tableBody.appendChild(createBlankRow());

  table.appendChild(tableBody);
  table.appendChild(tableFooter);

  return table;
}
