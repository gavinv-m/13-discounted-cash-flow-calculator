import queryApiData from './api-data-utils';

class DataCentre {
  incomeStatement = null;
  balanceSheet = null;
  cashFlowStatement = null;
  overview = null;

  constructor() {}

  manageDataBase(tickerSymbol) {
    this.requestAndHandleData(tickerSymbol);
  }

  async requestAndHandleData(tickerSymbol) {
    const data = await queryApiData(tickerSymbol);
    if (data.length === 4) {
      this.storeFinancialStatements(data);
    }
  }

  storeFinancialStatements(apiData) {
    const statements = [
      'incomeStatement',
      'balanceSheet',
      'cashFlowStatement',
      'overview',
    ];

    const apiDataLength = apiData.length;
    for (let i = 0; i < apiDataLength; i++) {
      this[statements[i]] = apiData[i];
    }
  }
}

const dataCentre = new DataCentre();

// Exports to app-manager.js
export { dataCentre };
