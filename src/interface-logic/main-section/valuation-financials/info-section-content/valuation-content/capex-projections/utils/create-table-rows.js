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
const yearsRow = function createYearsRow() {
  const tableRow = createElement('tr', { classList: ['years'] });
  const blankOne = createBlankData();

  tableRow.appendChild(blankOne);

  const projectionPeriod = projectionYears.projectionYears;
  projectionPeriod.forEach((year) => {
    const cell = createElement('th', { text: year });
    tableRow.appendChild(cell);
  });

  return tableRow;
};

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
  const nameCell = createElement('td', {
    innerHTML: `<span class='rev-percent'>% of Revenue:</span> ${percentage}`,
  });
  nameCell.setAttribute('colspan', '1');

  return tableRow.appendChild(nameCell);
}

export function createTableBody() {
  return createElement('tbody');
}

export function createTableHead() {
  const tableHead = createElement('thead');

  const tableRow = createElement('tr');
  const roundedToHeading = createElement('th', {
    innerHTML: '<span><em>(USD in millions)</em></span>',
    classList: ['rounded-heading'],
  });
  const projectionsHeading = createElement('th', {
    text: 'Projections',
    classList: ['projections-heading'],
  });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(tableRow, roundedToHeading, projectionsHeading);
  tableHead.appendChild(tableRow);
  tableHead.appendChild(createBlankRow());
  tableHead.appendChild(yearsRow());

  return tableHead;
}
