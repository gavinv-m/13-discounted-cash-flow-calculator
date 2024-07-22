import { appendChildren, createElement } from '../../utils/element-utils';
import { activeMetrics } from '../../../application-logic/data-centre/active-metrics/active-metrics';

const addInputBoxes = function renderCustomInputBoxes() {
  const customInputs = createElement('div'); // TODO: Return to customs section
  const metrics = activeMetrics.getMetrics();
};

// Exports to custom-inputs-ui.js
export default function createCustomInputs() {
  const customsSection = document.getElementById('custom-inputs');
  const customsHeading = createElement('h1', { text: 'Customise Inputs' });
  customsSection.appendChild(customsHeading);

  addInputBoxes();
}
