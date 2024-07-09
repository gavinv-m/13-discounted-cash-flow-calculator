import { projectionYears } from '../projection-years-manager';

// Exports to wacc-manager.js
export default function calculateWeightedCapital(
  debt,
  equityValue,
  costOfDebt,
  costOfEquity,
  taxRate,
) {
  const priorYear = projectionYears.startingProjectionYear - 1;
  const debtValue = debt[priorYear];
  const firmValue = debtValue + equityValue;
  const afterTax = 1 - taxRate;

  const wacc =
    (equityValue / firmValue) * costOfEquity +
    (debtValue / firmValue) * costOfDebt * afterTax;

  return wacc;
}
