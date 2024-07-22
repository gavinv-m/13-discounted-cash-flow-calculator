import createCustomInputs from './utils/create-custom-inputs';

class CustomInputsUI {
  constructor(createCustomInputs) {
    this.createCustomInputs = createCustomInputs;
  }

  populateCustomInputs() {
    this.createCustomInputs();
  }
}

const customInputsUI = new CustomInputsUI(createCustomInputs);

// Exports to sidebar-manager.js
export { customInputsUI };
