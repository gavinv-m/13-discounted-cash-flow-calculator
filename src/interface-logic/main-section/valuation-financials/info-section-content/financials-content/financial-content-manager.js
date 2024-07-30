import createStatementButtons from './utils/create-statement-buttons';
import renderFinancialContentBox from './utils/render-fin-content-box';

class FinancialContentManager {
  constructor(createStatementButtons, renderFinancialContentBox) {
    this.createStatementButtons = createStatementButtons;
    this.renderFinancialContentBox = renderFinancialContentBox;
  }

  addFinancialContent(infoContentContainer) {
    infoContentContainer.appendChild(this.createStatementButtons());

    // Create, store and append the content box headings will manipulate
    const financialContentBox = infoContentContainer.appendChild(
      this.renderFinancialContentBox(),
    );

    // Load page with balance sheet table

    // TODO: Add event listeners to buttons to switch between statements
  }
}

const financialContentManager = new FinancialContentManager(
  createStatementButtons,
  renderFinancialContentBox,
);

// Exports to load-requested info in valuation-financials directory
export { financialContentManager };
