import { accountsReceivableManager } from './accounts-receivable-projections';
import { accountsPayableManager } from './accounts-payable-projections';

class WorkingCapitalManager {
  projections = {};

  constructor(accountsReceivableManager, accountsPayableManager) {
    this.accountsReceivableManager = accountsReceivableManager;
    this.accountsPayableManager = accountsPayableManager;
  }

  projectWorkingCapital() {
    this.projections.accountsReceivable =
      this.accountsReceivableManager.projectAccountsReceivable();

    this.projections.accountsPayable =
      this.accountsPayableManager.projectAccountsPayable();
  }
}

const workingCapProjectionsManager = new WorkingCapitalManager(
  accountsReceivableManager,
  accountsPayableManager,
);

export { workingCapProjectionsManager };
