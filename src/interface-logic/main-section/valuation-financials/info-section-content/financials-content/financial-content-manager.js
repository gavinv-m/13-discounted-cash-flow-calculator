import createStatementButtons from './utils/create-statement-buttons';
import renderFinancialContentBox from './utils/render-fin-content-box';
import { balanceSheetUIManager } from './balance-sheet-statement/bal-sheet-manager';
import addButtonsEventListeners from './utils/buttons-event-listeners';

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
  }

  addFinancialContent(infoContentContainer) {
    infoContentContainer.appendChild(this.createStatementButtons());

    // Create, store and append the content box headings will manipulate
    const financialContentBox = infoContentContainer.appendChild(
      this.renderFinancialContentBox(),
    );

    // Load page with balance sheet table, sorted latest to oldest, limited to 5 years
    this.balanceSheetUIManager.addBalanceSheetUI(
      financialContentBox,
      'latestToOldestYearsOnly',
      'latestToOldestYearsAndMonth',
      5,
    );

    // TODO: Add event listeners to buttons to switch between statements
    const statementsButton = document.querySelectorAll('.statement-btn');
    this.addButtonsEventListeners(statementsButton, financialContentBox);
  }
}

const financialContentManager = new FinancialContentManager(
  createStatementButtons,
  renderFinancialContentBox,
  balanceSheetUIManager,
  addButtonsEventListeners,
);

// Exports to load-requested info in valuation-financials directory
export { financialContentManager };
