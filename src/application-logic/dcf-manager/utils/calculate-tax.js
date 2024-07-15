// Exports to revenue-and-expenses-projections.js
export default function calculateTaxExpense(profitBeforeTax, taxRate) {
  const taxExpense = {};

  taxRate = taxRate === null ? 21 : taxRate; // Default to U.S. Corporate Rate

  for (let year in profitBeforeTax) {
    taxExpense[year] = profitBeforeTax[year] * (taxRate / 100);
  }

  return taxExpense;
}
