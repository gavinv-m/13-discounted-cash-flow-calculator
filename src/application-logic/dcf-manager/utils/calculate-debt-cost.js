import { projectionYears } from '../projection-years-manager';

// Exports to wacc-manager.js
export default function calculateDebtCost(debt, interestExpense) {
  const priorYear = projectionYears.startingProjectionYear - 1;
  const debtAmount = debt[priorYear];
  const interestExpenseAmount = interestExpense[priorYear];

  return interestExpenseAmount / debtAmount;
}
