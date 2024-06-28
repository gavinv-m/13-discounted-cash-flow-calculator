// Exports to income-statement.js, balance-sheet.js, cash-flow-statement.js
export default function getFinancialLineItems(
  lineItemsRequested,
  statementData,
) {
  const lineItemsToReturn = {};

  lineItemsRequested.forEach((financialLineItem) => {
    lineItemsToReturn[financialLineItem] = statementData[financialLineItem];
  });

  return lineItemsToReturn;
}
