import { contentVisibilityChecker } from '../info-section-content/content-visibility-checker';
import { valuationContentManager } from '../info-section-content/valuation-content/valuation-content-manager';
import clearInfoSection from '../info-section-content/clear-section';

// Exports to valuation-financials.js
export default function addValuationClickListener(
  valuationHeading,
  infoContentContainer,
) {
  valuationHeading.addEventListener('click', () => {
    const status = contentVisibilityChecker.checkValuationContentVisibility();

    if (status === true) {
      return;
    }

    // Enable valuation content visibility
    contentVisibilityChecker.updateValuationContentVisibility();
    clearInfoSection();
    valuationContentManager.addValuationContent(infoContentContainer);
    return;
  });
}
