import { accountsReceivableManager } from './accounts-receivable-projections';
import { accountsPayableManager } from './accounts-payable-projections';
import { inventoryManager } from './inventory-projections';
import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import calculateNetWorkingCapital from '../../utils/calc-net-working-cap';
import calculateChangeInNWC from '../../utils/change-in-nwc';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class WorkingCapitalManager {
  projections = {};

  constructor(
    accountsReceivableManager,
    accountsPayableManager,
    inventoryManager,
    balanceSheetDataManager,
    calculateNetWorkingCapital,
    calculateChangeInNWC,
    getFinancialLineItems,
  ) {
    this.accountsReceivableManager = accountsReceivableManager;
    this.accountsPayableManager = accountsPayableManager;
    this.inventoryManager = inventoryManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.calculateNetWorkingCapital = calculateNetWorkingCapital;
    this.calculateChangeInNWC = calculateChangeInNWC;
    this.getWorkingCapitalItem = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getWorkingCapitalItem(args, this.projections);
  }

  projectWorkingCapital() {
    this.projections.currentNetReceivables =
      this.accountsReceivableManager.projectAccountsReceivable();

    this.projections.currentAccountsPayable =
      this.accountsPayableManager.projectAccountsPayable();

    this.projections.inventory = this.inventoryManager.projectInventory();

    // Calculate net working capital, and changes in net working capital
    this.calculateNetWorkingCap();
    this.projections.changesInNetWorkingCapital = this.calculateChangeInNWC(
      this.projections.historicalNetWorkingCapital,
      this.projections.projectedNetWorkingCapital,
    );
  }

  calculateNetWorkingCap() {
    // Calculate historical net working capital
    const historicalValues = this.balanceSheetDataManager.sendData(
      'currentNetReceivables',
      'currentAccountsPayable',
      'inventory',
    );

    this.projections.historicalNetWorkingCapital =
      this.calculateNetWorkingCapital(historicalValues);

    // Calculate projected net working capital
    this.projections.projectedNetWorkingCapital =
      this.calculateNetWorkingCapital({
        currentNetReceivables: this.projections.currentNetReceivables,
        currentAccountsPayable: this.projections.currentAccountsPayable,
        inventory: this.projections.inventory,
      });
  }
}

const workingCapProjectionsManager = new WorkingCapitalManager(
  accountsReceivableManager,
  accountsPayableManager,
  inventoryManager,
  balanceSheetDataManager,
  calculateNetWorkingCapital,
  calculateChangeInNWC,
  getFinancialLineItems,
);

export { workingCapProjectionsManager };
