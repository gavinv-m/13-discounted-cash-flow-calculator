import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import projectReceivables from '../../utils/project-receivables';

class AccountsReceivableManager {
  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
    projectReceivables,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpensesProjections = revenueAndExpenses;
    this.projectReceivables = projectReceivables;
  }

  projectAccountsReceivable() {
    const accountsReceivable = this.balanceSheetDataManager.sendData(
      'currentNetReceivables',
    ).currentNetReceivables;

    const revenue =
      this.incomeStatementDataManager.sendData('totalRevenue').totalRevenue;

    const projectedRevenue =
      this.revenueAndExpensesProjections.sendData(
        'revenueProjections',
      ).revenueProjections;

    return this.projectReceivables(
      accountsReceivable,
      revenue,
      projectedRevenue,
    );
  }
}

const accountsReceivableManager = new AccountsReceivableManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
  projectReceivables,
);

// Exports to working-capital-manager.js
export { accountsReceivableManager };
