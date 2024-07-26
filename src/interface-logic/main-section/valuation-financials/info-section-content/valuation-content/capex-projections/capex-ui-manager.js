import displayProjections from './utils/display-capex-projections';

class CAPEXUIManager {
  constructor(displayProjections) {
    this.displayProjections = displayProjections;
  }

  addCapexProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.displayProjections());
  }
}

const capexUIManager = new CAPEXUIManager(displayProjections);

// Exports to load-requested-content.js
export { capexUIManager };
