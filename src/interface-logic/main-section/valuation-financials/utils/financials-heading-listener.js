import { contentVisibilityChecker } from '../info-section-content/content-visibility-checker';
import clearInfoSection from '../info-section-content/clear-section';
import { financialsContentManager } from '../info-section-content/financials-content/financials-content-manager';

// Exports to valuation-financials.js
export default function addFinancialsClickListener(
  financialsHeading,
  infoContentContainer,
) {
  financialsHeading.addEventListener('click', () => {
    const status = contentVisibilityChecker.checkFinancialsContentVisibility();

    if (status === true) {
      return;
    }

    // Enable financial content
    contentVisibilityChecker.updateFinancialsContentVisibility();
    clearInfoSection();
    financialsContentManager.addFinancialsContent(infoContentContainer);
  });
}
