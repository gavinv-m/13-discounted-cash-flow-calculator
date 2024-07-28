import displayProjections from './utils/display-working-cap';

class WorkingCapitalUIManager {
  constructor(displayProjections) {
    this.displayProjections = displayProjections;
  }

  addWorkingCapProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.displayProjections());
  }
}

const workingCapUIManager = new WorkingCapitalUIManager(displayProjections);

// Exports to load-requested-content.js
export { workingCapUIManager };
