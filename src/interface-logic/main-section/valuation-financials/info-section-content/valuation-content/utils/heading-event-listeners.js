import { projectionVisibilityChecker } from './check-active-projection';
import { loadRequestedContentManager } from '../load-requested-content';
import clearValuationContent from './clear-valuation-content';

// Exports to valuation-content-manager.js
export default function addHeadingsEventListeners(
  projectionHeadings,
  valuationContentBox,
) {
  projectionHeadings.forEach((headingElement) => {
    headingElement.addEventListener('click', () => {
      const projectionHeadingText = headingElement.textContent;
      const currentlyActive = projectionVisibilityChecker.checkActiveProjection(
        projectionHeadingText,
      );

      if (currentlyActive === true) {
        return;
      }

      // Clear valuation content information
      clearValuationContent(valuationContentBox);

      loadRequestedContentManager.loadContent(
        projectionHeadingText,
        valuationContentBox,
      );
    });
  });
}
