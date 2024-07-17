import queryApiData from './utils/api-data-utils';
import { incomeStatementDataManager } from './refined-data/income-statement';
import { balanceSheetDataManager } from './refined-data/balance-sheet';
import { cashFlowStatementDataManager } from './refined-data/cash-flow-statement';
import { overviewDataManager } from './refined-data/overview';
import { timeSeriesDataManager } from './refined-data/time-series';

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
  ) {
    this.incomeStatementManager = incomeStatementDataManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.overviewDataManager = overviewDataManager;
    this.timeSeriesDataManager = timeSeriesDataManager;
  }

  async manageDataBase(tickerSymbol) {
    const success = await this.requestAndHandleData(tickerSymbol);
    return success;
  }

  async requestAndHandleData(tickerSymbol) {
    const data = await queryApiData(tickerSymbol);

    if (data.length === 5) {
      // Store in local storage
      if (!(tickerSymbol in localStorage)) {
        localStorage.setItem(tickerSymbol, JSON.stringify(data));
      }

      this.storeFinancialStatements(data);

      // Aggregate data by line items
      this.incomeStatementManager.handleIncomeStatementData(
        this.incomeStatement,
      );

      this.balanceSheetDataManager.handleBalanceSheetData(this.balanceSheet);

      this.cashFlowStatementDataManager.handleCashFlowStatementData(
        this.cashFlowStatement,
      );

      this.overviewDataManager.handleOverViewData(this.overview);

      this.timeSeriesDataManager.handleTimeSeriesData(this.timeSeriesData);

      return true;
    }

    return false;
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
);

// Exports to app-manager.js
export { dataCentre };
