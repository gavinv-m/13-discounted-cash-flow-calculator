import displayProjections from './utils/display-dep-amort';

class DepAmortUIManager {
  constructor(displayProjections) {
    this.displayProjections = displayProjections;
  }

  addDepAmortProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.displayProjections());
  }
}

const depAmortUIManager = new DepAmortUIManager(displayProjections);

// Exports to load-requested-content.js
export { depAmortUIManager };
