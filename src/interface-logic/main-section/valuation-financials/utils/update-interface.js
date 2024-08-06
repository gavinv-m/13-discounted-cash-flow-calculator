import createValuationStatement from '../info-section-content/valuation-content/rev-and-exp-projections/utils/valuation-statement';
import { projectionVisibilityChecker } from '../info-section-content/valuation-content/utils/check-active-projection';
import { loadRequestedContentManager } from '../info-section-content/valuation-content/load-requested-content';

const valuationStatement = function updateValuationStatement() {
  const paragraphElement = document.getElementById('valuation-status');
  const updatedValuation = createValuationStatement().innerHTML;
  paragraphElement.innerHTML = updatedValuation;
};

const projection = function updateProjectionInView() {
  const activeProjection = projectionVisibilityChecker.getActiveProjection();
  const valuationContentBox = document.getElementById('valuation-content');

  loadRequestedContentManager.loadContent(
    activeProjection,
    valuationContentBox,
  );
};

// Exports to create-custom-inputs
export default function updateInterface() {
  const valFinParentContainer = document.getElementById('val-fin-info');
  const financialContent = document.getElementById('financial-content');

  if (valFinParentContainer.contains(financialContent) === true) {
    return;
  }

  // Else update open projection
  valuationStatement();
  projection();
}
