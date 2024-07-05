import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';
import projectInventories from '../../utils/project-inventory';

class InventoryManager {
  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
    projectInventories,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpenses = revenueAndExpenses;
    this.projectInventories = projectInventories;
  }

  projectInventory() {
    const inventory =
      this.balanceSheetDataManager.sendData('inventory').inventory;

    const costOfRevenue =
      this.incomeStatementDataManager.sendData('costOfRevenue').costOfRevenue;

    const projectedCostOfRevenue =
      this.revenueAndExpenses.sendData('costOfRevenue').costOfRevenue;

    return this.projectInventories(
      inventory,
      costOfRevenue,
      projectedCostOfRevenue,
    );
  }
}

const inventoryManager = new InventoryManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
  projectInventories,
);

// Exports to working-capital-manager.js
export { inventoryManager };
