import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';

class AccountsReceivableManager {
  constructor(balanceSheetDataManager) {
    this.balanceSheetDataManager = balanceSheetDataManager;
  }

  projectAccountsReceivable() {
    console.log(this.balanceSheetDataManager.sendData('currentNetReceivables'));
  }
}

const accountsReceivableManager = new AccountsReceivableManager(
  balanceSheetDataManager,
);

// Exports to working-capital-manager.js
export { accountsReceivableManager };
