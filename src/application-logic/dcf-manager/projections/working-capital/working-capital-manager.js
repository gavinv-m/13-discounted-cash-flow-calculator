import { accountsReceivableManager } from './accounts-receivable-projections';

class WorkingCapitalManager {
  constructor(accountsReceivableManager) {
    this.accountsReceivableManager = accountsReceivableManager;
  }

  projectWorkingCapital() {
    this.accountsReceivableManager.projectAccountsReceivable();
  }
}

const workingCapProjectionsManager = new WorkingCapitalManager(
  accountsReceivableManager,
);

export { workingCapProjectionsManager };
