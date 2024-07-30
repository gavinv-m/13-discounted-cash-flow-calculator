import rendervalFinSection from './utils/render-valuation-financials-section';
import renderValFinHeadings from './utils/render-headings';
import renderValFinInfoSection from './utils/render-val-fin-info-section';
import { valuationContentManager } from './info-section-content/valuation-content/valuation-content-manager';
import addHeadingsEventListeners from './utils/heading-event-listeners';

class ValuationFinancialsManager {
  constructor(
    rendervalFinSection,
    renderValFinHeadings,
    renderValFinInfoSection,
    valuationContentManager,
    addHeadingsEventListeners,
  ) {
    this.rendervalFinSection = rendervalFinSection;
    this.renderValFinHeadings = renderValFinHeadings;
    this.renderValFinInfoSection = renderValFinInfoSection;
    this.valuationContentManager = valuationContentManager;
    this.addHeadingsEventListeners = addHeadingsEventListeners;
  }

  populateValuationFinancialsSection(mainContent) {
    const valFinSection = this.rendervalFinSection(mainContent);
    this.renderValFinHeadings(valFinSection);
    const infoContentContainer = this.renderValFinInfoSection(valFinSection);

    // Add valuation content on load
    this.valuationContentManager.addValuationContent(infoContentContainer);

    // Add event listeners to headings: Valuationn & Financials
    const headings = document.querySelectorAll('.val-fin-heading');
    this.addHeadingsEventListeners(headings, infoContentContainer);
  }
}

const valuationFinancialsManager = new ValuationFinancialsManager(
  rendervalFinSection,
  renderValFinHeadings,
  renderValFinInfoSection,
  valuationContentManager,
  addHeadingsEventListeners,
);

// Exports to main-section-manager.js
export { valuationFinancialsManager };
