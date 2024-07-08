import { projectionYears } from '../projection-years-manager';

// Exports to revenue-and-expenses-projections
export default function projectRevenue(revenueByYear) {
  /**
   * revenueByYear object is ordered from oldest to latest
   * Must calculate in reverse, latest to oldest for the averages
   */
  const revenueAmounts = Object.values(revenueByYear); // Sorted oldest to latest
  const reversedRevenueAmounts = [...revenueAmounts].reverse(); // Latest to oldest
  const yearSpan = revenueAmounts.length;
  const growthRates = {};

  let threeYearAverage = null;
  let fiveYearAverage = null;
  let tenYearAverage = null;

  // Calculate average growth rates from latest to oldest
  reversedRevenueAmounts.reduce((sumGrowthRates, currentAmt, index, array) => {
    if (index <= yearSpan - 2) {
      let priorYearAmount = array[index + 1];

      let growthRate = (currentAmt - priorYearAmount) / priorYearAmount;
      sumGrowthRates += growthRate;

      if (index === 3) {
        threeYearAverage = sumGrowthRates / 3;
        growthRates.threeYearAverage = Number(
          (threeYearAverage * 100).toFixed(2),
        );
      } else if (index === 5) {
        fiveYearAverage = sumGrowthRates / 5;
        growthRates.fiveYearAverage = Number(
          (fiveYearAverage * 100).toFixed(2),
        );
      } else if (index === 10) {
        tenYearAverage = sumGrowthRates / 10;
        growthRates.tenYearAverage = Number((tenYearAverage * 100).toFixed(2));
      }
    }
    return sumGrowthRates;
  }, 0);

  // Calculate projections
  const chosenGrowthRate =
    fiveYearAverage !== null && fiveYearAverage > 0
      ? fiveYearAverage
      : threeYearAverage !== null
        ? threeYearAverage
        : 0.03;

  const startingYear = projectionYears.startingProjectionYear;
  const endingYear = projectionYears.endingProjectionYear;
  const projections = {};

  let currentYear = startingYear;

  while (currentYear <= endingYear) {
    let priorYearAmount = revenueAmounts[revenueAmounts.length - 1];
    let nextYearProjected = priorYearAmount * (1 + chosenGrowthRate);

    revenueAmounts.push(nextYearProjected);
    projections[currentYear] = nextYearProjected;
    currentYear += 1;
  }

  return { projections, growthRates };
}
