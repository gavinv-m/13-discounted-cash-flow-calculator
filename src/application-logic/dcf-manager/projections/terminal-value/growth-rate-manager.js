import { cashFlowStatementDataManager } from '../../../data-centre/refined-data/cash-flow-statement';
import { overviewDataManager } from '../../../data-centre/refined-data/overview';
import { customInputManager } from '../../../data-centre/custom-inputs/custom-input-manager';
import calculateExpectedGrowthRate from '../../utils/calculate-growth-rate';
import getFinancialLineItems from '../../../data-centre/utils/financial-data-utils';

class GrowthRateManager {
  growthRates = {};

  constructor(
    cashFlowStatementDataManager,
    overviewDataManager,
    customInputManager,
    calculateExpectedGrowthRate,
    getFinancialLineItems,
  ) {
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.overviewDataManager = overviewDataManager;
    this.customInputManager = customInputManager;
    this.calculateExpectedGrowthRate = calculateExpectedGrowthRate;
    this.getGrowthRate = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getGrowthRate(args, this.growthRates);
  }

  calculateGrowthRate() {
    const customGrowthRate =
      this.customInputManager.sendData('longTermGrowthRate').longTermGrowthRate;

    if (customGrowthRate !== null) {
      this.growthRates.growthRate = customGrowthRate / 100;
      return;
    }

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
  customInputManager,
  calculateExpectedGrowthRate,
  getFinancialLineItems,
);

// Exports to discount-rate-manager.js
export { growthRateManager };
