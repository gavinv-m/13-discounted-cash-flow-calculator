import { projectionYears } from '../projection-years-manager';

const calculatePercentages = function calculateExpenseRevenueRatio(
  expenses,
  priorRevenues,
) {
  const expensePercentageAverages = {};
  const yearSpan = Object.keys(priorRevenues).length;

  let sumOfPercentages = 0;

  for (let expense in expenses) {
    for (let year in expenses[expense]) {
      const expensePercentageOfRevenueForYear =
        expenses[expense][year] / priorRevenues[year];
      sumOfPercentages += expensePercentageOfRevenueForYear;
    }

    const averagePercentage = (sumOfPercentages / yearSpan) * 100;
    expensePercentageAverages[expense] = averagePercentage;

    sumOfPercentages = 0;
  }

  return expensePercentageAverages;
};

// Exports to revenue-and-expense-projections.js
export default function projectExpenses(
  expenses,
  priorRevenues,
  projectedRevenues,
) {
  const expensePercentages = calculatePercentages(expenses, priorRevenues);

  // Calculate projected expenses
  const projectedExpenses = {};

  for (let expense in expensePercentages) {
    projectedExpenses[expense] = {};

    for (let year in projectedRevenues) {
      const projectedExpenseAmount =
        projectedRevenues[year] * (expensePercentages[expense] / 100);
      projectedExpenses[expense][year] = projectedExpenseAmount;
    }
  }

  return { expensePercentages, projectedExpenses };
}
