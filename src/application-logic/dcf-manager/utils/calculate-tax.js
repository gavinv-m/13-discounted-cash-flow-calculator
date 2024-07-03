// Exports to revenue-and-expenses-projections.js
export default function calculateTaxExpense(profitBeforeTax, taxRate = 21) {
  const taxExpense = {};

  for (let year in profitBeforeTax) {
    taxExpense[year] = profitBeforeTax[year] * (taxRate / 100);
  }

  return taxExpense;
}
