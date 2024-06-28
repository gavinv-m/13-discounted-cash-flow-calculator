import { revenueAndExpenses } from './projections/revenue-and-expenses-projections';

class DiscountedCashFlowManager {
  startingProjectionYear = null;
  endingProjectionYear = null;

  constructor(revenueAndExpenses) {
    this.revenueAndExpenses = revenueAndExpenses;
  }

  startProjections() {
    this.revenueAndExpenses.projectRevenueAndExpenses();
  }

  // TODO: Determine start and end years
}

const dcfManager = new DiscountedCashFlowManager(revenueAndExpenses);

// Exports to app-manager.js
export { dcfManager };
