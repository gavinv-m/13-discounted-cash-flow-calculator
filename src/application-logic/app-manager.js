import queryApiData from './api-data-utils';
import { dataCentre } from './data-centre/data-centre';

class ApplicationManager {
  constructor(dataCentre) {
    this.dataCentre = dataCentre;
  }

  async handleApiData(tickerSymbol) {
    const data = await queryApiData(tickerSymbol);

    if (data.length === 4) {
      this.dataCentre.storeFinancialStatements(data);
    }
  }

  startApplication(tickerSymbol) {
    this.handleApiData(tickerSymbol);
  }
}

const appManager = new ApplicationManager(dataCentre);

// Exports to index.js
export { appManager };
