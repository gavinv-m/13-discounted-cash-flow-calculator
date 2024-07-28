import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { accountsReceivableManager } from '../../../../../../../application-logic/dcf-manager/projections/working-capital/accounts-receivable-projections';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import { balanceSheetDataManager } from '../../../../../../../application-logic/data-centre/refined-data/balance-sheet';
import { workingCapProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/working-capital/working-capital-manager';
import roundToMillions from '../../../utils/round-to-millions';
import { accountsPayableManager } from '../../../../../../../application-logic/dcf-manager/projections/working-capital/accounts-payable-projections';

/**
 * All Exports to display-working-cap.js
 * Main multi-line function exports sorted alphabetically
 */
export function createBlankRow() {
  return createElement('tr', { classList: ['blank-row'] });
}

export function createBlankData() {
  return createElement('td', { classList: ['blank-data'] });
}

export function createTableBody() {
  return createElement('tbody');
}

const createDaysRow = function createDaysOutstandingRow(rowName) {
  const row = {
    receivable: {
      name: 'Days receivables',
      dataKey: 'daysSalesOutstanding',
      manager: accountsReceivableManager,
    },
    payable: {
      name: 'Days payables',
      dataKey: 'daysPayablesOutstanding',
      manager: accountsPayableManager,
    },
  };

  const rowDetails = row[rowName];

  let daysOutstanding = rowDetails.manager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];
  daysOutstanding = Math.round(daysOutstanding);

  const tableRow = createElement('tr');

  const nameCell = createElement('td', {
    innerHTML: `<span><em>${rowDetails.name}</em></span>`,
    classList: ['days-outstanding'],
  });
  const amountCell = createElement('td', {
    text: daysOutstanding,
    classList: ['days-outstanding'],
  });

  appendChildren(tableRow, nameCell, amountCell);

  return tableRow;
};

export function createDaysReceivable() {
  return createDaysRow('receivable');
}

export function createDaysPayables() {
  return createDaysRow('payable');
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableHeadRow = createElement('tr');
  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
  });
  roundedToHeading.setAttribute('colspan', '2');

  const blankRow = createBlankData();

  const projectionsHeading = createElement('th', { text: 'Projections' });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(tableHeadRow, roundedToHeading, blankRow, projectionsHeading);
  appendChildren(tableHead, tableHeadRow, createBlankRow());

  return tableHead;
}

const createTradeRow = function createWorkingCapItemRow(rowName) {
  const row = {
    receivables: {
      name: 'Trade Receivables',
      dataKey: 'currentNetReceivables',
    },
    payables: {
      name: 'Trade Payables',
      dataKey: 'currentAccountsPayable',
    },
  };

  const rowDetails = row[rowName];
  const tableRow = createElement('tr');

  const nameCell = createElement('td', { text: rowDetails.name });
  const emptyCell = createElement('td');

  // Prior year amount
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  let priorFinYearAmt = balanceSheetDataManager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];
  priorFinYearAmt = roundToMillions(priorFinYearAmt[priorFinYear]);
  const formattedPriorYearAmt =
    rowName === 'payables' ? `(${priorFinYearAmt})` : priorFinYearAmt;
  const priorFinYearAmtCell = createElement('td', {
    text: formattedPriorYearAmt,
  });

  appendChildren(tableRow, nameCell, emptyCell, priorFinYearAmtCell);

  // Projected amounts
  const projectedAmounts = workingCapProjectionsManager.sendData(
    rowDetails.dataKey,
  )[rowDetails.dataKey];

  for (let year in projectedAmounts) {
    let amount = roundToMillions(projectedAmounts[year]);
    const formattedAmount = rowName === 'payables' ? `(${amount})` : amount;
    const cell = createElement('td', { text: formattedAmount });
    tableRow.appendChild(cell);
  }

  return tableRow;
};

export function createTradeReceivables() {
  return createTradeRow('receivables');
}

export function createTradePayables() {
  return createTradeRow('payables');
}

export function createYearsRow() {
  const tableRow = createElement('tr');

  const emptyCell = createBlankData();
  const historicalDays = createElement('td', { text: 'Historical Days' });
  const priorFinYear = projectionYears.startingProjectionYear - 1;

  appendChildren(tableRow, emptyCell, historicalDays, priorFinYear);

  const projectionPeriod = projectionYears.projectionYears;

  projectionPeriod.forEach((year) => {
    const cell = createElement('td', { text: year });
    tableRow.appendChild(cell);
  });

  return tableRow;
}
