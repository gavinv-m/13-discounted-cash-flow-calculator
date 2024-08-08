import { appManager } from './application-logic/app-manager';
import { interfaceManager } from './interface-logic/interface-manager';
import clearPrevStockContent from './utils/clear-stock-content';
import displayRequestError from './interface-logic/main-section/company-details/utils/display-error';

class MainController {
  constructor(
    appManager,
    interfaceManager,
    clearStockContent,
    displayRequestError,
  ) {
    this.appManager = appManager;
    this.interfaceManager = interfaceManager;
    this.clearPrevStockContent = clearStockContent;
    this.displayRequestError = displayRequestError;
  }

  async initializeApp(tickerSymbol, key) {
    const requestResult = await this.appManager.startApplication(
      tickerSymbol,
      key,
    );

    if (requestResult === true) {
      this.clearPrevStockContent();
      this.interfaceManager.populateInterface();
    } else {
      this.displayRequestError(requestResult);
    }
  }
}

const mainController = new MainController(
  appManager,
  interfaceManager,
  clearPrevStockContent,
  displayRequestError,
);

// Exports to index.js & best-matches.js
export { mainController };
