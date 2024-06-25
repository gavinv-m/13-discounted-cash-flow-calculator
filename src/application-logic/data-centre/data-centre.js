class DataCentre {
  incomeStatement;
  balanceSheet;
  cashFlowStatament;
  overview;

  constructor() {}

  storeFinancialStatements(apiData) {
    this.incomeStatement = apiData[0];
    this.balanceSheet = apiData[1];
    this.cashFlowStatament = apiData[2];
    this.overview = apiData[3];
  }
}

const dataCentre = new DataCentre();

// Exports to app-manager.js
export { dataCentre };
