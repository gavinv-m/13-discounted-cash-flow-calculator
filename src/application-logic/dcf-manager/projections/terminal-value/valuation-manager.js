import { fcfManager } from './fcf-manager';
import { terminalValueCalculator } from './terminal-value-calculator';
import { projectionYears } from '../../projection-years-manager';
import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';

class ValuationManager {
  projections = {};

  constructor(
    fcfManager,
    terminalValueCalculator,
    projectionYears,
    balanceSheetDataManager,
  ) {
    this.fcfManager = fcfManager;
    this.terminalValueCalculator = terminalValueCalculator;
    this.projectionYears = projectionYears;
    this.balanceSheetDataManager = balanceSheetDataManager;
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
);

// Exports to terminal-value-manager.js
export { valuationManager };
