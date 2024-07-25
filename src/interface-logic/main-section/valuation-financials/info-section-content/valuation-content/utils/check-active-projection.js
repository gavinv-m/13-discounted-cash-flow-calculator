class ProjectionVisibilityChecker {
  activeProjection = 'Revenue & Expenses'; // Default on load

  constructor() {}

  checkActiveProjection(projectionHeadingText) {
    const currentlyActive = projectionHeadingText === this.activeProjection;

    if (currentlyActive === true) {
      return true;
    }

    this.activeProjection = projectionHeadingText;
  }
}

const projectionVisibilityChecker = new ProjectionVisibilityChecker();

// Exports to heading-event-listeners.js
export { projectionVisibilityChecker };
