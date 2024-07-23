import { appendChildren, createElement } from '../../../utils/element-utils';

// Exports to dcf-info.js
export default function renderDcfDefinition(dcfInfoSection) {
  const dcfDefinitionSection = createElement('div', {
    id: 'dcf-definition-section',
  });
  const dcfDefinitionHeading = createElement('h1', {
    text: 'Understanding Discounted Cash Flow (DCF)',
  });

  const dcfDefinition = createElement('p', {
    id: 'dcf-definition',
    text: `The Discounted Cash Flow (DCF) calculator is a powerful financial tool 
    designed to estimate the value of an investment based on its expected future 
    cash flows. By projecting the cash flows that a business or investment is 
    expected to generate in the future and then discounting them to their present 
    value using a discount rate, the DCF method provides a clear picture of the 
    investment's intrinsic value. This approach is highly regarded in finance 
    because it considers the time value of money, ensuring that the valuation 
    reflects both the potential profitability and the inherent risks of the 
    investment.`,
  });

  // Append to definition section
  appendChildren(dcfDefinitionSection, dcfDefinitionHeading, dcfDefinition);

  // Append to dcfInfoSection
  appendChildren(dcfInfoSection, dcfDefinitionSection);
  return;
}
