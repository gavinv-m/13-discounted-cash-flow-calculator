import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import { revenueAndExpenses } from '../../../../../../../application-logic/dcf-manager/projections/revenue-and-expenses-projections';
import roundToMillions from '../../../utils/round-to-millions';
import { ebitdaCalculator } from '../../../../../../../application-logic/dcf-manager/projections/terminal-value/ebitda-manager';
import { capexProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/capex-projections';
import { workingCapProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/working-capital/working-capital-manager';
import { fcfManager } from '../../../../../../../application-logic/dcf-manager/projections/terminal-value/fcf-manager';
import { waccManager } from '../../../../../../../application-logic/dcf-manager/projections/terminal-value/wacc-manager';
import { growthRateManager } from '../../../../../../../application-logic/dcf-manager/projections/terminal-value/growth-rate-manager';
import { valuationManager } from '../../../../../../../application-logic/dcf-manager/projections/terminal-value/valuation-manager';
import { balanceSheetDataManager } from '../../../../../../../application-logic/data-centre/refined-data/balance-sheet';
import { overviewDataManager } from '../../../../../../../application-logic/data-centre/refined-data/overview';

/**
 * All Exports to display-terminal-value
 * Main exports sorted alphabetically
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

const createNonFCFItem = function createRowsExcludedFromFCF(rowName) {
  const row = {
    tax: {
      name: 'Tax',
      dataKey: 'taxExpense',
      manager: revenueAndExpenses,
    },
    capex: {
      name: 'CAPEX',
      dataKey: 'capitalExpenditures',
      manager: capexProjectionsManager,
    },
    changeInNWC: {
      name: 'Change in NWC',
      dataKey: 'changesInNetWorkingCapital',
      manager: workingCapProjectionsManager,
    },
  };

  const rowDetails = row[rowName];
  const name = rowDetails.name;
  const formattedName =
    name !== 'Change in NWC' ? `(-) ${name}` : `(Inc)/Dec ${name}`;

  const tableRow = createElement('tr');
  const nameCell = createElement('td', { text: formattedName });
  const emptyCell = createBlankData();

  appendChildren(tableRow, nameCell, emptyCell);

  // Projected amounts
  const projections = rowDetails.manager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];

  for (let year in projections) {
    const amount = roundToMillions(projections[year]);
    const formattedAmount =
      name === 'Change in NWC' && amount < 0 ? amount : `(${amount})`;

    const cell = createElement('td', { text: formattedAmount });
    tableRow.appendChild(cell);
  }

  return tableRow;
};

const enterpriseToEquityValue = function createEquityValueRows(rowName) {
  const row = {
    cash: {
      name: 'Cash and Marketable Securities',
      dataKey: 'cashAndCashEquivalentsAtCarryingValue',
    },
    debt: {
      name: 'Total Debt',
      dataKey: 'shortLongTermDebtTotal',
    },
  };

  const rowDetails = row[rowName];

  const tableRow = createElement('tr');
  const nameCell = createElement('td', { text: rowDetails.name });

  const priorFinYear = projectionYears.startingProjectionYear - 1;
  let amount = balanceSheetDataManager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];
  amount = amount[priorFinYear];
  amount = roundToMillions(amount);
  const formattedAmount =
    rowDetails.name === 'Total Debt' ? `(${amount})` : amount;

  const amountCell = createElement('td', { text: formattedAmount });

  appendChildren(tableRow, nameCell, amountCell);

  return tableRow;
};

const equityToFairValue = function createFairValueRows(rowName) {
  const rows = {
    equity: {
      name: 'Equity Value',
      dataKey: 'equityValue',
      manager: valuationManager,
    },
    shares: {
      name: '(/) Shares Outstanding',
      dataKey: 'SharesOutstanding',
      manager: overviewDataManager,
    },
    fairPrice: {
      name: 'Fair Price',
      dataKey: 'fairPrice',
      manager: valuationManager,
    },
  };

  const rowDetails = rows[rowName];

  const tableRow = createElement('tr');
  const nameCell = createElement('td', { text: rowDetails.name });

  let amount = rowDetails.manager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];

  if (rowDetails.name === 'Fair Price') {
    amount = amount.toFixed(2);
  } else {
    amount = roundToMillions(amount);
  }

  const amountCell = createElement('td', { text: amount });

  appendChildren(tableRow, nameCell, amountCell);

  return tableRow;
};

const percentRow = function createPercentageRow(rowName) {
  const row = {
    wacc: {
      name: 'WACC',
      dataKey: 'wacc',
      manager: waccManager,
    },
    growthRate: {
      name: 'Long-term growth rate',
      dataKey: 'growthRate',
      manager: growthRateManager,
    },
  };

  const rowDetails = row[rowName];

  const tableRow = createElement('tr');
  const nameCell = createElement('td', { text: rowDetails.name });

  let percentage = rowDetails.manager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];
  percentage = (percentage * 100).toFixed(2);
  const percentageCell = createElement('td', { text: `${percentage}%` });

  const emptyCell = createBlankData();
  emptyCell.setAttribute('colspan', '5');

  appendChildren(tableRow, nameCell, percentageCell, emptyCell);

  return tableRow;
};

const totalRow = function createTotalRow(rowName) {
  const rows = {
    ebitda: {
      name: 'EBITDA',
      dataKey: 'ebitda',
      manager: ebitdaCalculator,
    },
    fcf: {
      name: 'Free Cash Flow',
      dataKey: 'freeCashFlow',
      manager: fcfManager,
    },
    pvfcf: {
      name: 'Present value of FCF',
      dataKey: 'pvCashFlows',
      manager: fcfManager,
    },
  };

  const rowDetails = rows[rowName];

  const tableRow = createElement('tr', { classList: ['total-row'] });
  const nameCell = createElement('td', { text: rowDetails.name });
  const emptyCell = createBlankData();
  appendChildren(tableRow, nameCell, emptyCell);

  // Projections
  const projections = rowDetails.manager.sendData(rowDetails.dataKey)[
    rowDetails.dataKey
  ];
  for (let year in projections) {
    let amount = projections[year];
    amount = roundToMillions(amount);
    const cell = createElement('td', { text: amount });

    tableRow.appendChild(cell);
  }

  return tableRow;
};

export function createCapex() {
  return createNonFCFItem('capex');
}

export function createCashRow() {
  return enterpriseToEquityValue('cash');
}

export function createChangeInNWC() {
  return createNonFCFItem('changeInNWC');
}

export function createDebtRow() {
  return enterpriseToEquityValue('debt');
}

export function createEBITDARow() {
  return totalRow('ebitda');
}

export function createEnterpriseValueRow() {
  const tableRow = createElement('tr', { classList: ['total-row'] });
  const nameCell = createElement('td', { text: 'Enterprise Value' });

  let amount = valuationManager.sendData('enterpriseValue').enterpriseValue;
  amount = roundToMillions(amount);
  const amountCell = createElement('td', { text: amount });

  appendChildren(tableRow, nameCell, amountCell);

  return tableRow;
}

export function createEquityValueRow() {
  return equityToFairValue('equity');
}

export function createFairPriceRow() {
  return equityToFairValue('fairPrice');
}

export function createFCFRow() {
  return totalRow('fcf');
}

export function createGrowthRateRow() {
  return percentRow('growthRate');
}

export function createOutstandingSharesRow() {
  return equityToFairValue('shares');
}

export function createPresentValueFCFRow() {
  return totalRow('pvfcf');
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableRow = createElement('tr', { classList: ['years'] });
  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
    classList: ['rounded-heading'],
  });
  const emptyCell = createBlankData();

  appendChildren(tableRow, roundedToHeading, emptyCell);

  const projectionPeriod = projectionYears.projectionYears;
  projectionPeriod.forEach((year) => {
    const cell = createElement('th', { text: year });
    tableRow.appendChild(cell);
  });

  tableHead.appendChild(tableRow);

  return tableHead;
}

export function createTaxExpenseRow() {
  return createNonFCFItem('tax');
}

export function createRowsExcludedFromEBITDA(tableBody) {
  const items = [
    { name: 'Profit Before Tax', key: 'profitBeforeTax' },
    { name: 'Interest Expense', key: 'interestExpense' },
    { name: 'Interest Income', key: 'interestIncome' },
    { name: 'Other Income', key: 'otherNonOperatingIncome' },
  ];

  const income = ['Interest Income', 'Other Income'];

  items.forEach((item) => {
    const tableRow = createElement('tr');

    // Name cell and empty cell
    let itemName = item.name;
    if (item.name !== 'Profit Before Tax') {
      itemName = income.includes(itemName)
        ? `(-) ${itemName}`
        : `(+) ${itemName}`;
    }
    const nameCell = createElement('td', { text: itemName });
    const emptyCell = createBlankData();
    appendChildren(tableRow, nameCell, emptyCell);

    // Amount cells
    const projections = revenueAndExpenses.sendData(item.key)[item.key];
    for (let year in projections) {
      let amount = projections[year];
      amount = typeof amount === 'number' ? roundToMillions(amount) : '-';

      const formattedAmount =
        income.includes(item.name) === true ? `(${amount})` : amount;

      const cell = createElement('td', { text: formattedAmount });
      tableRow.appendChild(cell);
    }
    // Append to table body
    tableBody.appendChild(tableRow);
  });

  return;
}

export function createWACCRow() {
  return percentRow('wacc');
}
