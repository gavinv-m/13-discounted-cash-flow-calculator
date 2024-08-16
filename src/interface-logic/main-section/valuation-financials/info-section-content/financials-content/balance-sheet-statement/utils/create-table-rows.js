import { createElement } from '../../../../../../utils/element-utils';
import { balanceSheetDataManager } from '../../../../../../../application-logic/data-centre/refined-data/balance-sheet';
import roundToMillions from '../../../utils/round-to-millions';

/**
 * All Exports to display-bal-sheet.js
 * Main exports sorted alphabetically
 * Function expressions on top
 */
const createRows = function createComponentsRow(
  financialLineItems,
  tableBody,
  yearsOnly,
) {
  for (let line in financialLineItems) {
    const details = financialLineItems[line];
    const negativeItems = ['Treasury Stock'];

    const tableRow = createElement('tr');
    if (details.classList !== undefined) {
      tableRow.classList.add(details.classList);
    }

    const nameCell = createElement('td', { text: [details.name] });
    tableRow.appendChild(nameCell);

    const dataKey = details.dataKey;
    const historicalData = balanceSheetDataManager.sendData(dataKey)[dataKey];

    yearsOnly.forEach((year) => {
      let amount = roundToMillions(historicalData[year]);
      let formattedAmount = Number(amount) === 0 ? '-' : amount;
      formattedAmount =
        negativeItems.includes(details.name) === true
          ? `(${formattedAmount})`
          : formattedAmount;

      const cell = createElement('td', { text: formattedAmount });
      tableRow.appendChild(cell);
    });

    tableBody.appendChild(tableRow);
  }

  return;
};

const totalRow = function createTotalsRow(totalName, yearsOnly) {
  const totals = {
    assets: {
      name: 'Total assets',
      dataKey: 'totalAssets',
    },
    liabilities: {
      name: 'Total liabilities',
      dataKey: 'totalLiabilities',
    },
    equity: {
      name: 'Total equity',
      dataKey: 'totalShareholderEquity',
    },
    libsAndEquity: {
      name: `Total liabilities and shareholder's equity`,
      dataKey: 'totalAssets', // No separate key in API Data, use total assets
    },
  };

  const details = totals[totalName];

  const tableRow = createElement('tr', { classList: ['bal-sheet-total'] });
  const nameCell = createElement('td', { text: details.name });
  tableRow.appendChild(nameCell);

  const historicalData = balanceSheetDataManager.sendData(details.dataKey)[
    details.dataKey
  ];

  yearsOnly.forEach((year) => {
    let amount = roundToMillions(historicalData[year]);
    const formattedAmount = Number(amount) === 0 ? '-' : amount;
    const cell = createElement('td', { text: formattedAmount });
    tableRow.appendChild(cell);
  });

  return tableRow;
};

export function createBlankRow() {
  return createElement('tr', { classList: ['blank-row'] });
}

export function createBlankData() {
  return createElement('td', { classList: ['blank-data'] });
}

export function createTableBody() {
  return createElement('tbody');
}

export function createTableFooter() {
  return createElement('tfoot');
}

export function createCurrentAssetsSection(tableBody, yearsOnly) {
  const financialLineItems = {
    cash: {
      name: 'Cash and cash equivalents',
      dataKey: 'cashAndCashEquivalentsAtCarryingValue',
    },
    accountsReceivable: {
      name: 'Trade receivables',
      dataKey: 'currentNetReceivables',
    },
    inventory: {
      name: 'Inventories',
      dataKey: 'inventory',
    },
    otherCurrentAssets: {
      name: 'Other current assets',
      dataKey: 'otherCurrentAssets',
    },
    totalCurrentAssets: {
      name: 'Current assets',
      dataKey: 'totalCurrentAssets',
      classList: ['bal-sheet-component-total'],
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createCurrentLiabilitiesSection(tableBody, yearsOnly) {
  const financialLineItems = {
    accountsPayable: {
      name: 'Trade payables',
      dataKey: 'currentAccountsPayable',
    },
    shortTermDebt: {
      name: 'Short-term loans & liabilities',
      dataKey: 'shortTermDebt',
    },
    currentLTD: {
      name: 'Current long-term debt',
      dataKey: 'currentLongTermDebt',
    },
    otherCurrentLiabilities: {
      name: 'Other current liabilities',
      dataKey: 'otherCurrentLiabilities',
    },
    totalCurrentLiabilities: {
      name: 'Current liabilities',
      dataKey: 'totalCurrentLiabilities',
      classList: ['bal-sheet-component-total'],
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createEquitySection(tableBody, yearsOnly) {
  const financialLineItems = {
    retainedEarnings: {
      name: 'Retained Earnings',
      dataKey: 'retainedEarnings',
    },
    commonStock: {
      name: 'Common Stock',
      dataKey: 'commonStock',
    },
    treasuryStock: {
      name: 'Treasury Stock',
      dataKey: 'treasuryStock',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);

  return;
}

export function createNonCurrentAssetsSection(tableBody, yearsOnly) {
  const financialLineItems = {
    ppe: {
      name: 'Property, plant and equipment',
      dataKey: 'propertyPlantEquipment',
    },
    longTermInv: {
      name: 'Long-term investments',
      dataKey: 'longTermInvestments',
    },
    goodwill: {
      name: 'Goodwill',
      dataKey: 'goodwill',
    },
    otherIntangibles: {
      name: 'Other intangible assets',
      dataKey: 'intangibleAssetsExcludingGoodwill',
    },
    otherNCA: {
      name: 'Other non-current assets',
      dataKey: 'otherNonCurrentAssets',
    },
    totalNCA: {
      name: 'Non-current assets',
      dataKey: 'totalNonCurrentAssets',
      classList: ['bal-sheet-component-total'],
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);

  return;
}

export function createNonCurrentLiabilitiesSection(tableBody, yearsOnly) {
  const financialLineItems = {
    longTermDebt: {
      name: 'Long-term debts',
      dataKey: 'longTermDebtNoncurrent',
    },
    deferredRevenue: {
      name: 'Deferred Revenue',
      dataKey: 'deferredRevenue',
    },
    leaseObligations: {
      name: 'Capital lease obligations',
      dataKey: 'capitalLeaseObligations',
    },
    otherNCL: {
      name: 'Other non-current liabilities',
      dataKey: 'otherNonCurrentLiabilities',
    },
    totalNCL: {
      name: 'Non-current liabilities',
      dataKey: 'totalNonCurrentLiabilities',
      classList: ['bal-sheet-component-total'],
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);

  return;
}

export function createTableHead(yearsRequested) {
  const head = createElement('thead');
  const tableRow = createElement('tr', { classList: ['years'] });

  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
    classList: ['rounded-heading'],
  });
  tableRow.appendChild(roundedToHeading);

  yearsRequested.forEach((year) => {
    const cell = createElement('th', { text: year });
    tableRow.appendChild(cell);
  });

  head.appendChild(tableRow);

  return head;
}

export function createTotalAssetsRow(yearsOnly) {
  return totalRow('assets', yearsOnly);
}

export function createTotalLiabilitiesRow(yearsOnly) {
  return totalRow('liabilities', yearsOnly);
}

export function createTotalShareholdersEquityRow(yearsOnly) {
  return totalRow('equity', yearsOnly);
}

export function createTotalLiabilitiesAndShareholders(yearsOnly) {
  return totalRow('libsAndEquity', yearsOnly);
}
