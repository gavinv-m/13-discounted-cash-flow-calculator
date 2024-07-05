import { accountsReceivableManager } from './accounts-receivable-projections';
import { accountsPayableManager } from './accounts-payable-projections';
import { inventoryManager } from './inventory-projections';

class WorkingCapitalManager {
  projections = {};

  constructor(
    accountsReceivableManager,
    accountsPayableManager,
    inventoryManager,
  ) {
    this.accountsReceivableManager = accountsReceivableManager;
    this.accountsPayableManager = accountsPayableManager;
    this.inventoryManager = inventoryManager;
  }

  projectWorkingCapital() {
    this.projections.accountsReceivable =
      this.accountsReceivableManager.projectAccountsReceivable();

    this.projections.accountsPayable =
      this.accountsPayableManager.projectAccountsPayable();

    this.projections.inventory = this.inventoryManager.projectInventory();
    console.log(this.projections);
  }
}

const workingCapProjectionsManager = new WorkingCapitalManager(
  accountsReceivableManager,
  accountsPayableManager,
  inventoryManager,
);

export { workingCapProjectionsManager };
