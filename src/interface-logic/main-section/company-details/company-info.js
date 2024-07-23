import renderCompanyInfoSection from './utils/render-company-info-section';
import renderSearchSection from './utils/render-search-section';

class CompanyInfoManager {
  constructor(renderCompanyInfoSection, renderSearchSection) {
    this.renderCompanyInfoSection = renderCompanyInfoSection;
    this.renderSearchSection = renderSearchSection;
  }

  populateCompanyInfoSection(mainContent) {
    const companyInfoSection = this.renderCompanyInfoSection(mainContent);
    this.renderSearchSection(companyInfoSection);
  }
}

const companyInfoManager = new CompanyInfoManager(
  renderCompanyInfoSection,
  renderSearchSection,
);

// Exports to main-section-manager.js
export { companyInfoManager };
