import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';
import { capexUIManager } from './capex-projections/capex-ui-manager';
import { depAmortUIManager } from './depreciation-amortisation/dep-amort-ui-manager';

class LoadRequestedContent {
  constructor(revenueAndExpensesUIManager, capexUIManager, depAmortUIManager) {
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
    this.capexUIManager = capexUIManager;
    this.depAmortUIManager = depAmortUIManager;
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
    }
  }
}

const loadRequestedContentManager = new LoadRequestedContent(
  revenueAndExpensesUIManager,
  capexUIManager,
  depAmortUIManager,
);

// Exports to heading-event-listeners.js
export { loadRequestedContentManager };
