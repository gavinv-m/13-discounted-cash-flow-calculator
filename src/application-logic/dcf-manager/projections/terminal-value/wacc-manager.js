import { overviewDataManager } from '../../../data-centre/refined-data/overview';
import { balanceSheetDataManager } from '../../../data-centre/refined-data/balance-sheet';
import { incomeStatementDataManager } from '../../../data-centre/refined-data/income-statement';
import calculateEquityCost from '../../utils/calculate-equity-cost';
import calculateDebtCost from '../../utils/calculate-debt-cost';

class WaccManager {
  marketRates = {
    riskFreeRate: 0.035,
    marketReturn: 0.1,
  };

  constructor(
    overviewDataManager,
    balanceSheetDataManager,
    incomeStatementDataManager,
    calculateEquityCost,
    calculateDebtCost,
  ) {
    this.overviewDataManager = overviewDataManager;
    this.balanceSheetDataManager = balanceSheetDataManager;
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.calculateEquityCost = calculateEquityCost;
    this.calculateDebtCost = calculateDebtCost;
  }

  // Main method:
  calculateCostOfCapital() {
    this.calculateCostOfEquity();
    this.calculateCostOfDebt();
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
}

const waccManager = new WaccManager(
  overviewDataManager,
  balanceSheetDataManager,
  incomeStatementDataManager,
  calculateEquityCost,
  calculateDebtCost,
);

// Exports to discount-rate-manager.js
export { waccManager };
