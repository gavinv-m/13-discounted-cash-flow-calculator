class WorkingCapitalUIManager {
  constructor() {}

  addWorkingCapProjections(valuationContentBox) {
    const mockWorkingCap = document.createElement('h1');
    mockWorkingCap.textContent = 'Working Capital Projections';
    valuationContentBox.appendChild(mockWorkingCap);
  }
}

const workingCapUIManager = new WorkingCapitalUIManager();

// Exports to load-requested-content.js
export { workingCapUIManager };
