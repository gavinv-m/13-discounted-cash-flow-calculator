import { revenueAndExpenses } from './projections/revenue-and-expenses-projections';
import { projectionYears } from './projection-years-manager';
import { capexProjectionsManager } from './projections/capex-projections';
import { depreciationAmortisationProjectionsManager } from './projections/depreciation-amortisation-projections';
import { workingCapProjectionsManager } from './projections/working-capital/working-capital-manager';

class DiscountedCashFlowManager {
  constructor(
    revenueAndExpenses,
    projectionYears,
    capexProjectionsManager,
    depreciationAmortisationProjectionsManager,
    workingCapProjectionsManager,
  ) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectionYearsManager = projectionYears;
    this.capexProjectionsManager = capexProjectionsManager;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
    this.workingCapProjectionsManager = workingCapProjectionsManager;
  }

  startProjections() {
    this.projectionYearsManager.calculateProjectionYears();
    this.revenueAndExpenses.projectRevenueAndExpenses();
    this.capexProjectionsManager.calculateCapexProjections();
    this.depreciationAmortisationProjectionsManager.projectDepreciationAmortisation();
    this.workingCapProjectionsManager.projectWorkingCapital();
  }
}

const dcfManager = new DiscountedCashFlowManager(
  revenueAndExpenses,
  projectionYears,
  capexProjectionsManager,
  depreciationAmortisationProjectionsManager,
  workingCapProjectionsManager,
);

// Exports to app-manager.js
export { dcfManager };
