import {
  appendChildren,
  createElement,
} from '../../../../../utils/element-utils';

// Exports to valuation-contentt-manager
export default function createProjectionsHeadings() {
  const container = createElement('div', { id: 'projections-headings' });

  const revAndExpensesHeading = createElement('h2', {
    text: 'Revenue & Expenses',
    classList: ['projection-heading'],
  });

  const capexHeading = createElement('h2', {
    text: 'CAPEX',
    classList: ['projection-heading'],
  });

  const depreciationAmortisationHeading = createElement('h2', {
    text: 'Depreciation & Amortisation',
    classList: ['projection-heading'],
  });

  const workingCapHeading = createElement('h2', {
    text: 'Working Capital',
    classList: ['projection-heading'],
  });

  const terminalValHeading = createElement('h2', {
    text: 'Terminal Value',
    classList: ['projection-heading'],
  });

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
