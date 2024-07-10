import { projectionYears } from '../projection-years-manager';

// Exports to fcf-manager.js
export default function discountCashFlows(freeCashFlows, wacc) {
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  const presentValueCashFlows = {};

  for (let year in freeCashFlows) {
    const yearGap = year - priorFinYear;
    presentValueCashFlows[year] = freeCashFlows[year] / (1 + wacc) ** yearGap;
  }

  return presentValueCashFlows;
}
