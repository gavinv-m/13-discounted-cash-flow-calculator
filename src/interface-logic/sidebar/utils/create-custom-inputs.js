import {
  appendChildren,
  createElement,
  createInput,
} from '../../utils/element-utils';
import getQuestionMarkSvg from '../../assets/svgs/question-mark';
import { overviewDataManager } from '../../../application-logic/data-centre/refined-data/overview';
import { revenueAndExpenses } from '../../../application-logic/dcf-manager/projections/revenue-and-expenses-projections';
import { customInputManager } from '../../../application-logic/data-centre/custom-inputs/custom-input-manager';
import { activeMetrics } from '../../../application-logic/data-centre/active-metrics/active-metrics';
import updateInterface from '../../main-section/valuation-financials/utils/update-interface';
import {
  createExplainerContainer,
  removeExplainerContent,
} from '../../utils/explainer-box';

const addValue = function createPlusListener(plusSymbol, inputBox, datakey) {
  plusSymbol.addEventListener('click', () => {
    let currentValue = Number(inputBox.value) + 1;
    inputBox.value = currentValue.toFixed(2);
    customInputManager.setCustomInput(datakey, currentValue);
    updateInterface();
  });
};

const subtractValue = function createMinusListener(
  minusSymbol,
  inputBox,
  datakey,
) {
  minusSymbol.addEventListener('click', () => {
    let currentValue = Number(inputBox.value) - 1;
    inputBox.value = currentValue.toFixed(2);
    customInputManager.setCustomInput(datakey, currentValue);
    updateInterface();
  });
};

const editInput = function createInputListener(inputBox, datakey) {
  let currentValidValue = activeMetrics.getMetrics()[datakey];

  inputBox.addEventListener('input', () => {
    let value = inputBox.value;

    // Check if the input value is valid
    if (/^-?\d*(\.\d{0,2})?$/.test(value)) {
      currentValidValue = value === '' ? 0 : parseFloat(value);
      customInputManager.setCustomInput(datakey, currentValidValue);
      updateInterface();
    } else {
      // If invalid input, revert to the last valid value
      inputBox.value = currentValidValue.toFixed(2);
    }
  });
};

const labels = function getMetricLabels(
  tickerSymbol,
  threeYearGrowthRate,
  fiveYearGrowthRate,
) {
  return {
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
};

const explainerContent = function createExplainer(metric) {
  const explainer = createElement('div', {
    classList: ['custom-explainers'],
    id: metric.questionMarkID,
  });

  if (metric.name !== 'WACC') {
    explainer.innerHTML = getQuestionMarkSvg();
    explainer.addEventListener('mouseover', () => {
      createExplainerContainer(
        metric.explainerText,
        metric.explainerID,
        metric.questionMarkID,
      );
    });
    explainer.addEventListener('mouseout', () => {
      removeExplainerContent(metric.explainerID, metric.questionMarkID);
    });
  }

  return explainer;
};

const container = function createMetricContainer(metric, value) {
  const metricContainer = createElement('div', {
    classList: ['metric'],
    id: metric.datakey,
  });

  const metricName = createElement('div', { text: metric.name });
  const explainer = explainerContent(metric);

  const editContainer = createElement('div');
  const minusSign = createElement('div', { innerHTML: '&#8722;' });
  const inputBox = createInput({ type: 'text', value: value });
  const plusSign = createElement('div', { innerHTML: '&#43;' });

  // Event listeners:
  addValue(plusSign, inputBox, metric.datakey);
  subtractValue(minusSign, inputBox, metric.datakey);
  editInput(inputBox, metric.datakey);

  appendChildren(editContainer, minusSign, inputBox, plusSign);
  appendChildren(metricContainer, metricName, explainer, editContainer);

  return metricContainer;
};

const addInputBoxes = function renderCustomInputBoxes(currentMetrics) {
  const tickerSymbol = overviewDataManager.sendData('Symbol').Symbol;
  const threeYearGrowthRate = (
    revenueAndExpenses.revenueGrowthRates.threeYearAverage * 100
  ).toFixed(2);
  const fiveYearGrowthRate = (
    revenueAndExpenses.revenueGrowthRates.fiveYearAverage * 100
  ).toFixed(2);

  // Get metrics
  const metricLabels = labels(
    tickerSymbol,
    threeYearGrowthRate,
    fiveYearGrowthRate,
  );

  // Main container for all customs
  const customInputs = createElement('div');

  Object.values(metricLabels).forEach((metric) => {
    const currentValue = currentMetrics[metric.datakey].toFixed(2);
    const metricContainer = container(metric, currentValue);
    customInputs.appendChild(metricContainer);
  });

  return customInputs;
};

// Exports to custom-inputs-ui.js
export default function createCustomInputs(currentMetrics) {
  const customsSection = document.getElementById('custom-inputs');
  const customsHeading = createElement('h1', { text: 'Customise Inputs' });
  customsSection.appendChild(customsHeading);

  customsSection.appendChild(addInputBoxes(currentMetrics));
}
