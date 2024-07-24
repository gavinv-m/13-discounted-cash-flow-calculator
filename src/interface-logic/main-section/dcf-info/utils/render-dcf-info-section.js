import { createElement } from '../../../utils/element-utils';

export default function renderDCFInfoSection(mainContent) {
  const dcfInfoSection = createElement('section', { id: 'dcf-info-section' });
  mainContent.appendChild(dcfInfoSection);
  return dcfInfoSection;
}
