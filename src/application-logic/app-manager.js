import { dataCentre } from './data-centre/data-centre';
import { dcfManager } from './dcf-manager/dcf-manager';

class ApplicationManager {
  constructor(dataCentre, dcfManager) {
    this.dataCentre = dataCentre;
    this.dcfManager = dcfManager;
  }

  async startApplication(tickerSymbol, key) {
    const requestResult = await this.dataCentre.manageDataBase(
      tickerSymbol,
      key,
    );

    if (requestResult === true) {
      this.dcfManager.startProjections();
      return true;
    } else {
      return requestResult;
    }
  }
}

const appManager = new ApplicationManager(dataCentre, dcfManager);

// Exports to main-controller.js
export { appManager };
