import { appendChildren, createElement } from '../../../utils/element-utils';

// Exports to valuation-financials.js
export default function renderValuationFinancialsHeadings(valFinSection) {
  const headingsContainer = createElement('div', { id: 'val-fin-headings' });

  const valuationHeading = createElement('h1', {
    text: 'Valuation',
    id: 'valuation-heading',
  });
  const financialsHeading = createElement('h1', {
    text: 'Financials',
    id: 'financials-heading',
  });

  appendChildren(headingsContainer, valuationHeading, financialsHeading);

  valFinSection.appendChild(headingsContainer);

  return;
}
