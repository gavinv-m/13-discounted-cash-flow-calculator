import { projectionYears } from '../projection-years-manager';

// Exports to project-receivables.js, project-payable.js
export default function calculateDaysOutstanding(
  balSheetItem,
  incStatementItem,
) {
  // Calculate historical days outstanding recent 5 year average
  const numberOfYears = 5;
  const recentFinancialYear = projectionYears.startingProjectionYear - 1;
  const startingYear = recentFinancialYear - 4;

  let avgDaysOutstanding = 0;
  let year = startingYear;

  while (year <= recentFinancialYear) {
    /**
     * Error handling if no data from first year
     * Use most recent financial year
     */
    if (
      balSheetItem[year] === undefined &&
      incStatementItem[year] === undefined &&
      year === twoYearsAgo
    ) {
      avgDaysOutstanding =
        (balSheetItem[recentFinancialYear] /
          incStatementItem[recentFinancialYear]) *
        365;
      break;
    }

    const daysOutstandingForYear =
      (balSheetItem[year] / incStatementItem[year]) * 365;
    avgDaysOutstanding += daysOutstandingForYear;

    if (year === recentFinancialYear) {
      avgDaysOutstanding = avgDaysOutstanding / numberOfYears;
    }
    year++;
  }

  return avgDaysOutstanding;
}
