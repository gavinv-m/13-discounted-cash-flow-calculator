import { incomeStatementDataManager } from '../../data-centre/refined-data/income-statement';
import { customInputManager } from '../../data-centre/custom-inputs/custom-input-manager';
import projectRevenue from '../utils/project-revenue';
import projectExpenses from '../utils/project-expenses';
import calculateProfitBeforeTax from '../utils/profit-before-tax';
import calculateTaxExpense from '../utils/calculate-tax';
import calculateNetProfit from '../utils/calculate-net-profit';
import getFinancialLineItems from '../../data-centre/utils/financial-data-utils';

class RevenueAndExpensesProjections {
  projections = {};
  revenueGrowthRates = null;
  expensePercentagesOfRevenue = null;

  constructor(incomeStatementDataManager, customInputManager) {
    this.incomeStatementDataManager = incomeStatementDataManager;
    this.customInputManager = customInputManager;
    this.getRevenueAndExpensesProjections = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.getRevenueAndExpensesProjections(args, this.projections);
  }

  // Main method that projects revenue, expenses and calculates tax
  projectRevenueAndExpenses() {
    this.projectRevenue();
    this.projectExpensesAndOtherIncome();
    this.calculateProfitBeforeTax();
    this.calculateTax();
    this.calculateNetProfit();
  }

  projectRevenue() {
    // Send object with years and amounts to projectRevenue
    const revenueLineItemDescription = 'totalRevenue';

    let revenueByYear = this.incomeStatementDataManager.sendData(
      revenueLineItemDescription,
    );
    revenueByYear = revenueByYear[revenueLineItemDescription];

    // Search for user's revenue growth rate
    const customRevenueGrowthRate =
      this.customInputManager.sendData('revenueGrowthRate').revenueGrowthRate;

    const data = projectRevenue(revenueByYear, customRevenueGrowthRate);
    this.projections.revenueProjections = data.projections;
    this.revenueGrowthRates = data.growthRates;
  }

  projectExpensesAndOtherIncome() {
    const expenses = this.incomeStatementDataManager.sendData(
      'costOfRevenue',
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
    this.projections.profitBeforeTax = calculateProfitBeforeTax(
      this.projections,
    );
  }

  calculateTax() {
    const customTaxRate = this.customInputManager.sendData('taxRate').taxRate;

    this.projections.taxExpense = calculateTaxExpense(
      this.projections.profitBeforeTax,
      customTaxRate,
    );
  }

  calculateNetProfit() {
    this.projections.netProfit = calculateNetProfit(
      this.projections.profitBeforeTax,
      this.projections.taxExpense,
    );
  }
}

const revenueAndExpenses = new RevenueAndExpensesProjections(
  incomeStatementDataManager,
  customInputManager,
);

// window.revenueAndExpenses = revenueAndExpenses;

// Exports to dcf-manager.js
export { revenueAndExpenses };
