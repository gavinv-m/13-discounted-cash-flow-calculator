import { projectionYears } from '../projection-years-manager';

// Exports to growth-rate-manager.js
export default function calculateExpectedGrowthRate(
  netIncome,
  dividends,
  returnOnEquity,
) {
  const priorYear = projectionYears.startingProjectionYear - 1;
  const netIncomeAmt = netIncome[priorYear];
  const dividendsAmt = dividends[priorYear];
  const retentionRatio = 1 - dividendsAmt / netIncomeAmt;
  const growthRate = retentionRatio * returnOnEquity;

  return growthRate;
}
