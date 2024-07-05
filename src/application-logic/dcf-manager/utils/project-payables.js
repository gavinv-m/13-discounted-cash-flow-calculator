import calculateDaysOutstanding from './calc-days-outstanding';
import projectWorkingCapItem from './project-working-cap-item';

// Exports to accounts-payable-projections.js
export default function projectPayables(payables, cogs, projectedCOGS) {
  const daysPayablesOutstanding = calculateDaysOutstanding(payables, cogs);
}
