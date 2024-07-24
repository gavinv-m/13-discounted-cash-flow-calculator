class ContentVisibilityChecker {
  valuationContentVisible = true;
  financialsContentVisible = false;

  constructor() {}

  checkValuationContentVisibility() {
    return this.valuationContentVisible;
  }

  updateValuationContentVisibility() {
    this.valuationContentVisible = true;
    this.financialsContentVisible = false;
  }

  checkFinancialsContentVisibility() {
    return this.financialsContentVisible;
  }

  updateFinancialsContentVisibility() {
    this.valuationContentVisible = false;
    this.financialsContentVisible = true;
  }
}

const contentVisibilityChecker = new ContentVisibilityChecker();

// Exports to valuation-heading-listener and financials-heading-listener
export { contentVisibilityChecker };
