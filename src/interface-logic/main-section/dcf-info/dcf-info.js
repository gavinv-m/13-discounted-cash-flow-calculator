import renderDCFInfoSection from './utils/render-dcf-info-section';
import renderDcfDefinition from './utils/render-dcf-definition';
import renderDcfExplanation from './utils/render-dcf-explanation';

class DcfInfoManager {
  constructor(renderDCFInfoSection, renderDcfDefinition, renderDcfExplanation) {
    this.mainContent = document.getElementById('main-content');
    this.renderDCFInfoSection = renderDCFInfoSection;
    this.renderDcfDefinition = renderDcfDefinition;
    this.renderDcfExplanation = renderDcfExplanation;
  }

  populateDCFInfoSection() {
    const dcfInfoSection = this.renderDCFInfoSection(this.mainContent);
    this.renderDcfDefinition(dcfInfoSection);
    this.renderDcfExplanation(dcfInfoSection);
  }
}

const dcfInfoManager = new DcfInfoManager(
  renderDCFInfoSection,
  renderDcfDefinition,
  renderDcfExplanation,
);

// Exports to main-section-manager.js
export { dcfInfoManager };
