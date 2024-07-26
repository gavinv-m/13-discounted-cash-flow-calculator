import { capexProjectionsManager } from './capex-projections';
import { cashFlowStatementDataManager } from '../../data-centre/refined-data/cash-flow-statement';
import projectDepreciationAmortisation from '../utils/project-depreciation';
import getFinancialLineItems from '../../data-centre/utils/financial-data-utils';
import mapCapexToDepreciationAmortization from '../utils/capex-year-span';

class DepreciationAmortizationManager {
  projectedDepreciationAmortisation = {};

  constructor(
    capexProjectionsManager,
    cashFlowStatementDataManager,
    getFinancialLineItems,
    mapCapexToDepreciationAmortization,
  ) {
    this.capexProjectionsManager = capexProjectionsManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.getDepreciationAmortisation = getFinancialLineItems.bind(this);
    this.mapCapexToDepreciationAmortization =
      mapCapexToDepreciationAmortization;
  }

  sendData(...args) {
    return this.getDepreciationAmortisation(
      args,
      this.projectedDepreciationAmortisation,
    );
  }

  projectDepreciationAmortisation() {
    const historicalCapex = this.cashFlowStatementDataManager.sendData(
      'capitalExpenditures',
    ).capitalExpenditures;
    const projectedCapex = this.capexProjectionsManager.sendData(
      'capitalExpenditures',
    ).capitalExpenditures;

    const data = projectDepreciationAmortisation(
      historicalCapex,
      projectedCapex,
    );

    this.projectedDepreciationAmortisation.projections = data.projections;
    this.projectedDepreciationAmortisation.totals = data.totals;

    // Map a capital expenditure to years it will be spent
    this.projectedDepreciationAmortisation.mapCapexToDepreciationAmortization =
      this.mapCapexToDepreciationAmortization(
        this.projectedDepreciationAmortisation.projections,
      );
  }
}

const depreciationAmortisationProjectionsManager =
  new DepreciationAmortizationManager(
    capexProjectionsManager,
    cashFlowStatementDataManager,
    getFinancialLineItems,
    mapCapexToDepreciationAmortization,
  );

// Exports to dcf-manager.js and ebitda calculator
export { depreciationAmortisationProjectionsManager };
