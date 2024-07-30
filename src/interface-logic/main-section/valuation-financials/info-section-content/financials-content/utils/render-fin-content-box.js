import { createElement } from '../../../../../utils/element-utils';

export default function renderFinancialContentBox() {
  const financialContentContainer = createElement('section', {
    id: 'financial-content',
  });
  return financialContentContainer;
}
