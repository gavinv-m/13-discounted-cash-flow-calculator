import { revenueAndExpenses } from './projections/revenue-and-expenses-projections';
import { projectionYears } from './projection-years-manager';

class DiscountedCashFlowManager {
  constructor(revenueAndExpenses, projectionYears) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectionYearsManager = projectionYears;
  }

  startProjections() {
    this.projectionYearsManager.calculateProjectionYears();
    this.revenueAndExpenses.projectRevenueAndExpenses();
  }
}

const dcfManager = new DiscountedCashFlowManager(
  revenueAndExpenses,
  projectionYears,
);

// Exports to app-manager.js
export { dcfManager };
