import { accountsReceivableManager } from './accounts-receivable-projections';

class WorkingCapitalManager {
  projections = {};

  constructor(accountsReceivableManager) {
    this.accountsReceivableManager = accountsReceivableManager;
  }

  projectWorkingCapital() {
    this.projections.accountsReceivable =
      this.accountsReceivableManager.projectAccountsReceivable();
    console.log(this.projections);
  }
}

const workingCapProjectionsManager = new WorkingCapitalManager(
  accountsReceivableManager,
);

export { workingCapProjectionsManager };
