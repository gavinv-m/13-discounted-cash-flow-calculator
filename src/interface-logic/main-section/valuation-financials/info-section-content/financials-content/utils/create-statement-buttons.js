import {
  appendChildren,
  createElement,
} from '../../../../../utils/element-utils';

// Exports to financial-content-manager.js
export default function createStatementButtons(buttonsContainer) {
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

  appendChildren(buttonsContainer, balSheetBtn, incStatementBtn, cashFlowBtn);

  return;
}
