// Exports to revenue-and-expenses-projections
export default function calculateNetProfit(profitBeforeTax, taxExpense) {
  const netProfit = {};

  for (let year in profitBeforeTax) {
    netProfit[year] = profitBeforeTax[year] - taxExpense[year];
  }

  return netProfit;
}
