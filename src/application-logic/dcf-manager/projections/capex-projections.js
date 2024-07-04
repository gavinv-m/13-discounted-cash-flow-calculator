import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';
import { cashFlowStatementDataManager } from '../../data-centre/refined-data/cash-flow-statement';
import { revenueAndExpenses } from './revenue-and-expenses-projections';
import projectExpenses from '../utils/project-expenses';

class CapexManager {
  constructor(
    incomeStatementDataManager,
    revenueAndExpensesProjections,
    cashFlowStatementDataManager,
  ) {
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.revenueAndExpensesProjections = revenueAndExpensesProjections;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
  }

  calculateCapexProjections() {
    const capitalExpenditures = this.cashFlowStatementDataManager.sendData(
      'capitalExpenditures',
    );

    // Send prior year revenue object with years and amounts to projectExpenses
    const revenueLineItemDescription = 'totalRevenue';
    let priorRevenues = this.incomeStatementDataManager.sendData(
      revenueLineItemDescription,
    );
    priorRevenues = priorRevenues[revenueLineItemDescription];

    // TODO: Getter method in revenue-and-expenses projections, see if we cant use getFinancialLineItems

    // TODO: Send capitalExpenditures, priorRevenues and projectedRevenues to projectExpenses
  }
}

const capexProjectionsManager = new CapexManager(
  incomeStatementDataManager,
  revenueAndExpenses,
  cashFlowStatementDataManager,
);

export { capexProjectionsManager };
