import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import projectInventories from '../../utils/project-inventory';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class InventoryManager {
  projections = {};

  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
    projectInventories,
    getFinancialLineItems,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectInventories = projectInventories;
    this.getDaysOutstanding = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getDaysOutstanding(args, this.projections);
  }

  projectInventory() {
    const inventory =
      this.balanceSheetDataManager.sendData('inventory').inventory;

    const costOfRevenue =
      this.incomeStatementDataManager.sendData('costOfRevenue').costOfRevenue;

    const projectedCostOfRevenue =
      this.revenueAndExpenses.sendData('costOfRevenue').costOfRevenue;

    const data = this.projectInventories(
      inventory,
      costOfRevenue,
      projectedCostOfRevenue,
    );

    this.projections.daysInventoryOutstanding = data.daysInventoryOutstanding;

    return data.projectedInventory;
  }
}

const inventoryManager = new InventoryManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
  projectInventories,
  getFinancialLineItems,
);

// Exports to working-capital-manager.js
export { inventoryManager };
