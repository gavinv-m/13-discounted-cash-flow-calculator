import { appendChildren, createElement } from '../../../utils/element-utils';

// Exports to dcf-info.js
export default function renderDcfExplanation(dcfInfoSection) {
  const explanationSection = createElement('div', {
    id: 'dcf-explanation-section',
  });

  const explanationHeading = createElement('h1', {
    text: 'How this calculator works',
  });

  const explanation = createElement('p', {
    id: 'dcf-explanation',
    innerHTML: `When projecting revenue, if no custom growth rate is provided, the calculator 
    defaults to the average growth rate of the past five years. If this rate is negative, 
    it will use the average growth rate of the last three years instead. If neither of 
    these values is available, a 3% growth rate is applied to ensure reasonable projections.
    <br><br>Yearly depreciation and amortization are estimated based on a five-year useful 
    life for each year's capital expenditure.
    <br><br>For calculating Days Sales Outstanding (DSO), the calculator 
    uses overall sales data and assumes that 50% of these sales are on credit, as credit 
    sales data is not available.
    <br><br>For the Weighted Average Cost of Capital (WACC), cost of equity is determined 
    using a risk-free rate of 3.5% and a market premium of 10% through the Capital Asset Pricing Model (CAPM). 
    The cost of debt is calculated based on company financials using the formula: 
    'interest expense / debt'.
    <br><br>A default tax rate of 21% is used throughout the app, reflecting the current U.S. 
    corporate tax rate, ensuring consistency in financial calculations.`,
  });

  // Append to explanation section
  appendChildren(explanationSection, explanationHeading, explanation);

  // Append to dcfInfoSection
  appendChildren(dcfInfoSection, explanationSection);

  return;
}
