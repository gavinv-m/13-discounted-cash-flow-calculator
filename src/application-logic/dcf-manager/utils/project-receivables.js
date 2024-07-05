import calculateDaysOutstanding from './calc-days-outstanding';

// Exports to accounts-receivable-projections.js
export default function projectReceivables(
  receivables,
  revenue,
  projectedRevenue,
) {
  const daysSalesOutstanding = calculateDaysOutstanding(receivables, revenue);
  console.log(daysSalesOutstanding);
}
