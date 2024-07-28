import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createDaysReceivable,
  createDaysPayables,
  createTableBody,
  createTableHead,
  createTradeReceivables,
  createTradePayables,
  createYearsRow,
} from './create-table-rows';

// Exports to working-cap-ui-manager.js
export default function displayWorkingCap() {
  const table = createElement('table', {
    id: 'working-cap-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createYearsRow());
  tableBody.appendChild(createDaysReceivable());
  tableBody.appendChild(createTradeReceivables());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createDaysPayables());
  tableBody.appendChild(createTradePayables());

  table.appendChild(tableBody);
  return table;
}
