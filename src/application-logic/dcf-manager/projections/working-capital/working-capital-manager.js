import { accountsReceivableManager } from './project-accounts-receivable';

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
