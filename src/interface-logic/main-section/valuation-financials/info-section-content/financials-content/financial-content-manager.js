class FinancialContentManager {
  constructor() {}

  addFinancialContent(infoContentContainer) {
    const mockHeading = document.createElement('h1');
    mockHeading.textContent = 'Financial Content';
    infoContentContainer.appendChild(mockHeading);
  }
}

const financialContentManager = new FinancialContentManager();

// Exports to load-requested info in valuation-financials directory
export { financialContentManager };
