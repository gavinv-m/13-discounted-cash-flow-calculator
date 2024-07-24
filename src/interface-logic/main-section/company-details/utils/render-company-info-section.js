import { createElement } from '../../../utils/element-utils';

// Exports to company-info.js
export default function renderCompanyInfoSection(mainContent) {
  const companyInfoSection = createElement('section', {
    id: 'company-info-section',
  });
  mainContent.appendChild(companyInfoSection);
  return companyInfoSection;
}
