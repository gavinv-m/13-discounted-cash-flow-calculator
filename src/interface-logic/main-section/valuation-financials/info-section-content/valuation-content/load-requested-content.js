import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';
import { capexUIManager } from './capex-projections/capex-ui-manager';
import { depAmortUIManager } from './depreciation-amortisation/dep-amort-ui-manager';
import { workingCapUIManager } from './working-capital/working-cap-ui-manager';

class LoadRequestedContent {
  constructor(
    revenueAndExpensesUIManager,
    capexUIManager,
    depAmortUIManager,
    workingCapUIManager,
  ) {
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
    this.capexUIManager = capexUIManager;
    this.depAmortUIManager = depAmortUIManager;
    this.workingCapUIManager = workingCapUIManager;
  }

  loadContent(projectionHeadingText, valuationContentBox) {
    if (projectionHeadingText === 'Revenue & Expenses') {
      this.revenueAndExpensesUIManager.addRevenueAndExpensesProjections(
        valuationContentBox,
      );
    } else if (projectionHeadingText === 'CAPEX') {
      this.capexUIManager.addCapexProjections(valuationContentBox);
    } else if (projectionHeadingText === 'Depreciation & Amortisation') {
      this.depAmortUIManager.addDepAmortProjections(valuationContentBox);
    } else if (projectionHeadingText === 'Working Capital') {
      this.workingCapUIManager.addWorkingCapProjections(valuationContentBox);
    }
  }
}

const loadRequestedContentManager = new LoadRequestedContent(
  revenueAndExpensesUIManager,
  capexUIManager,
  depAmortUIManager,
  workingCapUIManager,
);

// Exports to heading-event-listeners.js
export { loadRequestedContentManager };
