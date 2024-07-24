import { createElement } from '../../../utils/element-utils';

// Exports to valuation-financials.js
export default function renderValuationFinancialsInfoSection(valFinSection) {
  const infoContainer = createElement('section', { id: 'val-fin-info' });
  valFinSection.appendChild(infoContainer);
  return;
}
