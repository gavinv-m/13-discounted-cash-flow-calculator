import { cashFlowStatementDataManager } from '../../../data-centre/refined-data/cash-flow-statement';
import { overviewDataManager } from '../../../data-centre/refined-data/overview';
import calculateExpectedGrowthRate from '../../utils/calculate-growth-rate';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class GrowthRateManager {
  growthRates = {};

  constructor(
    cashFlowStatementDataManager,
    overviewDataManager,
    calculateExpectedGrowthRate,
    getFinancialLineItems,
  ) {
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.overviewDataManager = overviewDataManager;
    this.calculateExpectedGrowthRate = calculateExpectedGrowthRate;
    this.getGrowthRate = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getGrowthRate(args, this.growthRates);
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
  getFinancialLineItems,
);

// Exports to discount-rate-manager.js
export { growthRateManager };
