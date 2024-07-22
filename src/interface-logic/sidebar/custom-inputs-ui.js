import { activeMetrics } from '../../application-logic/data-centre/active-metrics/active-metrics';
import createCustomInputs from './utils/create-custom-inputs';

class CustomInputsUI {
  constructor(activeMetrics, createCustomInputs) {
    this.activeMetrics = activeMetrics;
    this.createCustomInputs = createCustomInputs;
  }

  populateCustomInputs() {
    const currentMetrics = this.activeMetrics.getMetrics();
  }
}

const customInputsUI = new CustomInputsUI(activeMetrics, createCustomInputs);

// Exports to sidebar-manager.js
export { customInputsUI };
