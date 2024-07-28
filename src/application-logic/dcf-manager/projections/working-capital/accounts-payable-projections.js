import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import projectPayables from '../../utils/project-payables';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class AccountsPayableManager {
  projections = {};

  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
    projectPayables,
    getFinancialLineItems,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectPayables = projectPayables;
    this.getDaysOutstanding = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getDaysOutstanding(args, this.projections);
  }

  projectAccountsPayable() {
    const accountsPayable = this.balanceSheetDataManager.sendData(
      'currentAccountsPayable',
    ).currentAccountsPayable;

    const cogs =
      this.incomeStatementDataManager.sendData('costOfRevenue').costOfRevenue;

    const projectedCostOfRevenue =
      this.revenueAndExpenses.sendData('costOfRevenue').costOfRevenue;

    const data = this.projectPayables(
      accountsPayable,
      cogs,
      projectedCostOfRevenue,
    );

    this.projections.daysPayablesOutstanding = data.daysPayablesOutstanding;

    return data.projectedPayables;
  }
}

const accountsPayableManager = new AccountsPayableManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
  projectPayables,
  getFinancialLineItems,
);

// Exports to working-capital-manager.js
export { accountsPayableManager };
