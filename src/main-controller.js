import { appManager } from './application-logic/app-manager';
import { interfaceManager } from './interface-logic/interface-manager';
import clearPrevStockContent from './utils/clear-stock-content';

class MainController {
  constructor(appManager, interfaceManager, clearStockContent) {
    this.appManager = appManager;
    this.interfaceManager = interfaceManager;
    this.clearPrevStockContent = clearStockContent;
  }

  async initializeApp(tickerSymbol, key) {
    await this.appManager.startApplication(tickerSymbol, key);

    this.clearPrevStockContent();
    this.interfaceManager.populateInterface();
  }
}

const mainController = new MainController(
  appManager,
  interfaceManager,
  clearPrevStockContent,
);

// Exports to index.js & best-matches.js
export { mainController };
