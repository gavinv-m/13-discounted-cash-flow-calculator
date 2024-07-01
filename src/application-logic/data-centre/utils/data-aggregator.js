// Exports to income-statement.js, balance-sheet.js
export default function aggregateFinancialData(financialStatementData) {
  const annualReports = financialStatementData.annualReports;
  const statementData = {};

  annualReports.forEach((year) => {
    const fiscalYear = year.fiscalDateEnding.split('-')[0];

    for (let financialLineItem in year) {
      // Check if financial line item exists in statementData
      statementData[financialLineItem] = statementData[financialLineItem] || {};

      let amount = Math.abs(year[financialLineItem]);
      if (isNaN(amount) === true) {
        amount = 0;
      }
      statementData[financialLineItem][fiscalYear] = amount;
    }
  });

  return statementData;
}
