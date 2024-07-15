// Exports to revenue-and-expenses-projections
export default function calculateProfitBeforeTax(projections) {
  const profitBeforeTax = {};
  const nonNegativeLineItems = [
    'revenueProjections',
    'otherNonOperatingIncome',
    'interestIncome',
  ];

  /**
   * Issue on reset after user enters custom rates
   * Projections includes the excluded line items listed below
   */
  const excludedLineItems = ['profitBeforeTax', 'taxExpense', 'netProfit'];

  for (let financialLineItem in projections) {
    if (excludedLineItems.includes(financialLineItem)) {
      continue;
    }

    const projectedFinancials = projections[financialLineItem];
    for (let year in projectedFinancials) {
      profitBeforeTax[year] = profitBeforeTax[year] || 0;
      const isNonNegative = nonNegativeLineItems.includes(financialLineItem);

      /**
       * If financial line item is in nonNegativeLineItems:
       * Add to the sum for the projected year,
       * If not, subtract from the sum of the projected year
       */
      profitBeforeTax[year] += isNonNegative
        ? projectedFinancials[year]
        : -projectedFinancials[year];
    }
  }

  return profitBeforeTax;
}
