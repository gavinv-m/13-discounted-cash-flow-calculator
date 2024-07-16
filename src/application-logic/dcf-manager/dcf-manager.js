import { revenueAndExpenses } from './projections/revenue-and-expenses-projections';
import { projectionYears } from './projection-years-manager';
import { capexProjectionsManager } from './projections/capex-projections';
import { depreciationAmortisationProjectionsManager } from './projections/depreciation-amortisation-projections';
import { workingCapProjectionsManager } from './projections/working-capital/working-capital-manager';
import { terminalValueManager } from './projections/terminal-value/terminal-value-manager';
import { customInputManager } from '../data-centre/custom-inputs/custom-input-manager';
import { analysisManager } from './analysis/analysis-manager';

class DiscountedCashFlowManager {
  constructor(
    revenueAndExpenses,
    projectionYears,
    capexProjectionsManager,
    depreciationAmortisationProjectionsManager,
    workingCapProjectionsManager,
    terminalValueManager,
    customInputManager,
    analysisManager,
  ) {
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectionYearsManager = projectionYears;
    this.capexProjectionsManager = capexProjectionsManager;
    this.depreciationAmortisationProjectionsManager =
      depreciationAmortisationProjectionsManager;
    this.workingCapProjectionsManager = workingCapProjectionsManager;
    this.terminalValueManager = terminalValueManager;
    this.customInputManager = customInputManager.setDcfManager(this);
    this.analysisManager = analysisManager;
  }

  startProjections() {
    this.projectionYearsManager.calculateProjectionYears();
    this.revenueAndExpenses.projectRevenueAndExpenses();
    this.capexProjectionsManager.calculateCapexProjections();
    this.depreciationAmortisationProjectionsManager.projectDepreciationAmortisation();
    this.workingCapProjectionsManager.projectWorkingCapital();
    this.terminalValueManager.calcuateSharePrice();

    this.performAnalysis();
  }

  performAnalysis() {
    this.analysisManager.startAnalysis();
  }
}

const dcfManager = new DiscountedCashFlowManager(
  revenueAndExpenses,
  projectionYears,
  capexProjectionsManager,
  depreciationAmortisationProjectionsManager,
  workingCapProjectionsManager,
  terminalValueManager,
  customInputManager,
  analysisManager,
);

// Exports to app-manager.js
export { dcfManager };
