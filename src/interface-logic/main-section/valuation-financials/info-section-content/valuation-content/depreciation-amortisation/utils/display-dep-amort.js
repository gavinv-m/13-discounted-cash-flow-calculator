import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createCapexHeading,
  createDepreciationAmortRows,
  createTableBody,
  createTableFooter,
  createTableHead,
  createTotals,
} from './create-table-rows';

// Exports to dep-amort-ui-manager.js
export default function displayDepAmortProjections() {
  const table = createElement('table', {
    id: 'dep-amort-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createCapexHeading());
  createDepreciationAmortRows(tableBody);

  const tableFooter = createTableFooter();
  tableFooter.appendChild(createTotals());

  table.appendChild(tableBody);
  table.appendChild(tableFooter);

  return table;
}
