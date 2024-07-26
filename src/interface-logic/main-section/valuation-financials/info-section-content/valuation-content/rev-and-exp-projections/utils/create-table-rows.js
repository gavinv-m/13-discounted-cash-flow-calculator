import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import getQuestionMarkSvg from '../../../../../../assets/svgs/question-mark';
import { incomeStatementDataManager } from '../../../../../../../application-logic/data-centre/refined-data/income-statement';
import roundToMillions from '../../../utils/round-to-millions';
import { revenueAndExpenses } from '../../../../../../../application-logic/dcf-manager/projections/revenue-and-expenses-projections';
import { activeMetrics } from '../../../../../../../application-logic/data-centre/active-metrics/active-metrics';

/**
 * All Exports to display-rev-and-exp projections
 * Sorted alphabetically
 */
export function createBlankRow() {
  return createElement('tr', { classList: ['blank-row'] });
}

export function createBlankData() {
  return createElement('td', { classList: ['blank-data'] });
}

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

export function createExpenseRows(tableBody) {
  const expenses = [
    { name: 'Cost of Revenue', key: 'costOfRevenue' },
    { name: 'Selling, G&A Expenses', key: 'sellingGeneralAndAdministrative' },
    { name: 'Research & Development', key: 'researchAndDevelopment' },
    { name: 'Other Income', key: 'otherNonOperatingIncome' },
    { name: 'Interest Income', key: 'interestIncome' },
    { name: 'Interest Expense', key: 'interestExpense' },
    { name: 'Tax Expense', key: 'taxExpense' },
    { name: 'Net Profit', key: 'netProfit' },
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
  });
}

export function createRevenueRow() {
  const tableRow = createElement('tr');

  const questionMarkSpan = getQuestionMarkSvg();
  // TODO: Event Listener for icon

  const nameCell = createElement('td', {
    innerHTML: `Revenue ${questionMarkSpan}`,
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

  const cell = createElement('td', { text: `% Growth: ${percentGrowth}` });
  return tableRow.appendChild(cell);
}

export function createTableBody() {
  return createElement('tbody');
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableRow = createElement('tr');
  const roundedToHeading = createElement('td', {
    innerHTML: '<span><em>(USD in millions</em></span>',
  });
  const blank = createElement('td');
  const projectionsHeading = createElement('td', { text: 'Projections' });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(tableRow, roundedToHeading, blank, projectionsHeading);
  tableHead.appendChild(tableRow);
  tableHead.appendChild(createBlankRow());

  return tableHead;
}

export function createYearsRow() {
  const tableRow = createElement('tr', { classList: ['years'] });
  const blankOne = createBlankData();

  const priorFinancialYear = projectionYears.startingProjectionYear - 1;
  const priorFinancialYearTD = createElement('td', {
    text: priorFinancialYear,
  });

  // Append blank and prior year
  appendChildren(tableRow, blankOne, priorFinancialYearTD);

  const projectionPeriod = projectionYears.projectionYears;
  projectionPeriod.forEach((year) => {
    const createTD = createElement('td', { text: year });
    tableRow.appendChild(createTD);
  });

  return tableRow;
}
