import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createChangeInNWC,
  createDaysInventories,
  createDaysReceivable,
  createDaysPayables,
  createInventory,
  createNetWorkingCapital,
  createTableBody,
  createTableHead,
  createTableFooter,
  createTradeReceivables,
  createTradePayables,
} from './create-table-rows';

// Exports to working-cap-ui-manager.js
export default function displayWorkingCap() {
  const table = createElement('table', {
    id: 'working-cap-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createDaysReceivable());
  tableBody.appendChild(createTradeReceivables());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createDaysPayables());
  tableBody.appendChild(createTradePayables());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createDaysInventories());
  tableBody.appendChild(createInventory());
  tableBody.appendChild(createBlankRow());

  const tableFooter = createTableFooter();
  tableFooter.appendChild(createNetWorkingCapital());
  tableFooter.appendChild(createChangeInNWC());

  table.appendChild(tableBody);
  table.appendChild(tableFooter);
  return table;
}
