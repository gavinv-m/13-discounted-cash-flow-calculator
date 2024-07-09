import { cashFlowStatementDataManager } from '../../../data-centre/refined-data/cash-flow-statement';
import { overviewDataManager } from '../../../data-centre/refined-data/overview';
import calculateExpectedGrowthRate from '../../utils/calculate-growth-rate';

class GrowthRateManager {
  growthRates = {};

  constructor(
    cashFlowStatementDataManager,
    overviewDataManager,
    calculateExpectedGrowthRate,
  ) {
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.overviewDataManager = overviewDataManager;
    this.calculateExpectedGrowthRate = calculateExpectedGrowthRate;
  }

  calculateGrowthRate() {
    const netIncome =
      this.cashFlowStatementDataManager.sendData('netIncome').netIncome;

    const dividends =
      this.cashFlowStatementDataManager.sendData(
        'dividendPayout',
      ).dividendPayout;

    const returnOnEquity = Number(
      this.overviewDataManager.sendData('ReturnOnEquityTTM').ReturnOnEquityTTM,
    );

    this.growthRates.growthRate = this.calculateExpectedGrowthRate(
      netIncome,
      dividends,
      returnOnEquity,
    );
  }
}

const growthRateManager = new GrowthRateManager(
  cashFlowStatementDataManager,
  overviewDataManager,
  calculateExpectedGrowthRate,
);

// Exports to discount-rate-manager.js
export { growthRateManager };
