import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';

/**
 * All Exports to display-capex projections
 * Main exports sorted alphabetically
 */
export function createBlankRow() {
  return createElement('tr', { classList: ['blank-row'] });
}

export function createBlankData() {
  return createElement('td', { classList: ['blank-data'] });
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableRow = createElement('tr');
  const roundedToHeading = createElement('td', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
  });
  const projectionsHeading = createElement('td', { text: 'Projections' });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(tableRow, roundedToHeading, projectionsHeading);
  tableHead.appendChild(tableRow);
  tableHead.appendChild(createBlankRow());

  return tableHead;
}
