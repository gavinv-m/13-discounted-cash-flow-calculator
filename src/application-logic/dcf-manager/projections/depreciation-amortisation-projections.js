import { capexProjectionsManager } from './capex-projections';
import { cashFlowStatementDataManager } from '../../data-centre/refined-data/cash-flow-statement';
import projectDepreciationAmortisation from '../utils/project-depreciation';
import getFinancialLineItems from '../../data-centre/utils/financial-data-utils';

class DepreciationAmortizationManager {
  projectedDepreciationAmortisation = null;

  constructor(
    capexProjectionsManager,
    cashFlowStatementDataManager,
    getFinancialLineItems,
  ) {
    this.capexProjectionsManager = capexProjectionsManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
    this.getDepreciationAmortisation = getFinancialLineItems.bind(this);
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

    this.projectedDepreciationAmortisation = projectDepreciationAmortisation(
      historicalCapex,
      projectedCapex,
    );
  }
}

const depreciationAmortisationProjectionsManager =
  new DepreciationAmortizationManager(
    capexProjectionsManager,
    cashFlowStatementDataManager,
    getFinancialLineItems,
  );

// Exports to dcf-manager.js and ebitda calculator
export { depreciationAmortisationProjectionsManager };
