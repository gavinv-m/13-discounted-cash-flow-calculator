import { dataCentre } from './data-centre/data-centre';
import { dcfManager } from './dcf-manager/dcf-manager';

class ApplicationManager {
  constructor(dataCentre, dcfManager) {
    this.dataCentre = dataCentre;
    this.dcfManager = dcfManager;
  }

  async startApplication(tickerSymbol) {
    const success = await this.dataCentre.manageDataBase(tickerSymbol);

    if (success === true) {
      this.dcfManager.startProjections();
    } else {
      console.error('Data request failed');
    }
  }
}

const appManager = new ApplicationManager(dataCentre, dcfManager);

// Exports to index.js
export { appManager };
