import { createElement } from '../../../../../../utils/element-utils';
import { incomeStatementDataManager } from '../../../../../../../application-logic/data-centre/refined-data/income-statement';
import roundToMillions from '../../../utils/round-to-millions';

/**
 * All Exports to display-inc-statement.js
 * Main exports sorted alphabetically
 * Function expressions on top
 */

const createRows = function nonTotalsRows(
  financialLineItems,
  tableBody,
  yearsOnly,
) {
  const negativeItems = [
    'Cost of goods sold',
    'Depreciation and amortisation',
    'Selling, G&A expenses',
    'Research and development',
    'Tax expense',
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
      incomeStatementDataManager.sendData(dataKey)[dataKey];

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
};

const totalRow = function createTotalsRow(totalName, yearsOnly) {
  const totals = {
    grossProfit: {
      name: 'Gross Profit',
      dataKey: 'grossProfit',
    },
    profitBeforeTax: {
      name: 'Profit before tax',
      dataKey: 'incomeBeforeTax',
    },
    netProfit: {
      name: 'Net profit',
      dataKey: 'netIncome',
    },
  };

  const details = totals[totalName];

  const tableRow = createElement('tr', { classList: ['inc-stat-total'] });
  const nameCell = createElement('td', { text: details.name });
  tableRow.appendChild(nameCell);

  const historicalData = incomeStatementDataManager.sendData(details.dataKey)[
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

export function createContributionMarginSection(tableBody, yearsOnly) {
  const financialLineItems = {
    revenue: {
      name: 'Revenue',
      dataKey: 'totalRevenue',
    },
    cogs: {
      name: 'Cost of goods sold',
      dataKey: 'costOfRevenue',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createGrossProfitTotal(yearsOnly) {
  return totalRow('grossProfit', yearsOnly);
}

export function createIncomeExpensesSection(tableBody, yearsOnly) {
  const financialLineItems = {
    interestIncome: {
      name: 'Interest income',
      dataKey: 'interestIncome',
    },
    otherIncome: {
      name: 'Other non-operating income',
      dataKey: 'otherNonOperatingIncome',
    },
    sga: {
      name: 'Selling, G&A expenses',
      dataKey: 'sellingGeneralAndAdministrative',
    },
    researchDevelopment: {
      name: 'Research and development',
      dataKey: 'researchAndDevelopment',
    },
    depAmort: {
      name: 'Depreciation and amortisation',
      dataKey: 'depreciationAndAmortization',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}

export function createNetProfitTotal(yearsOnly) {
  return totalRow('netProfit', yearsOnly);
}

export function createProfitBeforeTaxTotal(yearsOnly) {
  return totalRow('profitBeforeTax', yearsOnly);
}

export function createTableHead(yearsRequested) {
  const head = createElement('thead');
  const tableRow = createElement('tr');

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

export function createTaxExpenseSection(tableBody, yearsOnly) {
  const financialLineItems = {
    taxExp: {
      name: 'Tax expense',
      dataKey: 'incomeTaxExpense',
    },
  };

  createRows(financialLineItems, tableBody, yearsOnly);
  return;
}
