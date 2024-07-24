import rendervalFinSection from './utils/render-valuation-financials-section';
import renderValFinHeadings from './utils/render-headings';
import renderValFinInfoSection from './utils/render-val-fin-info-section';
import { valuationContentManager } from './info-section-content/valuation-content/valuation-content-manager';
import addValuationHeadingListener from './utils/valuation-heading-listener';
import addFinancialsClickListener from './utils/financials-heading-listener';

class ValuationFinancialsManager {
  constructor(
    rendervalFinSection,
    renderValFinHeadings,
    renderValFinInfoSection,
    valuationContentManager,
    addValuationHeadingListener,
    addFinancialsClickListener,
  ) {
    this.rendervalFinSection = rendervalFinSection;
    this.renderValFinHeadings = renderValFinHeadings;
    this.renderValFinInfoSection = renderValFinInfoSection;
    this.valuationContentManager = valuationContentManager;
    this.addValuationHeadingListener = addValuationHeadingListener;
    this.addFinancialsClickListener = addFinancialsClickListener;
  }

  populateValuationFinancialsSection(mainContent) {
    const valFinSection = this.rendervalFinSection(mainContent);
    this.renderValFinHeadings(valFinSection);
    const infoContentContainer = this.renderValFinInfoSection(valFinSection);

    // Add valuation content on load
    this.valuationContentManager.addValuationContent(infoContentContainer);

    /**
     * Attach event listeners on headings: Valuation and Financials
     * Can only be done after infoContentContainer has been created
     */
    const valuationHeading = document.getElementById('valuation-heading');
    this.addValuationHeadingListener(valuationHeading, infoContentContainer);

    const financialsHeading = document.getElementById('financials-heading');
    this.addFinancialsClickListener(financialsHeading, infoContentContainer);
  }
}

const valuationFinancialsManager = new ValuationFinancialsManager(
  rendervalFinSection,
  renderValFinHeadings,
  renderValFinInfoSection,
  valuationContentManager,
  addValuationHeadingListener,
  addFinancialsClickListener,
);

// Exports to main-section-manager.js
export { valuationFinancialsManager };
