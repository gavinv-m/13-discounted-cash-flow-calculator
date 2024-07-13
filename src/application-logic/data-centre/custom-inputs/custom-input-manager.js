import getFinancialLineItems from '../utils/financial-data-utils';
class CustomInputManager {
  customInputs = {
    revenueGrowthRate: null,
  };

  constructor(getFinancialLineItems) {
    this.sendCustomInput = getFinancialLineItems.bind(this);
  }

  sendData(...args) {
    return this.sendCustomInput(args, this.customInputs);
  }

  setCustomInput(propertyName, value) {
    if (isNaN(value) === true) {
      console.error('Value must be a number');
    } else if (this.customInputs.hasOwnProperty(propertyName) === false) {
      console.error(`Property '${propertyName}' does not exist.`);
    } else {
      this.customInputs[propertyName] = value;
    }
  }
}

const customInputManager = new CustomInputManager(getFinancialLineItems);
window.customInputManager = customInputManager;

// Exports to revenue-and-expenses-projections
export { customInputManager };
