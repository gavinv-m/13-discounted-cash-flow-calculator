import queryApiData from './utils/api-data-utils';
import { incomeStatementDataManager } from './refined-data/income-statement';
import { balanceSheetDataManager } from './refined-data/balance-sheet';
import { cashFlowStatementDataManager } from './refined-data/cash-flow-statement';
import { overviewDataManager } from './refined-data/overview';
import { timeSeriesDataManager } from './refined-data/time-series';
import checkDataValid from './api-data-validation';

class DataCentre {
  incomeStatement = null;
  balanceSheet = null;
  cashFlowStatement = null;
  overview = null;
  timeSeriesData = null;

  constructor(
    incomeStatementDataManager,
    balanceSheetDataManager,
    cashFlowStatementDataManager,
    overviewDataManager,
    timeSeriesDataManager,
    checkDataValid,
  ) {
    this.incomeStatementManager = incomeStatementDataManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.overviewDataManager = overviewDataManager;
    this.timeSeriesDataManager = timeSeriesDataManager;
    this.checkDataValid = checkDataValid;
  }

  async manageDataBase(tickerSymbol, key) {
    const dataArray = await queryApiData(tickerSymbol, key);
    const dataValidityResult = this.checkDataValid(dataArray);

    if (dataValidityResult === true) {
      return this.handleData(tickerSymbol, dataArray);
    } else {
      return dataValidityResult; // Error message
    }
  }

  handleData(tickerSymbol, dataArray) {
    // Store in local storage
    if (!(tickerSymbol in localStorage)) {
      localStorage.setItem(tickerSymbol, JSON.stringify(dataArray));
    }

    this.storeFinancialStatements(dataArray);

    // Aggregate data by line items
    this.incomeStatementManager.handleIncomeStatementData(this.incomeStatement);

    this.balanceSheetDataManager.handleBalanceSheetData(this.balanceSheet);

    this.cashFlowStatementDataManager.handleCashFlowStatementData(
      this.cashFlowStatement,
    );

    this.overviewDataManager.handleOverViewData(this.overview);

    this.timeSeriesDataManager.handleTimeSeriesData(this.timeSeriesData);

    return true;
  }

  storeFinancialStatements(apiData) {
    const statements = [
      'incomeStatement',
      'balanceSheet',
      'cashFlowStatement',
      'overview',
      'timeSeriesData',
    ];

    const apiDataLength = apiData.length;
    for (let i = 0; i < apiDataLength; i++) {
      this[statements[i]] = apiData[i];
    }
    return;
  }
}

const dataCentre = new DataCentre(
  incomeStatementDataManager,
  balanceSheetDataManager,
  cashFlowStatementDataManager,
  overviewDataManager,
  timeSeriesDataManager,
  checkDataValid,
);

// Exports to app-manager.js
export { dataCentre };
