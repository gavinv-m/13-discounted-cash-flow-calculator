import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import { incomeStatementDataManager } from '../../../../../../../application-logic/data-centre/refined-data/income-statement';
import roundToMillions from '../../../utils/round-to-millions';
import { revenueAndExpenses } from '../../../../../../../application-logic/dcf-manager/projections/revenue-and-expenses-projections';
import { activeMetrics } from '../../../../../../../application-logic/data-centre/active-metrics/active-metrics';

/**
 * All Exports to display-rev-and-exp projections
 * Main exports sorted alphabetically
 */
export function createBlankRow() {
  return createElement('tr', { classList: ['blank-row'] });
}

export function createBlankData() {
  return createElement('td', { classList: ['blank-data'] });
}

export function createTableFooter() {
  return createElement('tfoot');
}

const createExpensePercentageRow = (tableBody, itemKey) => {
  const percentage = revenueAndExpenses.expensePercentagesOfRevenue[itemKey];
  if (percentage !== undefined) {
    const tableRow = createElement('tr');
    const text = `<span class='rev-percent'>% of Revenue:</span> ${percentage.toFixed(2)}`;
    const cell = createElement('td', { innerHTML: text });

    tableRow.appendChild(cell);

    // Append the percentage row to the table body
    tableBody.appendChild(tableRow);
  }
};

const createPriorYearCell = (item) => {
  const priorFinancialYear = projectionYears.startingProjectionYear - 1;

  let itemKey = item.key;

  // API Data doesn't have taxExpense and netProfit
  if (itemKey === 'taxExpense') {
    itemKey = 'incomeTaxExpense';
  } else if (itemKey === 'netProfit') {
    itemKey = 'netIncome';
  }

  let priorFinancialYearAmt;
  try {
    priorFinancialYearAmt =
      incomeStatementDataManager.sendData(itemKey)[itemKey][priorFinancialYear];
    priorFinancialYearAmt = roundToMillions(priorFinancialYearAmt);
  } catch (error) {
    console.error(`Error processing ${itemKey} for prior year:`, error);
    priorFinancialYearAmt = 'N/A';
  }

  const expensesWithBrackets = [
    'costOfRevenue',
    'sellingGeneralAndAdministrative',
    'researchAndDevelopment',
    'interestExpense',
    'incomeTaxExpense',
  ];
  if (expensesWithBrackets.includes(itemKey)) {
    priorFinancialYearAmt = `(${priorFinancialYearAmt})`;
  }

  return createElement('td', {
    text: priorFinancialYearAmt,
  });
};

const yearsRow = function createYearsRow() {
  const tableRow = createElement('tr', { classList: ['years'] });
  const blankOne = createBlankData();

  const priorFinancialYear = projectionYears.startingProjectionYear - 1;
  const priorFinancialYearTD = createElement('th', {
    text: priorFinancialYear,
  });

  // Append blank and prior year
  appendChildren(tableRow, blankOne, priorFinancialYearTD);

  const projectionPeriod = projectionYears.projectionYears;
  projectionPeriod.forEach((year) => {
    const createTD = createElement('th', { text: year });
    tableRow.appendChild(createTD);
  });

  return tableRow;
};

export function createExpenseRows(tableBody) {
  const expenses = [
    { name: 'Cost of Revenue', key: 'costOfRevenue' },
    { name: 'Selling, G&A Expenses', key: 'sellingGeneralAndAdministrative' },
    { name: 'Research & Development', key: 'researchAndDevelopment' },
    { name: 'Other Income', key: 'otherNonOperatingIncome' },
    { name: 'Interest Income', key: 'interestIncome' },
    { name: 'Interest Expense', key: 'interestExpense' },
    { name: 'Tax Expense', key: 'taxExpense' },
  ];

  expenses.forEach((item) => {
    const tableRow = createElement('tr');

    const nameCell = createElement('td', { text: item.name });
    const priorFinYearCell = createPriorYearCell(item);

    appendChildren(tableRow, nameCell, priorFinYearCell);

    // Projections Cells
    const itemKey = item.key;
    const yearsAndAmounts = revenueAndExpenses.sendData(itemKey)[itemKey];
    const projectionPeriod = projectionYears.projectionYears;

    projectionPeriod.forEach((year) => {
      let amount = roundToMillions(yearsAndAmounts[year]);

      const expensesWithBrackets = [
        'costOfRevenue',
        'sellingGeneralAndAdministrative',
        'researchAndDevelopment',
        'interestExpense',
        'incomeTaxExpense',
      ];
      if (expensesWithBrackets.includes(itemKey)) {
        amount = `(${amount})`;
      }

      const cell = createElement('td', { text: amount });
      tableRow.appendChild(cell);
    });

    tableBody.appendChild(tableRow);

    // Call the function to create expense percentage row for each item
    if (itemKey !== 'taxExpense' && itemKey !== 'netProfit') {
      createExpensePercentageRow(tableBody, itemKey);
    }
  });
}

export function createRevenueRow() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', {
    innerHTML: `Revenue`,
  });

  // Prior FinancialYear
  const priorFinancialYear = projectionYears.startingProjectionYear - 1;
  let priorFinancialYearAmt =
    incomeStatementDataManager.sendData('totalRevenue').totalRevenue;
  priorFinancialYearAmt = priorFinancialYearAmt[priorFinancialYear];
  priorFinancialYearAmt = roundToMillions(priorFinancialYearAmt);

  const priorFinYearCell = createElement('td', { text: priorFinancialYearAmt });

  // Append name and prior fin year cells to table row
  appendChildren(tableRow, nameCell, priorFinYearCell);

  // Projections
  const projections =
    revenueAndExpenses.sendData('revenueProjections').revenueProjections;

  for (let year in projections) {
    const amount = roundToMillions(projections[year]);
    const cell = createElement('td', { text: amount });
    tableRow.appendChild(cell);
  }

  return tableRow;
}

export function createRevenuePercentRow() {
  const tableRow = createElement('tr');

  let percentGrowth = activeMetrics.getMetrics().revenueGrowthRate;
  percentGrowth = percentGrowth.toFixed(2);

  const cell = createElement('td', {
    innerHTML: `<span class='rev-percent'>% Growth:</span> ${percentGrowth}`,
  });
  tableRow.appendChild(cell);

  return tableRow;
}

export function createTableBody() {
  return createElement('tbody');
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableRow = createElement('tr');
  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
    classList: ['rounded-heading'],
  });
  const blank = createElement('td');
  const projectionsHeading = createElement('th', {
    text: 'Projections',
    classList: ['projections-heading'],
  });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(tableRow, roundedToHeading, blank, projectionsHeading);
  tableHead.appendChild(tableRow);
  tableHead.appendChild(createBlankRow());
  tableHead.appendChild(yearsRow());

  return tableHead;
}

export function createNetProfitRow() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', { text: 'Net Profit' });

  // Make use of existing prior year function
  const netProfitDetails = { name: 'Net Profit', key: 'netProfit' };
  const priorFinYearCell = createPriorYearCell(netProfitDetails);

  appendChildren(tableRow, nameCell, priorFinYearCell);

  // Projected net profit
  const yearsAndAmounts = revenueAndExpenses.sendData('netProfit').netProfit;
  const projectionPeriod = projectionYears.projectionYears;

  projectionPeriod.forEach((year) => {
    let amount = roundToMillions(yearsAndAmounts[year]);

    // Format negative amounts with brackets
    if (amount < 0) {
      amount = `(${Math.abs(amount)})`;
    }

    const cell = createElement('td', { text: amount });
    tableRow.appendChild(cell);
  });

  return tableRow;
}
