import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import projectPayables from '../../utils/project-payables';

class AccountsPayableManager {
  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
    projectPayables,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectPayables = projectPayables;
  }

  projectAccountsPayable() {
    const accountsPayable = this.balanceSheetDataManager.sendData(
      'currentAccountsPayable',
    ).currentAccountsPayable;

    const cogs =
      this.incomeStatementDataManager.sendData('costOfRevenue').costOfRevenue;

    const projectedCostOfRevenue =
      this.revenueAndExpenses.sendData('costOfRevenue').costOfRevenue;

    return this.projectPayables(accountsPayable, cogs, projectedCostOfRevenue);
  }
}

const accountsPayableManager = new AccountsPayableManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
  projectPayables,
);

// Exports to working-capital-manager.js
export { accountsPayableManager };
