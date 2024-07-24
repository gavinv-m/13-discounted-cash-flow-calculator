import { createElement } from '../../../utils/element-utils';
import formatAndDisplayMarketCap from './format-market-cap';
import { timeSeriesDataManager } from '../../../../application-logic/data-centre/refined-data/time-series';
import { overviewDataManager } from '../../../../application-logic/data-centre/refined-data/overview';

// All below export to render-overview-section
export function createMarketCapContainer() {
  const marketCapContainer = createElement('div');
  marketCapContainer.appendChild(createElement('h3', { text: 'Market Cap' }));
  const marketCap = overviewDataManager.sendData(
    'MarketCapitalization',
  ).MarketCapitalization;
  formatAndDisplayMarketCap(marketCapContainer, marketCap);

  return marketCapContainer;
}

export function createPriceContainer() {
  const priceContainer = createElement('div');
  priceContainer.appendChild(createElement('h3', { text: 'Price' }));
  const recentPrice =
    timeSeriesDataManager.sendData('recentClosingPrice').recentClosingPrice;
  priceContainer.appendChild(createElement('h3', { text: recentPrice }));
  priceContainer.appendChild(createElement('h4', { text: 'USD' }));

  return priceContainer;
}

export function createPeRatioContainer() {
  const peRatioContainer = createElement('div');
  peRatioContainer.appendChild(createElement('h3', { text: 'PE Ratio' }));
  const peRatioAmt = overviewDataManager.sendData('PERatio').PERatio;
  peRatioContainer.appendChild(createElement('h4', { text: peRatioAmt }));

  return peRatioContainer;
}

export function createRoeContainer() {
  const roeContainer = createElement('div');
  roeContainer.appendChild(createElement('h3', { text: 'ROE' }));
  const roeAmt =
    overviewDataManager.sendData('ReturnOnEquityTTM').ReturnOnEquityTTM;
  roeContainer.appendChild(createElement('h4', { text: roeAmt }));

  return roeContainer;
}

export function createDividendYieldContainer() {
  const dividendYieldContainer = createElement('div');
  dividendYieldContainer.appendChild(
    createElement('h3', { text: 'Dividend Yield' }),
  );
  let dividendYieldPercent =
    overviewDataManager.sendData('DividendYield').DividendYield;
  dividendYieldPercent = Number(dividendYieldPercent) * 100;
  dividendYieldContainer.appendChild(
    createElement('h3', { text: dividendYieldPercent }),
  );
  dividendYieldContainer.appendChild(
    createElement('h4', { innerHTML: '&#65130;' }),
  );

  return dividendYieldContainer;
}
