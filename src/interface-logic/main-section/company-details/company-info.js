import renderCompanyInfoSection from './utils/render-company-info-section';

class CompanyInfoManager {
  constructor(renderCompanyInfoSection) {
    this.renderCompanyInfoSection = renderCompanyInfoSection;
  }

  populateCompanyInfoSection(mainContent) {
    const companyInfoSection = this.renderCompanyInfoSection(mainContent);
  }
}

const companyInfoManager = new CompanyInfoManager(renderCompanyInfoSection);

// Exports to main-section-manager.js
export { companyInfoManager };
