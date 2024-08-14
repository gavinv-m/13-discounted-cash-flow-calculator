import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createCapexRow,
  createCapexPercentageOfRevenue,
  createTableBody,
  createTableHead,
} from './create-table-rows';

// Exports to capex-ui-manager.js
export default function displayCapexProjections() {
  const table = createElement('table', {
    id: 'capex-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createCapexRow());
  tableBody.appendChild(createCapexPercentageOfRevenue());

  table.appendChild(tableBody);
  return table;
}
