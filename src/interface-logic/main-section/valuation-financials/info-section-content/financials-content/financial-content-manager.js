import createStatementButtons from './utils/create-statement-buttons';
import renderFinancialContentBox from './utils/render-fin-content-box';
import { balanceSheetUIManager } from './balance-sheet-statement/bal-sheet-manager';
import addButtonsEventListeners from './utils/buttons-event-listeners';
import createPeriodButtons from './utils/periods-dropdown';

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
    infoContentContainer.appendChild(this.createStatementButtons());
    infoContentContainer.appendChild(this.createPeriodButtons());

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
