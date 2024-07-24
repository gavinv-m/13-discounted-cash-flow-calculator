import {
  appendChildren,
  createElement,
  createInput,
} from '../../../utils/element-utils';

const createSearch = function createSearchBoxErrorContainer() {
  const searchBoxAndError = createElement('div', { id: 'search-box-error' });
  const searchBox = createInput({
    type: 'text',
    id: 'search-box',
    placeholder: 'Search Stock/Company',
  });
  const errorText = createElement('p', { id: 'error-box' });
  appendChildren(searchBoxAndError, searchBox, errorText);

  return searchBoxAndError;
};

const createDetails = function createCompanyNameSectorContainer() {
  const companyNameSectorContainer = createElement('div', {
    id: 'company-details',
  });

  const companyNameAndTickerContainer = createElement('div'); // Top half of companyNameSectorContainer
  const ticker = createElement('h1', { classList: ['ticker-symbol'] });
  const companyName = createElement('h1', { id: 'company-full-name' });
  appendChildren(companyNameAndTickerContainer, ticker, companyName);
  companyNameSectorContainer.appendChild(companyNameAndTickerContainer);

  const sectorIndustryContainer = createElement('div'); // Bottom half of companyNameSectorContainer
  const sector = createElement('h1', { id: 'company-sector' });
  const industry = createElement('h1', { id: 'company-industry' });
  appendChildren(sectorIndustryContainer, sector, industry);
  companyNameSectorContainer.appendChild(sectorIndustryContainer);

  return companyNameSectorContainer;
};

// Exports to company-info.js
export default function renderSearchSection(companyInfoSection) {
  const mainContainer = createElement('div', { id: 'search-section' });

  const searchBoxAndError = createSearch();
  const companyNameSectorContainer = createDetails();

  // Append to main container
  appendChildren(mainContainer, searchBoxAndError, companyNameSectorContainer);

  // Append to company info section
  companyInfoSection.appendChild(mainContainer);

  return;
}
