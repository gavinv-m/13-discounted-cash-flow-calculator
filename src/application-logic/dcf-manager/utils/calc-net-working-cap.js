// Exports to working-capital-manager.js
export default function calculateNetWorkingCapital(workingCapitalItems) {
  const netWorkingCapital = {};
  const nonNegativeItems = ['currentNetReceivables', 'inventory'];

  for (let item in workingCapitalItems) {
    for (let year in workingCapitalItems[item]) {
      netWorkingCapital[year] = netWorkingCapital[year] || 0;

      // Add if non-negative, subtract if otherwise
      const isNonNegative = nonNegativeItems.includes(item);
      netWorkingCapital[year] += isNonNegative
        ? workingCapitalItems[item][year]
        : -workingCapitalItems[item][year];
    }
  }

  return netWorkingCapital;
}
