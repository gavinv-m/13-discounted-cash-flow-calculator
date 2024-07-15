// Exports to revenue-and-expenses-projections.js
export default function calculateTaxExpense(profitBeforeTax, taxRate) {
  const taxExpense = {};

  for (let year in profitBeforeTax) {
    taxExpense[year] = profitBeforeTax[year] * (taxRate / 100);
  }

  return taxExpense;
}
