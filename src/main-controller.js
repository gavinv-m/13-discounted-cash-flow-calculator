import { appManager } from './application-logic/app-manager';
import { interfaceManager } from './interface-logic/interface-manager';

class MainController {
  constructor(appManager, interfaceManager) {
    this.appManager = appManager;
    this.interfaceManager = interfaceManager;
  }

  async initializeApp(tickerSymbol, key) {
    await this.appManager.startApplication(tickerSymbol, key);
    this.interfaceManager.populateInterface();
  }
}

const mainController = new MainController(appManager, interfaceManager);

// Exports to index.js
export { mainController };
