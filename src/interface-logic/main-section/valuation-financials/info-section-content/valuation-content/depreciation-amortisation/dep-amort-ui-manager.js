class DepAmortUIManager {
  constructor() {}

  addDepAmortProjections(valuationContentBox) {
    const mockDepAmort = document.createElement('h1');
    mockDepAmort.textContent = 'Depreciation and Amortisation Projections';
    valuationContentBox.appendChild(mockDepAmort);
  }
}

const depAmortUIManager = new DepAmortUIManager();

// Exports to load-requested-content.js
export { depAmortUIManager };
