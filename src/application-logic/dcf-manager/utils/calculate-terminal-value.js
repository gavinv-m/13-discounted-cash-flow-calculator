import { projectionYears } from '../projection-years-manager';

// Exports to terminal-value-calculator.js
export default function computeTerminalValue(freeCashFlows, wacc, growthRate) {
  const endingProjectionYear = projectionYears.endingProjectionYear;
  const endingFreeCashFlow = freeCashFlows[endingProjectionYear];
  const terminalValue =
    (endingFreeCashFlow * (1 + growthRate)) / (wacc - growthRate);

  return terminalValue;
}
