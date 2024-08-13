import { appendChildren, createElement } from '../../../utils/element-utils';
import { overviewDataManager } from '../../../../application-logic/data-centre/refined-data/overview';
import {
  createMarketCapContainer,
  createPriceContainer,
  createPeRatioContainer,
  createRoeContainer,
  createDividendYieldContainer,
} from './fin-overview-boxes';

const overviewFinancials = function createOverviewFinancials() {
  const overviewFinancials = createElement('div', {
    id: 'overview-finacials',
  });
  const overviewFinancialsTopRow = createElement('div', {
    id: 'overview-top-row',
  });
  const overviewFinancialsBottomRow = createElement('div', {
    id: 'overview-bot-row',
  });

  const marketCapContainer = createMarketCapContainer();
  const priceContainer = createPriceContainer();
  const peRatioContainer = createPeRatioContainer();

  // Append market cap, price and pe to top row
  appendChildren(
    overviewFinancialsTopRow,
    marketCapContainer,
    priceContainer,
    peRatioContainer,
  );

  const roeContainer = createRoeContainer();
  const dividendYieldContainer = createDividendYieldContainer();

  // Append roe and dividend yield to bottom row
  appendChildren(
    overviewFinancialsBottomRow,
    roeContainer,
    dividendYieldContainer,
  );

  // Append top and bottom row to overviewFinancials
  appendChildren(
    overviewFinancials,
    overviewFinancialsTopRow,
    overviewFinancialsBottomRow,
  );

  return overviewFinancials;
};

// Export to company-info.js
export default function renderOverviewSection(companyInfoSection) {
  const mainContainer = createElement('div', { id: 'overview-section' });

  const overviewText = overviewDataManager.sendData('Description').Description;
  const overviewTextParagraph = createElement('p', {
    text: overviewText,
    id: 'overview-description',
  });

  const financials = overviewFinancials();
  appendChildren(mainContainer, overviewTextParagraph, financials);
  companyInfoSection.appendChild(mainContainer);

  return;
}
