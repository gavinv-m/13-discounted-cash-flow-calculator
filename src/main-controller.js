import { appManager } from './application-logic/app-manager';
import { interfaceManager } from './interface-logic/interface-manager';

class MainController {
  constructor(appManager, interfaceManager) {
    this.appManager = appManager;
    this.interfaceManager = interfaceManager;
  }

  initializeApp(tickerSymbol) {
    this.appManager.startApplication(tickerSymbol);
    this.interfaceManager.populateInterface();
  }
}

const mainController = new MainController(appManager, interfaceManager);

// Exports to index.js
export { mainController };
