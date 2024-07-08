import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';
import { cashFlowStatementDataManager } from '../../data-centre/refined-data/cash-flow-statement';
import { revenueAndExpenses } from './revenue-and-expenses-projections';
import projectExpenses from '../utils/project-expenses';
import getFinancialLineItems from '../../data-centre/utils/financial-data-utils';

class CapexManager {
  projectedCapex = {};

  constructor(
    incomeStatementDataManager,
    revenueAndExpensesProjections,
    cashFlowStatementDataManager,
    getFinancialLineItems,
  ) {
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpensesProjections = revenueAndExpensesProjections;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.getProjectedCapexAndExpensePercentages =
      getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getProjectedCapexAndExpensePercentages(
      args,
      this.projectedCapex,
    );
  }

  calculateCapexProjections() {
    const capitalExpenditures = this.cashFlowStatementDataManager.sendData(
      'capitalExpenditures',
    );

    // Send prior year revenue object with years and amounts to projectExpenses
    const priorRevenues =
      this.incomeStatementDataManager.sendData('totalRevenue').totalRevenue;

    // Send projectedRevenues years and amounts object
    let projectedRevenues =
      this.revenueAndExpensesProjections.sendData(
        'revenueProjections',
      ).revenueProjections;

    const projectedCapitalExpenditure = projectExpenses(
      capitalExpenditures,
      priorRevenues,
      projectedRevenues,
    );

    this.projectedCapex = projectedCapitalExpenditure.projectedExpenses;
    this.projectedCapex.capexPercentageOfRevenue =
      projectedCapitalExpenditure.expensePercentages.capitalExpenditures;
  }
}

const capexProjectionsManager = new CapexManager(
  incomeStatementDataManager,
  revenueAndExpenses,
  cashFlowStatementDataManager,
  getFinancialLineItems,
);

export { capexProjectionsManager };
