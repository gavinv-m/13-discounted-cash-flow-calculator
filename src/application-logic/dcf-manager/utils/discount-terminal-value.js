import { projectionYears } from '../projection-years-manager';

// Export to terminal-value-calculator.js
export default function calculatePresentTerminalValue(terminalValue, wacc) {
  const priorFinYear = projectionYears.startingProjectionYear - 1;
  const endingProjectionYear = projectionYears.endingProjectionYear;
  const yearGap = endingProjectionYear - priorFinYear;
  const discountFactor = 1 / (1 + wacc) ** yearGap;
  const presentTerminalValue = terminalValue * discountFactor;

  return presentTerminalValue;
}
