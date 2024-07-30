import {
  appendChildren,
  createElement,
} from '../../../../../utils/element-utils';

// Exports to financial-content-manager.js
export default function createStatementButtons() {
  const container = createElement('div', { id: 'financial-btns-container' });

  const balSheetBtn = createElement('button', {
    type: 'button',
    text: 'Balance Sheet',
    classList: ['statement-btn'],
    id: 'bal-sheet-btn',
  });

  const incStatementBtn = createElement('button', {
    type: 'button',
    text: 'Income Statement',
    classList: ['statement-btn'],
    id: 'inc-statement-btn',
  });

  const cashFlowBtn = createElement('button', {
    type: 'button',
    text: 'Cash Flow Statement',
    classList: ['statement-btn'],
    id: 'cash-flow-btn',
  });

  appendChildren(container, balSheetBtn, incStatementBtn, cashFlowBtn);

  return container;
}
