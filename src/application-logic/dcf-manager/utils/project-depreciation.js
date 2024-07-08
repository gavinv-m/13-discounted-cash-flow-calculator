import { projectionYears } from '../projection-years-manager';

const calculateTotals = function calculateDepreciationAmortisationTotals(
  projections,
) {
  const totals = {};

  for (let year in projections) {
    totals[year] = 0;

    for (let pastYear in projections[year]) {
      totals[year] += projections[year][pastYear];
    }
  }
  return totals;
};

// Exports to depreciation-amortisation-projections.js
export default function projectDepreciationAmortisation(
  historicalCapex,
  projectedCapex,
) {
  const avgUsefulLife = 5;
  const projections = {};
  const projectionPeriod = projectionYears.projectionYears;

  projectionPeriod.forEach((year) => {
    projections[year] = {};

    for (let yearsAgo = 4; yearsAgo >= 0; yearsAgo--) {
      const yearUnderConsideration = year - yearsAgo;
      const capexForYearUnderConsideration =
        historicalCapex[yearUnderConsideration] ||
        projectedCapex[yearUnderConsideration];

      // If not enough data available
      let depreciationAmortisation = 0;
      if (capexForYearUnderConsideration !== undefined) {
        depreciationAmortisation =
          capexForYearUnderConsideration / avgUsefulLife;
      }

      projections[year][yearUnderConsideration] = depreciationAmortisation;
    }
  });

  const totals = calculateTotals(projections);

  return { projections, totals };
}
