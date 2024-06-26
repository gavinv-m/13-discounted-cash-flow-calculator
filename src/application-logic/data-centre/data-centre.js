import queryApiData from './utils/api-data-utils';
import { incomeStatementDataManager } from './refined-data/income-statement';
import { balanceSheetDataManager } from './refined-data/balance-sheet';
import { cashFlowStatementDataManager } from './refined-data/cash-flow-statement';

class DataCentre {
  incomeStatement = null;
  balanceSheet = null;
  cashFlowStatement = null;
  overview = null;

  constructor(
    incomeStatementDataManager,
    balanceSheetDataManager,
    cashFlowStatementDataManager,
  ) {
    this.incomeStatementManager = incomeStatementDataManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
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
);

// Exports to app-manager.js
export { dataCentre };
