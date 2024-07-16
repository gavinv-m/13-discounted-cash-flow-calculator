import getFinancialLineItems from '../utils/financial-data-utils';

class CustomInputManager {
  customInputs = {
    revenueGrowthRate: null,
    taxRate: 21,
    wacc: null,
  };

  constructor(getFinancialLineItems) {
    this.sendCustomInput = getFinancialLineItems.bind(this);
    this.dcfManager = null;
  }

  sendData(...args) {
    return this.sendCustomInput(args, this.customInputs);
  }

  // Lazy load dcf manager to restart projections
  setDcfManager(dcfManagerInstance) {
    this.dcfManager = dcfManagerInstance;
  }

  setCustomInput(propertyName, value) {
    value = Number(value);

    if (isNaN(value) === true) {
      console.error('Value must be a number');
    } else if (this.customInputs.hasOwnProperty(propertyName) === false) {
      console.error(`Property '${propertyName}' does not exist.`);
    } else {
      this.customInputs[propertyName] = value;
    }
    // Recalculate projections
    this.dcfManager.startProjections();
  }
}

const customInputManager = new CustomInputManager(getFinancialLineItems);
window.customInputManager = customInputManager;

// Exports to revenue-and-expenses-projections
export { customInputManager };
