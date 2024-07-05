import { projectionYears } from '../projection-years-manager';

// Exports to project-receivables.js, project-payable.js
export default function calculateDaysOutstanding(
  balSheetItem,
  incStatementItem,
) {
  // Calculate days outstanding recent 3 year average
  const recentFinancialYear = projectionYears.startingProjectionYear - 1;
  const twoYearsAgo = recentFinancialYear - 2;

  let avgDaysOutstanding = 0;
  let year = twoYearsAgo;

  while (year <= recentFinancialYear) {
    /**
     * Error handling if no data from two years ago
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
      avgDaysOutstanding = avgDaysOutstanding / 3;
    }
    year++;
  }

  return avgDaysOutstanding;
}
