import { revenueAndExpenses } from './projections/revenue-and-expenses-projections';
import { projectionYears } from './projection-years-manager';
import { capexProjectionsManager } from './projections/capex-projections';

class DiscountedCashFlowManager {
  constructor(revenueAndExpenses, projectionYears, capexProjectionsManager) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectionYearsManager = projectionYears;
    this.capexProjectionsManager = capexProjectionsManager;
  }

  startProjections() {
    this.projectionYearsManager.calculateProjectionYears();
    this.revenueAndExpenses.projectRevenueAndExpenses();
    this.capexProjectionsManager.calculateCapexProjections();
  }
}

const dcfManager = new DiscountedCashFlowManager(
  revenueAndExpenses,
  projectionYears,
  capexProjectionsManager,
);

// Exports to app-manager.js
export { dcfManager };
