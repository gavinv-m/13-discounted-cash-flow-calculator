import { createElement } from '../../../utils/element-utils';

// Exports to fin-overview-boxes
export default function formatAndDisplayMarketCap(
  marketCapContainer,
  marketCap,
) {
  marketCap = Number(marketCap);
  let scaleLetter = '';

  if (marketCap >= 1e12) {
    marketCap = marketCap / 1e12;
    scaleLetter = 'T';
  } else if (marketCap >= 1e9 && marketCap < 1e12) {
    marketCap = marketCap / 1e9;
    scaleLetter = 'B';
  } else if (marketCap >= 1e6 && marketCap < 1e9) {
    marketCap = marketCap / 1e6;
    scaleLetter = 'M';
  } else if (marketCap >= 1e5 && marketCap < 1e6) {
    marketCap = marketCap / 1e5;
    scaleLetter = 'K';
  }

  marketCap = Math.round(marketCap);

  marketCapContainer.appendChild(createElement('h3', { text: marketCap }));
  marketCapContainer.appendChild(createElement('h4', { text: scaleLetter }));
}
