import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import { depreciationAmortisationProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/depreciation-amortisation-projections';

/**
 * All Exports to display-dep-amort.js
 * Main exports sorted alphabetically
 */
export function createBlankRow() {
  return createElement('tr', { classList: ['blank-row'] });
}

export function createBlankData() {
  return createElement('td', { classList: ['blank-data'] });
}

export function createCapexHeading() {
  const tableRow = createElement('tr');
  const cell = createElement('td', { text: 'CAPEX for the year: ' });
  return tableRow.appendChild(cell);
}

export function createDepreciationAmortRows() {
  const yearsAmounts =
    depreciationAmortisationProjectionsManager.sendData(
      'projections',
    ).projections;
  console.log(yearsAmounts);
}

export function createTableBody() {
  return createElement('tbody');
}

export function createTableHead() {
  const head = createElement('thead');
  const usefulLifeRow = createElement('tr');

  const usefulLifeHeading = createElement('th', {
    text: 'Average Useful Life',
  });

  /*
   * TODO: Getter method for number,
   * For now always refer to project-depreciation.js
   */
  const usefulLifeYears = createElement('th', { text: '5' });
  appendChildren(usefulLifeRow, usefulLifeHeading, usefulLifeYears);
  head.appendChild(usefulLifeRow, createBlankRow());

  const projectionsHeadingRow = createElement('tr');
  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
  });
  const projectionsHeading = createElement('td', { text: 'Projections' });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(projectionsHeadingRow, roundedToHeading, projectionsHeading);
  head.appendChild(projectionsHeadingRow, createBlankRow());

  return head;
}

export function createYearsRow() {
  const tableRow = createElement('tr', { classList: ['years'] });
  const blankOne = createBlankData();

  tableRow.appendChild(blankOne);

  const projectionPeriod = projectionYears.projectionYears;
  projectionPeriod.forEach((year) => {
    const cell = createElement('td', { text: year });
    tableRow.appendChild(cell);
  });

  return tableRow;
}
