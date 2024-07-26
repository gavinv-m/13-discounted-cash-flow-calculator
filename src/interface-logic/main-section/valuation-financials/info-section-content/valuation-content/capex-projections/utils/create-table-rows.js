import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import { capexProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/capex-projections';
import roundToMillions from '../../../utils/round-to-millions';

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

export function createCapexRow() {
  const tableRow = createElement('tr');
  const nameCell = createElement('td', { text: 'CAPEX' });
  tableRow.appendChild(nameCell);

  const yearsAmounts = capexProjectionsManager.sendData(
    'capitalExpenditures',
  ).capitalExpenditures;

  const projectionPeriod = projectionYears.projectionYears;
  projectionPeriod.forEach((year) => {
    const amount = roundToMillions(yearsAmounts[year]);
    const cell = createElement('td', { text: amount });
    tableRow.appendChild(cell);
  });

  return tableRow;
}

export function createCapexPercentageOfRevenue() {
  const tableRow = createElement('tr');
  let percentage = capexProjectionsManager.sendData(
    'capexPercentageOfRevenue',
  ).capexPercentageOfRevenue;
  percentage = percentage.toFixed(2);
  const nameCell = createElement('td', { text: `% of Revenue: ${percentage}` });
  nameCell.setAttribute('colspan', '1');

  return tableRow.appendChild(nameCell);
}

export function createTableBody() {
  return createElement('tbody');
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
