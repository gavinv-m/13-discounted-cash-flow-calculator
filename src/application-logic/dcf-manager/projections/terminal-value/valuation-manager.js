import { fcfManager } from './fcf-manager';
import { terminalValueCalculator } from './terminal-value-calculator';
import { projectionYears } from '../../projection-years-manager';
import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class ValuationManager {
  projections = {};

  constructor(
    fcfManager,
    terminalValueCalculator,
    projectionYears,
    balanceSheetDataManager,
    getFinancialLineItems,
  ) {
    this.fcfManager = fcfManager;
    this.terminalValueCalculator = terminalValueCalculator;
    this.projectionYears = projectionYears;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.sendValuations = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.sendValuations(args, this.projections);
  }

  calculateEnterpriseValue() {
    let presentFCFs = this.fcfManager.sendData('pvCashFlows').pvCashFlows;
    presentFCFs = Object.values(presentFCFs);

    const sumOfpresentFCFs = presentFCFs.reduce(
      (sum, currentAmount) => sum + currentAmount,
      0,
    );
    const presentTerminalValue = this.terminalValueCalculator.sendData(
      'presentTerminalValue',
    ).presentTerminalValue;

    this.projections.enterpriseValue = sumOfpresentFCFs + presentTerminalValue;
  }

  calculateEquityValue() {
    const priorFinYear = this.projectionYears.startingProjectionYear - 1;

    let cashAndMarketableSecurities = this.balanceSheetDataManager.sendData(
      'cashAndCashEquivalentsAtCarryingValue',
    ).cashAndCashEquivalentsAtCarryingValue;
    cashAndMarketableSecurities = cashAndMarketableSecurities[priorFinYear];

    let totalDebt = this.balanceSheetDataManager.sendData(
      'shortLongTermDebtTotal',
    ).shortLongTermDebtTotal;
    totalDebt = totalDebt[priorFinYear];

    this.projections.equityValue =
      this.projections.enterpriseValue +
      cashAndMarketableSecurities -
      totalDebt;
  }

  calculateFairPrice() {
    const priorFinYear = this.projectionYears.startingProjectionYear - 1;

    let sharesOutstanding = this.balanceSheetDataManager.sendData(
      'commonStockSharesOutstanding',
    ).commonStockSharesOutstanding;
    sharesOutstanding = sharesOutstanding[priorFinYear];

    this.projections.fairPrice =
      this.projections.equityValue / sharesOutstanding;
  }
}

const valuationManager = new ValuationManager(
  fcfManager,
  terminalValueCalculator,
  projectionYears,
  balanceSheetDataManager,
  getFinancialLineItems,
);

// Exports to terminal-value-manager.js
export { valuationManager };
