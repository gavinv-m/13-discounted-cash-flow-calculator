import calculateDaysOutstanding from './calc-days-outstanding';

// Exports to accounts-receivable-projections.js
export default function projectReceivables(
  receivables,
  revenue,
  projectedRevenue,
) {
  const daysSalesOutstanding = calculateDaysOutstanding(receivables, revenue);
  const projectedReceivables = {};

  for (let year in projectedRevenue) {
    const projectedReceivable =
      (projectedRevenue[year] / 365) * daysSalesOutstanding;
    projectedReceivables[year] = projectedReceivable;
  }

  return projectedReceivables;
}
