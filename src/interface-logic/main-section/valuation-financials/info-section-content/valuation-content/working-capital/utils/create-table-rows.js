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

export function createDaysReceivable() {
  let daysSalesOutstanding = accountsReceivableManager.sendData(
    'daysSalesOutstanding',
  ).daysSalesOutstanding;
  daysSalesOutstanding = Math.round(daysSalesOutstanding);

  const tableRow = createElement('tr');

  const nameCell = createElement('td', {
    innerHTML: `<span><em>Days receivables</em></span>`,
    classList: ['days-outstanding'],
  });
  const amountCell = createElement('td', {
    text: daysSalesOutstanding,
    classList: ['days-outstanding'],
  });

  appendChildren(tableRow, nameCell, amountCell);

  return tableRow;
}

export function createDaysPayables() {
  let daysPayablesOutstanding = accountsPayableManager.sendData(
    'daysPayablesOutstanding',
  ).daysPayablesOutstanding;
  daysPayablesOutstanding = Math.round(daysPayablesOutstanding);

  const tableRow = createElement('tr');

  const nameCell = createElement('td', {
    innerHTML: `<span><em>Days payables</em></span>`,
    classList: ['days-outstanding'],
  });
  const amountCell = createElement('td', {
    text: daysPayablesOutstanding,
    classList: ['days-outstanding'],
  });

  appendChildren(tableRow, nameCell, amountCell);

  return tableRow;
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

export function createTradeReceivables() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', { text: 'Trade Receivables' });
  const emptyCell = createElement('td');

  // Prior year receivable
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  let priorFinYearAmt = balanceSheetDataManager.sendData(
    'currentNetReceivables',
  ).currentNetReceivables;
  priorFinYearAmt = roundToMillions(priorFinYearAmt[priorFinYear]);
  const priorFinYearAmtCell = createElement('td', { text: priorFinYearAmt });

  appendChildren(tableRow, nameCell, emptyCell, priorFinYearAmtCell);

  // Projected receivables
  const projectedReceivables = workingCapProjectionsManager.sendData(
    'currentNetReceivables',
  ).currentNetReceivables;

  for (let year in projectedReceivables) {
    let amount = projectedReceivables[year];
    amount = roundToMillions(amount);

    const cell = createElement('td', { text: amount });
    tableRow.appendChild(cell);
  }

  return tableRow;
}

export function createTradePayables() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', { text: 'Trade Payables' });
  const emptyCell = createElement('td');

  // Prior year payable
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  let priorFinYearAmt = balanceSheetDataManager.sendData(
    'currentAccountsPayable',
  ).currentAccountsPayable;
  priorFinYearAmt = roundToMillions(priorFinYearAmt[priorFinYear]);
  const priorFinYearAmtCell = createElement('td', {
    text: `(${priorFinYearAmt})`,
  });

  appendChildren(tableRow, nameCell, emptyCell, priorFinYearAmtCell);

  // Projected receivables
  const projectedPayables = workingCapProjectionsManager.sendData(
    'currentAccountsPayable',
  ).currentAccountsPayable;

  for (let year in projectedPayables) {
    let amount = projectedPayables[year];
    amount = roundToMillions(amount);

    const cell = createElement('td', { text: `(${amount})` });
    tableRow.appendChild(cell);
  }

  return tableRow;
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
