import { projectionVisibilityChecker } from './check-active-projection';
import { loadRequestedContentManager } from '../load-requested-content';

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

      // Reassign active-projection class
      document
        .querySelector('.active-projection')
        .classList.remove('active-projection');
      headingElement.classList.add('active-projection');

      loadRequestedContentManager.loadContent(
        projectionHeadingText,
        valuationContentBox,
      );
    });
  });
}
