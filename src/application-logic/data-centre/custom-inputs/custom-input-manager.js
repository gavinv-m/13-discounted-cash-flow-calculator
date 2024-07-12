class CustomInputManager {
  customInputs = {
    revenueGrowthRate: null,
  };

  constructor() {}

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

const customInputManager = new CustomInputManager();
window.customInputManager = customInputManager;

// Exports to revenue-and-expenses-projections
export { customInputManager };
