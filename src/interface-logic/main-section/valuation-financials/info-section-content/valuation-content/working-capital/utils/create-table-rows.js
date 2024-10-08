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
import { inventoryManager } from '../../../../../../../application-logic/dcf-manager/projections/working-capital/inventory-projections';
import getQuestionMarkSvg from '../../../../../../assets/svgs/question-mark';
import {
  createExplainerContainer,
  removeExplainerContent,
} from '../../../../../../utils/explainer-box';

/**
 * All Exports to display-working-cap.js
 * Main multi-line function exports sorted alphabetically
 */
const yearsRow = function createYearsRow() {
  const tableRow = createElement('tr', { classList: ['years'] });

  const emptyCell = createBlankData();
  const historicalDays = createElement('td', {
    innerHTML: `<em>Historical Days</em>`,
  });
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  const priorFinYearCell = createElement('th', { text: priorFinYear });

  appendChildren(tableRow, emptyCell, historicalDays, priorFinYearCell);

  const projectionPeriod = projectionYears.projectionYears;

  projectionPeriod.forEach((year) => {
    const cell = createElement('th', { text: year });
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

export function createChangeInNWC() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', { text: 'Change in NWC' });
  const emptyCellOne = createBlankData();
  const emptyCellTwo = createBlankData();

  appendChildren(tableRow, nameCell, emptyCellOne, emptyCellTwo);

  const changesInNWC = workingCapProjectionsManager.sendData(
    'changesInNetWorkingCapital',
  ).changesInNetWorkingCapital;

  for (let year in changesInNWC) {
    let amount = roundToMillions(changesInNWC[year]);
    let formattedAmount =
      amount < 0 ? `(${Math.abs(amount)})` : amount.toString();
    const cell = createElement('td', { text: formattedAmount });
    tableRow.appendChild(cell);
  }

  return tableRow;
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
    inventory: {
      name: 'Days inventory',
      dataKey: 'daysInventoryOutstanding',
      manager: inventoryManager,
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

export function createDaysInventories() {
  return createDaysRow('inventory');
}

export function createDaysReceivable() {
  return createDaysRow('receivable');
}

export function createDaysPayables() {
  return createDaysRow('payable');
}

export function createNetWorkingCapital() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', { text: 'Net working capital' });
  const emptyCell = createBlankData();

  // Prior financial year amount
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  let priorFinYearAmt = workingCapProjectionsManager.sendData(
    'historicalNetWorkingCapital',
  ).historicalNetWorkingCapital;
  priorFinYearAmt = roundToMillions(priorFinYearAmt[priorFinYear]);
  const priorFinYearAmtCell = createElement('td', {
    text: priorFinYearAmt,
  });

  appendChildren(tableRow, nameCell, emptyCell, priorFinYearAmtCell);

  // Projected net working capital
  const projectedAmounts = workingCapProjectionsManager.sendData(
    'projectedNetWorkingCapital',
  ).projectedNetWorkingCapital;

  for (let year in projectedAmounts) {
    let amount = roundToMillions(projectedAmounts[year]);
    const cell = createElement('td', { text: amount });
    tableRow.appendChild(cell);
  }

  return tableRow;
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableHeadRow = createElement('tr');
  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
    classList: ['rounded-heading'],
  });
  roundedToHeading.setAttribute('colspan', '2');

  const blankRow = createBlankData();

  const projectionsHeading = createElement('th', {
    text: 'Projections',
    classList: ['projections-heading'],
  });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(tableHeadRow, roundedToHeading, blankRow, projectionsHeading);
  appendChildren(tableHead, tableHeadRow, createBlankRow());
  tableHead.appendChild(yearsRow());

  return tableHead;
}

const createTradeRow = function createWorkingCapItemRow(rowName) {
  const row = {
    receivables: {
      name: 'Trade Receivables',
      dataKey: 'currentNetReceivables',
      explainerText: `Since no credit sales data were found in the API, 
      our current assumption is 50% of total sales as credit sales for calculating Days Sales Outstanding.`,
      explainerID: 'receivables-explainer',
      questionMarkID: 'receivables-question',
    },
    payables: {
      name: 'Trade Payables',
      dataKey: 'currentAccountsPayable',
      questionMarkID: 'payables-question',
    },
    inventory: {
      name: 'Inventory',
      dataKey: 'inventory',
      questionMarkID: 'inventory-question',
    },
  };

  const rowDetails = row[rowName];
  const tableRow = createElement('tr');

  const nameAndQuestionCell = createElement('td');
  const nameContainer = createElement('div', { text: rowDetails.name });
  const questionContainer = createElement('div', {
    id: rowDetails.questionMarkID,
  });

  if (rowDetails.name === 'Trade Receivables') {
    nameAndQuestionCell.setAttribute('id', 'working-receivables');
    questionContainer.innerHTML = getQuestionMarkSvg();

    questionContainer.addEventListener('mouseover', () => {
      createExplainerContainer(
        rowDetails.explainerText,
        rowDetails.explainerID,
        rowDetails.questionMarkID,
      );
    });

    questionContainer.addEventListener('mouseout', () => {
      removeExplainerContent(rowDetails.explainerID, rowDetails.questionMarkID);
    });
  }
  appendChildren(nameAndQuestionCell, nameContainer, questionContainer);
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

  appendChildren(tableRow, nameAndQuestionCell, emptyCell, priorFinYearAmtCell);

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

export function createInventory() {
  return createTradeRow('inventory');
}

export function createTradeReceivables() {
  return createTradeRow('receivables');
}

export function createTradePayables() {
  return createTradeRow('payables');
}
