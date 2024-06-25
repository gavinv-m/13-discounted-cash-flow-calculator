import { dataCentre } from './data-centre/data-centre';

class ApplicationManager {
  constructor(dataCentre) {
    this.dataCentre = dataCentre;
  }

  startApplication(tickerSymbol) {
    this.dataCentre.manageDataBase(tickerSymbol);
  }
}

const appManager = new ApplicationManager(dataCentre);

// Exports to index.js
export { appManager };
