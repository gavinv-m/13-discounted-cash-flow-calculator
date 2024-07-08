// Exports to // Exports to working-capital-manager.js
export default function calculateChangeInNWC(historicalNWC, projectedNWC) {
  const changesInNWC = {};

  for (let year in projectedNWC) {
    changesInNWC[year] = projectedNWC[year - 1]
      ? projectedNWC[year] - projectedNWC[year - 1]
      : projectedNWC[year] - historicalNWC[year - 1];
  }

  return changesInNWC;
}
