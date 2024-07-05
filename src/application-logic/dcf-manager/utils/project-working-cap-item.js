// Exports to project-receivables.js
export default function projectWorkingCapItem(projectedItem, daysOutstanding) {
  const projectedWorkingCapitalItem = {};

  for (let year in projectedItem) {
    const projectedAmount = (projectedItem[year] / 365) * daysOutstanding;
    projectedWorkingCapitalItem[year] = projectedAmount;
  }

  return projectedWorkingCapitalItem;
}
