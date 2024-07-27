import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createCapexHeading,
  createDepreciationAmortRows,
  createTableBody,
  createTableHead,
  createTotals,
  createYearsRow,
} from './create-table-rows';

// Exports to dep-amort-ui-manager.js
export default function displayDepAmortProjections() {
  const table = createElement('table', {
    id: 'dep-amort-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createYearsRow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createCapexHeading());
  createDepreciationAmortRows(tableBody);
  tableBody.appendChild(createTotals());

  table.appendChild(tableBody);

  return table;
}
