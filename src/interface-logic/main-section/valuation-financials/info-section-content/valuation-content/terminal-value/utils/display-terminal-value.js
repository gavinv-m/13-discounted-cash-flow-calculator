import { createElement } from '../../../../../../utils/element-utils';
import {
  createBlankRow,
  createCapex,
  createCashRow,
  createDebtRow,
  createEnterpriseValueRow,
  createEquityValueRow,
  createFairPriceRow,
  createFCFRow,
  createChangeInNWC,
  createEBITDARow,
  createGrowthRateRow,
  createPresentValueFCFRow,
  createOutstandingSharesRow,
  createRowsExcludedFromEBITDA,
  createTableBody,
  createTableHead,
  createTaxExpenseRow,
  createWACCRow,
} from './create-table-rows';

// Exports to terminal-value-ui-manager.js
export default function displayTerminalValueProjections() {
  const table = createElement('table', {
    id: 'terminal-value-projections',
  });

  table.appendChild(createTableHead());

  const tableBody = createTableBody();
  tableBody.appendChild(createBlankRow());
  createRowsExcludedFromEBITDA(tableBody);
  tableBody.appendChild(createEBITDARow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createTaxExpenseRow());
  tableBody.appendChild(createCapex());
  tableBody.appendChild(createChangeInNWC());
  tableBody.appendChild(createFCFRow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createWACCRow());
  tableBody.appendChild(createGrowthRateRow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createPresentValueFCFRow());
  tableBody.appendChild(createEnterpriseValueRow());
  tableBody.appendChild(createCashRow());
  tableBody.appendChild(createDebtRow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createEquityValueRow());
  tableBody.appendChild(createOutstandingSharesRow());
  tableBody.appendChild(createBlankRow());
  tableBody.appendChild(createFairPriceRow());

  table.appendChild(tableBody);
  return table;
}
