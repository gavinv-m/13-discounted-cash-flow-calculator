import queryApiData from './utils/api-data-utils';
import { incomeStatementDataManager } from './refined-data/income-statement';
import { balanceSheetDataManager } from './refined-data/balance-sheet';
import { cashFlowStatementDataManager } from './refined-data/cash-flow-statement';
import { overviewDataManager } from './refined-data/overview';

class DataCentre {
  incomeStatement = null;
  balanceSheet = null;
  cashFlowStatement = null;
  overview = null;

  constructor(
    incomeStatementDataManager,
    balanceSheetDataManager,
    cashFlowStatementDataManager,
    overviewDataManager,
  ) {
    this.incomeStatementManager = incomeStatementDataManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.overviewDataManager = overviewDataManager;
  }

  manageDataBase(tickerSymbol) {
    this.requestAndHandleData(tickerSymbol);
  }

  async requestAndHandleData(tickerSymbol) {
    const data = await queryApiData(tickerSymbol);
    if (data.length === 4) {
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
    return;
  }
}

const dataCentre = new DataCentre(
  incomeStatementDataManager,
  balanceSheetDataManager,
  cashFlowStatementDataManager,
  overviewDataManager,
);

// Exports to app-manager.js
export { dataCentre };
