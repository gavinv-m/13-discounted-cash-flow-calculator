import { revenueAndExpensesUIManager } from './rev-and-exp-projections/rev-and-exp-manager';
import { capexUIManager } from './capex-projections/capex-ui-manager';
import { depAmortUIManager } from './depreciation-amortisation/dep-amort-ui-manager';
import { workingCapUIManager } from './working-capital/working-cap-ui-manager';
import { terminalValueUIManager } from './terminal-value/terminal-value-ui-manager';
import clearValuationContent from './utils/clear-valuation-content';

class LoadRequestedContent {
  constructor(
    revenueAndExpensesUIManager,
    capexUIManager,
    depAmortUIManager,
    workingCapUIManager,
    terminalValueUIManager,
    clearValuationContent,
  ) {
    this.revenueAndExpensesUIManager = revenueAndExpensesUIManager;
    this.capexUIManager = capexUIManager;
    this.depAmortUIManager = depAmortUIManager;
    this.workingCapUIManager = workingCapUIManager;
    this.terminalValueUIManager = terminalValueUIManager;
    this.clearValuationContent = clearValuationContent;
  }

  loadContent(projectionHeadingText, valuationContentBox) {
    // Clear valuation content box
    this.clearValuationContent(valuationContentBox);

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
    } else if (projectionHeadingText === 'Terminal Value') {
      this.terminalValueUIManager.addTerminalValueProjections(
        valuationContentBox,
      );
    }
  }
}

const loadRequestedContentManager = new LoadRequestedContent(
  revenueAndExpensesUIManager,
  capexUIManager,
  depAmortUIManager,
  workingCapUIManager,
  terminalValueUIManager,
  clearValuationContent,
);

// Exports to heading-event-listeners.js for valuation projection headings & update-interface.js
export { loadRequestedContentManager };
