import { createElement } from '../../../../../../utils/element-utils';
import { createBlankRow, createTableHead } from './create-table-rows';

// Exports to capex-ui-manager.js
export default function displayCapexProjections() {
  const table = createElement('table', {
    id: 'capex-projections',
  });

  table.appendChild(createTableHead());

  return table;
}
