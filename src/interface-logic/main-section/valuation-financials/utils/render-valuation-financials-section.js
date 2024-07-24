import { createElement } from '../../../utils/element-utils';

// Exports to valuation-financials.js
export default function renderValuationFinancialsSection(mainContent) {
  const valFinSection = createElement('section', { id: 'val-fin-section' });
  mainContent.appendChild(valFinSection);
  return valFinSection;
}
