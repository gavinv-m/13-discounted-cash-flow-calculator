import { capexProjectionsManager } from './capex-projections';
import { cashFlowStatementDataManager } from '../../data-centre/refined-data/cash-flow-statement';
import projectDepreciationAmortisation from '../utils/project-depreciation';

class DepreciationAmortizationManager {
  projectedDepreciationAmortisation = null;

  constructor(capexProjectionsManager, cashFlowStatementDataManager) {
    this.capexProjectionsManager = capexProjectionsManager;
    this.cashFlowStatementDataManager = cashFlowStatementDataManager;
  }

  projectDepreciationAmortisation() {
    const historicalCapex = this.cashFlowStatementDataManager.sendData(
      'capitalExpenditures',
    ).capitalExpenditures;
    const projectedCapex = this.capexProjectionsManager.projectedCapex;

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
  );

// Exports to dcf-manager.js
export { depreciationAmortisationProjectionsManager };
