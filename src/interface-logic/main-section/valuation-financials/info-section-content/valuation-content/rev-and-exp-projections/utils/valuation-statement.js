import { createElement } from '../../../../../../utils/element-utils';
import { analysisManager } from '../../../../../../../application-logic/dcf-manager/analysis/analysis-manager';
import { overviewDataManager } from '../../../../../../../application-logic/data-centre/refined-data/overview';
import { timeSeriesDataManager } from '../../../../../../../application-logic/data-centre/refined-data/time-series';
import { valuationManager } from '../../../../../../../application-logic/dcf-manager/projections/terminal-value/valuation-manager';

// FIXME: In wrong direcory
// Exports to valuation-content-manager
export default function createValuationStatement() {
  const tickerSymbol = overviewDataManager.sendData('Symbol').Symbol;
  const recentClosingPrice =
    timeSeriesDataManager.sendData('recentClosingPrice').recentClosingPrice;
  const dcfValue = valuationManager.sendData('fairPrice').fairPrice.toFixed(2);
  const percentage = analysisManager.sendData('underOver').underOver * 100;
  let percentageForAnalysis =
    percentage > 0 ? percentage : percentage < 0 ? percentage * -1 : percentage;
  percentageForAnalysis = Math.round(percentageForAnalysis);

  let valuationStatus;
  if (percentage > 0) {
    valuationStatus = `<span id="under">undervalued</span> by ${percentageForAnalysis}%`;
  } else if (percentage < 0) {
    valuationStatus = `<span id="over">overvalued</span> by ${percentageForAnalysis}%`;
  } else {
    valuationStatus = 'correctly valued';
  }

  const text = `
    Estimated DCF value of one ${tickerSymbol} stock is ${dcfValue} <span class="currency">USD</span>. 
    Compared to the current price of ${recentClosingPrice}  <span class="currency">USD</span>, the stock is ${valuationStatus}.
  `;

  return createElement('p', { innerHTML: text, id: 'valuation-status' });
}
