import { createElement } from '../../../../../utils/element-utils';

// Exports to valuation-content-manager
export default function renderValuationContentBox() {
  const valuationContentContainer = createElement('section', {
    id: 'valuation-content',
  });
  return valuationContentContainer;
}
