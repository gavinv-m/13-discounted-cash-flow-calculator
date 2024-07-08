// Exports to ebitda-manager.js
export default function sumValues(projectedItems, nonNegativeItems) {
  const sumValues = {};

  for (let financialLineItem in projectedItems) {
    for (let year in projectedItems[financialLineItem]) {
      sumValues[year] = sumValues[year] || 0;
      sumValues[year] += nonNegativeItems.includes(financialLineItem)
        ? projectedItems[financialLineItem][year]
        : -projectedItems[financialLineItem][year];
    }
  }

  return sumValues;
}
