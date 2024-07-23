import { createElement } from '../../../utils/element-utils';

// Exports to company-info.js
export default function renderCompanyInfoSection(mainContent) {
  const companyInfoSection = createElement('div', {
    id: 'company-info-section',
  });
  mainContent.appendChild(companyInfoSection);
  return companyInfoSection;
}
