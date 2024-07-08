import { accountsReceivableManager } from './accounts-receivable-projections';
import { accountsPayableManager } from './accounts-payable-projections';
import { inventoryManager } from './inventory-projections';
import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import calculateNetWorkingCapital from '../../utils/calc-net-working-cap';
import calculateChangeInNWC from '../../utils/change-in-nwc';

class WorkingCapitalManager {
  projections = {};
  historicalNetWorkingCapital = null;
  projectedNetWorkingCapital = null;
  changesInNetWorkingCapital = null;

  constructor(
    accountsReceivableManager,
    accountsPayableManager,
    inventoryManager,
    balanceSheetDataManager,
    calculateNetWorkingCapital,
    calculateChangeInNWC,
  ) {
    this.accountsReceivableManager = accountsReceivableManager;
    this.accountsPayableManager = accountsPayableManager;
    this.inventoryManager = inventoryManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.calculateNetWorkingCapital = calculateNetWorkingCapital;
    this.calculateChangeInNWC = calculateChangeInNWC;
  }

  projectWorkingCapital() {
    this.projections.currentNetReceivables =
      this.accountsReceivableManager.projectAccountsReceivable();

    this.projections.currentAccountsPayable =
      this.accountsPayableManager.projectAccountsPayable();

    this.projections.inventory = this.inventoryManager.projectInventory();

    // Calculate net working capital, and changes in net working capital
    this.calculateNetWorkingCap();
    this.changesInNetWorkingCapital = this.calculateChangeInNWC(
      this.historicalNetWorkingCapital,
      this.projectedNetWorkingCapital,
    );
  }

  calculateNetWorkingCap() {
    // Calculate historical net working capital
    const historicalValues = this.balanceSheetDataManager.sendData(
      'currentNetReceivables',
      'currentAccountsPayable',
      'inventory',
    );
    this.historicalNetWorkingCapital =
      this.calculateNetWorkingCapital(historicalValues);

    // Calculate projected net working capital
    this.projectedNetWorkingCapital = this.calculateNetWorkingCapital(
      this.projections,
    );
  }
}

const workingCapProjectionsManager = new WorkingCapitalManager(
  accountsReceivableManager,
  accountsPayableManager,
  inventoryManager,
  balanceSheetDataManager,
  calculateNetWorkingCapital,
  calculateChangeInNWC,
);

export { workingCapProjectionsManager };
