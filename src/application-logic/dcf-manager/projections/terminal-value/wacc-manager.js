import { overviewDataManager } from '../../../data-centre/refined-data/overview';
import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import { customInputManager } from '../../../data-centre/custom-inputs/custom-input-manager';
import calculateEquityCost from '../../utils/calculate-equity-cost';
import calculateDebtCost from '../../utils/calculate-debt-cost';
import calculateWeightedCapital from '../../utils/calculate-cost-of-capital';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class WaccManager {
  marketRates = {
    riskFreeRate: 0.035,
    marketReturn: 0.1,
  };

  constructor(
    overviewDataManager,
    balanceSheetDataManager,
    incomeStatementDataManager,
    customInputManager,
    calculateEquityCost,
    calculateDebtCost,
    calculateWeightedCapital,
    getFinancialLineItems,
  ) {
    this.overviewDataManager = overviewDataManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.customInputManager = customInputManager;
    this.calculateEquityCost = calculateEquityCost;
    this.calculateDebtCost = calculateDebtCost;
    this.calculateCapitalCost = calculateWeightedCapital;
    this.getRates = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getRates(args, this.marketRates);
  }

  // Main method:
  calculateCostOfCapital() {
    this.calculateCostOfEquity();
    this.calculateCostOfDebt();
    this.calculateWACC();
  }

  calculateCostOfEquity() {
    const beta = Number(this.overviewDataManager.sendData('Beta').Beta);

    this.marketRates.costOfEquity = this.calculateEquityCost(
      this.marketRates.riskFreeRate,
      this.marketRates.marketReturn,
      beta,
    );
  }

  calculateCostOfDebt() {
    const totalDebt =
      this.balanceSheetDataManager.sendData('longTermDebt').longTermDebt;

    const interestExpense =
      this.incomeStatementDataManager.sendData(
        'interestExpense',
      ).interestExpense;

    this.marketRates.costOfDebt = this.calculateDebtCost(
      totalDebt,
      interestExpense,
    );
  }

  calculateWACC() {
    const totalDebt =
      this.balanceSheetDataManager.sendData('longTermDebt').longTermDebt;

    const marketCap = Number(
      this.overviewDataManager.sendData('MarketCapitalization')
        .MarketCapitalization,
    );

    const taxRate = this.customInputManager.sendData('taxRate').taxRate / 100;
    this.marketRates.wacc = this.calculateCapitalCost(
      totalDebt,
      marketCap,
      this.marketRates.costOfDebt,
      this.marketRates.costOfEquity,
      taxRate,
    );
  }
}

const waccManager = new WaccManager(
  overviewDataManager,
  balanceSheetDataManager,
  incomeStatementDataManager,
  customInputManager,
  calculateEquityCost,
  calculateDebtCost,
  calculateWeightedCapital,
  getFinancialLineItems,
);

// Exports to discount-rate-manager.js
export { waccManager };
