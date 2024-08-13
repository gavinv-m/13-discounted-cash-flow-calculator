import createStatementButtons from './utils/create-statement-buttons';
import renderFinancialContentBox from './utils/render-fin-content-box';
import { balanceSheetUIManager } from './balance-sheet-statement/bal-sheet-manager';
import addButtonsEventListeners from './utils/buttons-event-listeners';
import createPeriodButtons from './utils/periods-dropdown';
import { createElement } from '../../../../utils/element-utils';

class FinancialContentManager {
  constructor(
    createStatementButtons,
    renderFinancialContentBox,
    balanceSheetUIManager,
    addButtonsEventListeners,
  ) {
    this.createStatementButtons = createStatementButtons;
    this.renderFinancialContentBox = renderFinancialContentBox;
    this.balanceSheetUIManager = balanceSheetUIManager;
    this.addButtonsEventListeners = addButtonsEventListeners;
    this.createPeriodButtons = createPeriodButtons;
  }

  addFinancialContent(infoContentContainer) {
    const buttonsContainer = createElement('div', {
      id: 'financial-btns-container',
    });

    this.createStatementButtons(buttonsContainer);
    infoContentContainer.appendChild(buttonsContainer);

    const warningContainer = createElement('div', { id: 'warning-container' });
    const message = createElement('p', {
      id: 'totals-message',
      innerHTML: `Please note that the component line items may not sum up to the reported totals 
      due to incomplete data from the API.<br> However, the total figures are accurate and have been 
      verified against the actual financial statements.`,
    });
    warningContainer.appendChild(message);
    infoContentContainer.appendChild(warningContainer);

    // Create, store and append the content box statement, and period buttons will manipulate
    const financialContentBox = infoContentContainer.appendChild(
      this.renderFinancialContentBox(),
    );

    // Create buttons that will toggle periods to show
    buttonsContainer.appendChild(this.createPeriodButtons(financialContentBox));

    // Load page with balance sheet table, sorted latest to oldest, limited to 5 years
    this.balanceSheetUIManager.addBalanceSheetUI(
      financialContentBox,
      'latestToOldestYearsOnly',
      'latestToOldestYearsAndMonth',
      5,
    );

    const statementsButton = document.querySelectorAll('.statement-btn');
    this.addButtonsEventListeners(statementsButton, financialContentBox);
  }
}

const financialContentManager = new FinancialContentManager(
  createStatementButtons,
  renderFinancialContentBox,
  balanceSheetUIManager,
  addButtonsEventListeners,
  createPeriodButtons,
);

// Exports to load-requested info in valuation-financials directory
export { financialContentManager };
