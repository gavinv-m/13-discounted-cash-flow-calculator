import { createElement } from './element-utils';

// Exports to create-custom-inputs.js & create-table-rows.js for revenue and expenses projections
export function createExplainerContainer(text, explainerBoxID, element) {
  const container = createElement('div', {
    id: explainerBoxID,
    classList: ['explainer-container'],
  });
  const paragraph = createElement('p', { text: text });
  container.appendChild(paragraph);

  const customInputsContainer = document.getElementById(element);
  customInputsContainer.appendChild(container);
}

export function removeExplainerContent(explainerBox, parentElement) {
  const parent = document.getElementById(parentElement);
  const child = document.getElementById(explainerBox);
  parent.removeChild(child);
}
