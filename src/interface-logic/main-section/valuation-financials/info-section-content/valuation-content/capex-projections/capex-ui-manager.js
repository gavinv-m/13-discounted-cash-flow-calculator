class CAPEXUIManager {
  constructor() {}

  addCapexProjections(valuationContentBox) {
    const mockCAPEX = document.createElement('h1');
    mockCAPEX.textContent = 'CAPEX Projections';
    valuationContentBox.appendChild(mockCAPEX);
  }
}

const capexUIManager = new CAPEXUIManager();

// Exports to load-requested-content.js
export { capexUIManager };
