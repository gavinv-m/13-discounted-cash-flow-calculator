import calculateDaysOutstanding from './calc-days-outstanding';
import projectWorkingCapItem from './project-working-cap-item';

// Exports to accounts-receivable-projections.js
export default function projectReceivables(
  receivables,
  revenue,
  projectedRevenue,
) {
  const daysSalesOutstanding =
    calculateDaysOutstanding(receivables, revenue) / 2;
  return projectWorkingCapItem(projectedRevenue, daysSalesOutstanding);
}
