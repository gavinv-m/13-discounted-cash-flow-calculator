import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';
import projectRevenue from '../utils/project-revenue';
import projectExpenses from '../utils/project-expenses';
import calculateProfitBeforeTax from '../utils/profit-before-tax';

class RevenueAndExpensesProjections {
  projections = {};
  revenueGrowthRates = null;
  expensePercentagesOfRevenue = null;

  constructor(incomeStatementDataManager) {
    this.incomeStatementDataManager = incomeStatementDataManager;
  }

  // Main method that projects revenue, expenses and calculates tax
  projectRevenueAndExpenses() {
    this.projectRevenue();
    this.projectExpensesAndOtherIncome();
    this.calculateProfitBeforeTax();
  }

  projectRevenue() {
    // Send object with years and amounts to projectRevenue
    const revenueLineItemDescription = 'totalRevenue';

    let revenueByYear = this.incomeStatementDataManager.sendData(
      revenueLineItemDescription,
    );
    revenueByYear = revenueByYear[revenueLineItemDescription];

    const data = projectRevenue(revenueByYear);
    this.projections.revenueProjections = data.projections;
    this.revenueGrowthRates = data.growthRates;
  }

  projectExpensesAndOtherIncome() {
    const expenses = this.incomeStatementDataManager.sendData(
      'costofGoodsAndServicesSold',
      'sellingGeneralAndAdministrative',
      'researchAndDevelopment',
      'otherNonOperatingIncome',
      'interestIncome',
      'interestExpense',
    );

    // Send prior year revenue object with years and amounts to projectExpenses
    const revenueLineItemDescription = 'totalRevenue';
    let priorRevenues = this.incomeStatementDataManager.sendData(
      revenueLineItemDescription,
    );
    priorRevenues = priorRevenues[revenueLineItemDescription];

    // Send projected revenues
    const projectedRevenues = this.projections.revenueProjections;

    const projectedExpenses = projectExpenses(
      expenses,
      priorRevenues,
      projectedRevenues,
    );

    this.expensePercentagesOfRevenue = projectedExpenses.expensePercentages;

    // Add each projected expense to projections property/class field above
    for (let projectedExpense in projectedExpenses.projectedExpenses) {
      this.projections[projectedExpense] =
        projectedExpenses.projectedExpenses[projectedExpense];
    }
  }

  calculateProfitBeforeTax() {
    const profitBeforeTax = calculateProfitBeforeTax(this.projections);
    this.projections.profitBeforeTax = profitBeforeTax;
  }
}

const revenueAndExpenses = new RevenueAndExpensesProjections(
  incomeStatementDataManager,
);

// Exports to dcf-manager.js
export { revenueAndExpenses };
