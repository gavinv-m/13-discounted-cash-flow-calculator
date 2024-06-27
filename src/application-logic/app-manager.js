import { dataCentre } from './data-centre/data-centre';
import { dcfManager } from './dcf-manager/dcf-manager';

class ApplicationManager {
  constructor(dataCentre, dcfManager) {
    this.dataCentre = dataCentre;
    this.dcfManager = dcfManager;
  }

  startApplication(tickerSymbol) {
    this.dataCentre.manageDataBase(tickerSymbol);
    this.dcfManager.startProjections();
  }
}

const appManager = new ApplicationManager(dataCentre, dcfManager);

// Exports to index.js
export { appManager };
