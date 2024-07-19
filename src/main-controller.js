import { appManager } from './application-logic/app-manager';

class MainController {
  constructor(appManager) {
    this.appManager = appManager;
  }

  initializeApp(tickerSymbol) {
    this.appManager.startApplication(tickerSymbol);
  }
}

const mainController = new MainController(appManager);

// Exports to index.js
export { mainController };
