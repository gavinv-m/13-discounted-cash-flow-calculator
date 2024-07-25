class TerminalValueUIManager {
  constructor() {}

  addTerminalValueProjections(valuationContentBox) {
    const mockTerminalValue = document.createElement('h1');
    mockTerminalValue.textContent = 'Terminal Value Projections';
    valuationContentBox.appendChild(mockTerminalValue);
  }
}

const terminalValueUIManager = new TerminalValueUIManager();

// Exports to load-requested-content.js
export { terminalValueUIManager };
