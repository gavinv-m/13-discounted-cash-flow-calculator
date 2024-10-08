import {
  appendChildren,
  createElement,
} from '../../../../../../utils/element-utils';
import { projectionYears } from '../../../../../../../application-logic/dcf-manager/projection-years-manager';
import { depreciationAmortisationProjectionsManager } from '../../../../../../../application-logic/dcf-manager/projections/depreciation-amortisation-projections';
import roundToMillions from '../../../utils/round-to-millions';

/**
 * All Exports to display-dep-amort.js
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

export function createTableFooter() {
  return createElement('tfoot');
}

export function createCapexHeading() {
  const tableRow = createElement('tr');
  const cell = createElement('td', { text: 'CAPEX for the year: ' });
  return tableRow.appendChild(cell);
}

export function createDepreciationAmortRows(tableBody) {
  const capexYearsMapped = depreciationAmortisationProjectionsManager.sendData(
    'mapCapexToDepreciationAmortization',
  ).mapCapexToDepreciationAmortization;
  const startingProjectionYear = projectionYears.startingProjectionYear;

  for (let year in capexYearsMapped) {
    const tableRow = createElement('tr');
    const capexYearCell = createElement('td', { text: year });
    tableRow.appendChild(capexYearCell);

    /**
     * First capex year that requires the first table cell be empty is:
     * startingProjectionYear + 1
     * Check if capexYear > startingProjectionYear
     */
    const capexYear = Number(year);

    if (capexYear > startingProjectionYear) {
      const difference = capexYear - startingProjectionYear;

      let i = 0;
      while (i < difference) {
        tableRow.appendChild(createBlankData());
        i++;
      }
    }

    /**
     * Map capex years to depreciation
     * Add blank cells to the right of final depreciation
     */
    const SUM_FINAL_VALUE = 4;
    let sum = 0;

    for (let depreciationYear in capexYearsMapped[year]) {
      let amount = capexYearsMapped[year][depreciationYear];
      amount = roundToMillions(amount);
      const cell = createElement('td', { text: amount });
      tableRow.appendChild(cell);

      sum += 1;
    }

    while (sum <= SUM_FINAL_VALUE) {
      tableRow.appendChild(createBlankData());
      sum += 1;
    }

    tableBody.appendChild(tableRow);
  }

  return;
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
    classList: ['rounded-heading'],
  });
  const projectionsHeading = createElement('th', {
    text: 'Projections',
    classList: ['projections-heading'],
  });
  projectionsHeading.setAttribute('colspan', '5');

  appendChildren(projectionsHeadingRow, roundedToHeading, projectionsHeading);
  head.appendChild(projectionsHeadingRow, createBlankRow());
  head.appendChild(yearsRow());

  return head;
}

export function createTotals() {
  const tableRow = createElement('tr');

  const nameCell = createElement('td', {
    text: 'Total Depreciation & Amortisation',
  });
  tableRow.appendChild(nameCell);

  const totals =
    depreciationAmortisationProjectionsManager.sendData('totals').totals;

  for (let year in totals) {
    const amount = roundToMillions(totals[year]);
    const cell = createElement('td', { text: amount });
    tableRow.appendChild(cell);
  }

  return tableRow;
}
