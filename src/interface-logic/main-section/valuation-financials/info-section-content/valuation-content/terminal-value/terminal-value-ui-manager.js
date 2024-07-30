import displayProjections from './utils/display-terminal-value';

class TerminalValueUIManager {
  constructor(displayProjections) {
    this.displayProjections = displayProjections;
  }

  addTerminalValueProjections(valuationContentBox) {
    valuationContentBox.appendChild(this.displayProjections());
  }
}

const terminalValueUIManager = new TerminalValueUIManager(displayProjections);

// Exports to load-requested-content.js
export { terminalValueUIManager };
