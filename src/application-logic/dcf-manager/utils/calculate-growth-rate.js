import { projectionYears } from '../projection-years-manager';
import { waccManager } from '../projections/terminal-value/wacc-manager';

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
  const riskFreeRate = waccManager.marketRates.riskFreeRate;
  let growthRate = retentionRatio * returnOnEquity;

  // Limit growth rate to 10 year treasury bond yield
  if (growthRate > riskFreeRate) {
    return riskFreeRate;
  }

  return growthRate;
}
