import {
  appendChildren,
  createElement,
  createInput,
} from '../../utils/element-utils';
import getQuestionMarkSvg from '../../assets/svgs/question-mark';
import { overviewDataManager } from '../../../application-logic/data-centre/refined-data/overview';
import { revenueAndExpenses } from '../../../application-logic/dcf-manager/projections/revenue-and-expenses-projections';
import {
  createExplainerContainer,
  removeExplainerContent,
} from '../../utils/explainer-box';

const addInputBoxes = function renderCustomInputBoxes(metrics) {
  const tickerSymbol = overviewDataManager.sendData('Symbol').Symbol;
  const threeYearGrowthRate = (
    revenueAndExpenses.revenueGrowthRates.threeYearAverage * 100
  ).toFixed(2);
  const fiveYearGrowthRate = (
    revenueAndExpenses.revenueGrowthRates.fiveYearAverage * 100
  ).toFixed(2);

  const metricLabels = {
    revenue: {
      name: 'Revenue',
      datakey: 'revenueGrowthRate',
      explainerText: `The calculator defaults to the average growth rate of the past five years.
      If this rate is negative, it will use the average growth rate of the last three years instead.
      If neither of these values is available, a 3% growth rate is applied to ensure reasonable projections.
      The three year growth rate for ${tickerSymbol} is ${threeYearGrowthRate}% and five year growth rate is ${fiveYearGrowthRate}%`,
      explainerID: 'custom-revenue-explainer',
      questionMarkID: 'custom-revenue-question',
    },
    tax: {
      name: 'Tax',
      datakey: 'taxRate',
      explainerText: 'U.S. Corporate tax rate',
      explainerID: 'custom-tax-rate-explainer',
      questionMarkID: 'custom-tax-question',
    },
    wacc: {
      name: 'WACC',
      datakey: 'wacc',
      questionMarkID: 'custom-wacc-question',
    },
    growthRate: {
      name: 'Growth Rate',
      datakey: 'longTermGrowthRate',
      explainerText: 'Growth rate limited to risk free rate',
      explainerID: 'custom-growth-rate-explainer',
      questionMarkID: 'custom-growth-rate-question',
    },
  };

  // Main container that holds all metrics
  const customInputs = createElement('div');

  for (let label in metricLabels) {
    const metricContainer = createElement('div', {
      classList: ['metric'],
      id: metricLabels[label].datakey,
    });

    const metricName = createElement('div', { text: metricLabels[label].name });

    // Container that holds the question mark
    const explainer = createElement('div', {
      classList: ['custom-explainers'],
      id: metricLabels[label].questionMarkID,
    });

    if (metricLabels[label].name !== 'WACC') {
      explainer.innerHTML = getQuestionMarkSvg();

      explainer.addEventListener('mouseover', () => {
        // Create container with text, ID of the explainer box, ID of the question mark div
        createExplainerContainer(
          metricLabels[label].explainerText,
          metricLabels[label].explainerID,
          metricLabels[label].questionMarkID,
        );
      });

      // Remove container
      explainer.addEventListener('mouseout', () => {
        // Remove explainer box from parent element explainer
        removeExplainerContent(
          metricLabels[label].explainerID,
          metricLabels[label].questionMarkID,
        );
      });
    }

    const editContainer = createElement('div');
    const minusSign = createElement('div', { innerHTML: '&#8722;' });
    const value = metrics[metricLabels[label].datakey].toFixed(2);
    const inputBox = createInput({
      type: 'text',
      value: value,
    });
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
export default function createCustomInputs(currentMetrics) {
  const customsSection = document.getElementById('custom-inputs');
  const customsHeading = createElement('h1', { text: 'Customise Inputs' });
  customsSection.appendChild(customsHeading);

  customsSection.appendChild(addInputBoxes(currentMetrics));
}
