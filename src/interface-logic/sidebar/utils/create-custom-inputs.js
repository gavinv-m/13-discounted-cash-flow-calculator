import {
  appendChildren,
  createElement,
  createInput,
} from '../../utils/element-utils';
import getQuestionMarkSvg from '../../assets/svgs/question-mark';

const addInputBoxes = function renderCustomInputBoxes(activeMetrics) {
  const customInputs = createElement('div');
  const currentMetrics = activeMetrics.getMetrics();
  const metricLabels = {
    Revenue: 'revenueGrowthRate',
    Tax: 'taxRate',
    WACC: 'wacc',
    'Growth Rate': 'longTermGrowthRate',
  };

  for (let label in metricLabels) {
    const metricContainer = createElement('div', {
      classList: ['metric'],
      id: metricLabels[label],
    });
    const value = currentMetrics[metricLabels[label]];

    const metricName = createElement('div', { text: label });

    const explainer = createElement('div');
    if (label !== 'WACC') {
      explainer.innerHTML = getQuestionMarkSvg();
    }

    const editContainer = createElement('div');
    const minusSign = createElement('div', { innerHTML: '&#8722;' });
    const inputBox = createInput({ type: 'text' });
    const plusSign = createElement('div', { innerHTML: '&#43;' });
    appendChildren(editContainer, minusSign, inputBox, plusSign);

    // Append to metric container
    appendChildren(metricContainer, metricName, explainer, editContainer);

    // Append metric container to custom inputs container
    customInputs.appendChild(metricContainer);
  }

  return customInputs;
};

// Exports to custom-inputs-ui.js
export default function createCustomInputs() {
  const customsSection = document.getElementById('custom-inputs');
  const customsHeading = createElement('h1', { text: 'Customise Inputs' });
  customsSection.appendChild(customsHeading);
}
