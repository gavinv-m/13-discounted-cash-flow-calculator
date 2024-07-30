class InfoVisibilityChecker {
  activeHeading = 'Valuation'; // Default on load

  constructor() {}

  checkActiveHeading(headingText) {
    const currentlyActive = headingText === this.activeHeading;

    if (currentlyActive === true) {
      return true;
    }

    this.activeHeading = headingText;
  }
}

const infoVisibilityChecker = new InfoVisibilityChecker();

// Exports to ./heading-event-listeners.js
export { infoVisibilityChecker };
