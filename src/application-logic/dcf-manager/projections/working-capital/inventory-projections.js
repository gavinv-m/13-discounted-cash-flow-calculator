import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { revenueAndExpenses } from '../revenue-and-expenses-projections';

class InventoryManager {
  constructor(
    balanceSheetDataManager,
    incomeStatementDataManager,
    revenueAndExpenses,
  ) {
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpenses = revenueAndExpenses;
  }

  projectInventory() {
    console.log('working');
  }
}

const inventoryManager = new InventoryManager(
  balanceSheetDataManager,
  incomeStatementDataManager,
  revenueAndExpenses,
);

// Exports to working-capital-manager.js
export { inventoryManager };
