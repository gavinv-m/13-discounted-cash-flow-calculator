import { createElement } from '../../../../../../utils/element-utils';
import { cashFlowStatementDataManager } from '../../../../../../../application-logic/data-centre/refined-data/cash-flow-statement';
import roundToMillions from '../../../utils/round-to-millions';
import { workingCapProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/working-capital/working-capital-manager';

/**
 * All Exports to display-cash-flow.js
 * Main exports sorted alphabetically
 * Function expressions on top
 */

const createRows = function createNonTotalRows(
  financialLineItems,
  tableBody,
  yearsOnly,
) {
  const negativeItems = [
    'Cash receipts',
    'Capital expenditures',
    'Cash dividend payout',
    'Share buyback',
  ];

  for (let line in financialLineItems) {
    const details = financialLineItems[line];

    const tableRow = createElement('tr');
    if (details.classList !== undefined) {
      tableRow.classList.add(details.classList);
    }

    const nameCell = createElement('td', { text: [details.name] });
    tableRow.appendChild(nameCell);

    const dataKey = details.dataKey;
    const historicalData =
      cashFlowStatementDataManager.sendData(dataKey)[dataKey];

    yearsOnly.forEach((year) => {
      let amount = roundToMillions(historicalData[year]);
      let formattedAmount = Number(amount) === 0 ? '-' : amount;
      formattedAmount =
        negativeItems.includes(details.name) === true && formattedAmount !== '-'
          ? `(${formattedAmount})`
          : formattedAmount;

      const cell = createElement('td', { text: formattedAmount });
      tableRow.appendChild(cell);
    });

    tableBody.appendChild(tableRow);
  }
};

const totalRow = function createTotalsRow(totalName, yearsOnly) {
  const totals = {
    operating: {
      name: 'Cash from operating activities',
      dataKey: 'operatingCashflow',
    },
    investing: {
      name: 'Cash from investing activities',
      dataKey: 'cashflowFromInvestment',
    },
    financing: {
      name: 'Cash from financing activities',
      dataKey: 'cashflowFromFinancing',
    },
  };

  const details = totals[totalName];

  const tableRow = createElement('tr', { classList: ['cash-flow-total'] });
  const nameCell = createElement('td', { text: details.name });
  tableRow.appendChild(nameCell);

  const historicalData = cashFlowStatementDataManager.sendSignedData(
    details.dataKey,
  )[details.dataKey];

  yearsOnly.forEach((year) => {
    let amount = roundToMillions(historicalData[year]);
    const formattedAmount =
      Number(amount) < 0
        ? `(${amount * -1})`
        : Number(amount) === 0
          ? '-'
          : amount;

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

export function createChangeInCashRow(yearsOnly) {
  const changeInCash = cashFlowStatementDataManager.getChangeInCash();

  const tableRow = createElement('tr');
  const nameCell = createElement('td', {
    text: 'Change in cash and cash equivalents',
  });
  tableRow.appendChild(nameCell);

  yearsOnly.forEach((year) => {
    let amount = roundToMillions(changeInCash[year]);
    const formattedAmount = Number(amount) < 0 ? `(${amount * -1})` : amount;
    const amountCell = createElement('td', { text: formattedAmount });
    tableRow.appendChild(amountCell);
  });

  return tableRow;
}

export function createChangeInNWCRow(yearsOnly) {
  const changeInNWC = workingCapProjectionsManager.sendData(
    'historicalChangesInNWC',
  ).historicalChangesInNWC;

  const tableRow = createElement('tr');
  const nameCell = createElement('td', { text: 'Changes in working capital' });
  tableRow.appendChild(nameCell);

  yearsOnly.forEach((year) => {
    let amount = roundToMillions(changeInNWC[year]);
    const formattedAmount = Number(amount) < 0 ? amount * -1 : `(${amount})`;
    const amountCell = createElement('td', { text: formattedAmount });
    tableRow.appendChild(amountCell);
  });

  return tableRow;
}

export function createExchangeDifferenceSection(tableBody, yearsOnly) {
  const financialLineItems = {
    exchangeDifference: {
      name: 'Foreign exchange difference',
      dataKey: 'changeInExchangeRate',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createFinancingActivitiesSection(tableBody, yearsOnly) {
  const financialLineItems = {
    dividendPayout: {
      name: 'Cash dividend payout',
      dataKey: 'dividendPayout',
    },
    shareBuyBack: {
      name: 'Share buyback',
      dataKey: 'paymentsForRepurchaseOfEquity',
    },
    issuance: {
      name: 'Issue of shares and/or debt',
      dataKey: 'proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createFinancingActivitiesTotal(yearsOnly) {
  return totalRow('financing', yearsOnly);
}

export function createInvestingActivitiesSection(tableBody, yearsOnly) {
  const financialLineItems = {
    capex: {
      name: 'Capital expenditures',
      dataKey: 'capitalExpenditures',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createInvestingActivitiesTotal(yearsOnly) {
  return totalRow('investing', yearsOnly);
}

export function createOperatingActivitiesSection(tableBody, yearsOnly) {
  const financialLineItems = {
    netIncome: {
      name: 'Net income',
      dataKey: 'netIncome',
    },
    depreciationAmort: {
      name: 'Depreciation and amortisation',
      dataKey: 'depreciationDepletionAndAmortization',
    },
    cashPaid: {
      name: 'Cash payments',
      dataKey: 'paymentsForOperatingActivities',
    },
    cashReceipt: {
      name: 'Cash receipts',
      dataKey: 'proceedsFromOperatingActivities',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createOperatingActivityTotal(yearsOnly) {
  return totalRow('operating', yearsOnly);
}

export function createTableHead(yearsAndMonths) {
  const head = createElement('thead');
  const tableRow = createElement('tr', { classList: ['years'] });

  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
    classList: ['rounded-heading'],
  });
  tableRow.appendChild(roundedToHeading);

  yearsAndMonths.forEach((year) => {
    const cell = createElement('th', { text: year });
    tableRow.appendChild(cell);
  });

  head.appendChild(tableRow);

  return head;
}
