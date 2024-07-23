import renderDCFInfoSection from './utils/render-dcf-info-section';
import renderDcfDefinition from './utils/render-dcf-definition';

class DcfInfoManager {
  constructor(renderDCFInfoSection, renderDcfDefinition) {
    this.mainContent = document.getElementById('main-content');
    this.renderDCFInfoSection = renderDCFInfoSection;
    this.renderDcfDefinition = renderDcfDefinition;
  }

  populateDCFInfoSection() {
    const dcfInfoSection = this.renderDCFInfoSection(this.mainContent);
    this.renderDcfDefinition(dcfInfoSection);
  }
}

const dcfInfoManager = new DcfInfoManager(
  renderDCFInfoSection,
  renderDcfDefinition,
);

// Exports to main-section-manager.js
export { dcfInfoManager };
