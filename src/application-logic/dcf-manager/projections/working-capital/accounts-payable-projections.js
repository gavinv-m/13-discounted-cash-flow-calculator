import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';

class AccountsPayableManager {
  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpenses = revenueAndExpenses;
  }

  projectAccountsPayable() {
    console.log('I work');
  }
}

const accountsPayableManager = new AccountsPayableManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
);

// Exports to working-capital-manager.js
export { accountsPayableManager };
