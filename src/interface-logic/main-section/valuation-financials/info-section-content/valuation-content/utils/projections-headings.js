import {
  appendChildren,
  createElement,
} from '../../../../../utils/element-utils';

// Exports to valuation-contentt-manager
export default function createProjectionsHeadings() {
  const container = createElement('div', { id: 'projections-headings' });

  const revAndExpensesHeading = createElement('h2', {
    text: 'Revenue & Expenses',
  });
  const capexHeading = createElement('h2', { text: 'CAPEX' });
  const depreciationAmortisationHeading = createElement('h2', {
    text: 'Depreciation & Amortisation',
  });
  const workingCapHeading = createElement('h2', { text: 'Working Capital' });
  const terminalValHeading = createElement('h2', { text: 'Terminal Value' });

  appendChildren(
    container,
    revAndExpensesHeading,
    capexHeading,
    depreciationAmortisationHeading,
    workingCapHeading,
    terminalValHeading,
  );

  return container;
}
