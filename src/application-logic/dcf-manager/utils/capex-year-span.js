// Exports to depreciation-amortisation-projection.js
export default function mapCapexToDepreciationAmortization(projections) {
  const yearSpan = {};

  for (let year in projections) {
    for (let depreciationYear in projections[year]) {
      yearSpan[depreciationYear] = yearSpan[depreciationYear] || {};
      const amount = projections[year][depreciationYear];
      yearSpan[depreciationYear][year] = amount;
    }
  }

  return yearSpan;
}
