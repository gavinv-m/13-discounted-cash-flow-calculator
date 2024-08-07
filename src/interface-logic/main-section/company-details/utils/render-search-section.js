import {
  appendChildren,
  createElement,
  createInput,
} from '../../../utils/element-utils';
import { overviewDataManager } from '../../../../application-logic/data-centre/refined-data/overview';
import addSearchBoxEventListener from './search-event-listener';

const createSearch = function createSearchBoxErrorContainer() {
  const searchBoxAndError = createElement('div', { id: 'search-box-error' });
  const searchBox = createInput({
    type: 'text',
    id: 'search-box',
    placeholder: 'Search Stock/Company',
  });
  addSearchBoxEventListener(searchBox);
  const errorText = createElement('p', { id: 'error-box' });
  appendChildren(searchBoxAndError, searchBox, errorText);

  return searchBoxAndError;
};

const createDetails = function createCompanyNameSectorContainer() {
  const companyNameSectorContainer = createElement('div', {
    id: 'company-details',
  });

  // Top half of companyNameSectorContainer
  const companyNameAndTickerContainer = createElement('div');

  const tickerSymbol = overviewDataManager.sendData('Symbol').Symbol;
  const tickerContainer = createElement('h1', {
    text: tickerSymbol,
    classList: ['ticker-symbol'],
  });

  const companyName = overviewDataManager.sendData('Name').Name;
  const companyNameContainer = createElement('h1', {
    text: companyName,
    id: 'company-full-name',
  });
  appendChildren(
    companyNameAndTickerContainer,
    tickerContainer,
    companyNameContainer,
  );
  companyNameSectorContainer.appendChild(companyNameAndTickerContainer);

  // Bottom half of companyNameSectorContainer
  const sectorIndustryContainer = createElement('div');

  const sectorName = overviewDataManager.sendData('Sector').Sector;
  const sectorContainer = createElement('h1', {
    text: sectorName,
    id: 'company-sector',
  });

  const industryName = overviewDataManager.sendData('Industry').Industry;
  const industryContainer = createElement('h1', {
    text: industryName,
    id: 'company-industry',
  });
  appendChildren(sectorIndustryContainer, sectorContainer, industryContainer);
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
