import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import projectReceivables from '../../utils/project-receivables';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class AccountsReceivableManager {
  projections = {};

  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
    projectReceivables,
    getFinancialLineItems,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpensesProjections = revenueAndExpenses;
    this.projectReceivables = projectReceivables;
    this.getDaysOutstanding = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getDaysOutstanding(args, this.projections);
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

    const data = this.projectReceivables(
      accountsReceivable,
      revenue,
      projectedRevenue,
    );

    this.projections.daysSalesOutstanding = data.daysSalesOutstanding;

    return data.projectedReceivables;
  }
}

const accountsReceivableManager = new AccountsReceivableManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
  projectReceivables,
  getFinancialLineItems,
);

// Exports to working-capital-manager.js
export { accountsReceivableManager };
