import renderCompanyInfoSection from './utils/render-company-info-section';
import renderSearchSection from './utils/render-search-section';
import renderOverviewSection from './utils/render-overview-section';

class CompanyInfoManager {
  constructor(
    renderCompanyInfoSection,
    renderSearchSection,
    renderOverviewSection,
  ) {
    this.renderCompanyInfoSection = renderCompanyInfoSection;
    this.renderSearchSection = renderSearchSection;
    this.renderOverviewSection = renderOverviewSection;
  }

  populateCompanyInfoSection(mainContent) {
    const companyInfoSection = this.renderCompanyInfoSection(mainContent);
    this.renderSearchSection(companyInfoSection);
    this.renderOverviewSection(companyInfoSection);
  }
}

const companyInfoManager = new CompanyInfoManager(
  renderCompanyInfoSection,
  renderSearchSection,
  renderOverviewSection,
);

// Exports to main-section-manager.js
export { companyInfoManager };
