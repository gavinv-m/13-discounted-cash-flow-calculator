import { revenueAndExpenses } from './projections/revenue-and-expenses-projections';
import { projectionYears } from './projection-years-manager';
import { capexProjectionsManager } from './projections/capex-projections';
import { depreciationAmortisationProjectionsManager } from './projections/depreciation-amortisation-projections';

class DiscountedCashFlowManager {
  constructor(
    revenueAndExpenses,
    projectionYears,
    capexProjectionsManager,
    depreciationAmortisationProjectionsManager,
  ) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectionYearsManager = projectionYears;
    this.capexProjectionsManager = capexProjectionsManager;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
  }

  startProjections() {
    this.projectionYearsManager.calculateProjectionYears();
    this.revenueAndExpenses.projectRevenueAndExpenses();
    this.capexProjectionsManager.calculateCapexProjections();
    this.depreciationAmortisationProjectionsManager.projectDepreciationAmortisation();
  }
}

const dcfManager = new DiscountedCashFlowManager(
  revenueAndExpenses,
  projectionYears,
  capexProjectionsManager,
  depreciationAmortisationProjectionsManager,
);

// Exports to app-manager.js
export { dcfManager };
