import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';

class AccountsReceivableManager {
  constructor(balanceSheetDataManager, incomeStatementDataManager) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
  }

  projectAccountsReceivable() {}
}

const accountsReceivableManager = new AccountsReceivableManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
);

// Exports to working-capital-manager.js
export { accountsReceivableManager };
