import { projectionYears } from '../projection-years-manager';

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

  return projections;
}
