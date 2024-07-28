import calculateDaysOutstanding from './calc-days-outstanding';
import projectWorkingCapItem from './project-working-cap-item';

// Exports to inventory-projections.js
export default function projectInventories(
  inventory,
  costOfRevenue,
  projectedCostOfRevenue,
) {
  const daysInventoryOutstanding = calculateDaysOutstanding(
    inventory,
    costOfRevenue,
  );
  return {
    projectedInventory: projectWorkingCapItem(
      projectedCostOfRevenue,
      daysInventoryOutstanding,
    ),
    daysInventoryOutstanding: daysInventoryOutstanding,
  };
}
