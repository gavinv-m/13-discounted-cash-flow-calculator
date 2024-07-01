import { projectionYears } from '../projection-years-manager';

export default function projectRevenue(revenueByYear) {
  /**
   * Data is ordered from oldest to latest
   * Must calculate in reverse, latest to oldest
   * For the averages
   */
  const revenueAmounts = Object.values(revenueByYear); // Oldest to latest
  const revenueAmountsLength = revenueAmounts.length;
  const reversedRevenueAmounts = revenueAmounts.reverse(); // Latest to oldest
  const growthRates = {};

  let threeYearAverage = null;
  let fiveYearAverage = null;
  let tenYearAverage = null;

  // Calculate average growth rates
  reversedRevenueAmounts.reduce((sumGrowthRates, currentAmt, index, array) => {
    if (index <= revenueAmountsLength - 2) {
      let priorYearAmount = Number(array[index + 1]);
      currentAmt = Number(currentAmt);

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
  const terminalStartingYear = endingYear + 1;
  const projections = {};

  let currentYear = startingYear;

  while (currentYear < terminalStartingYear) {
    let priorYearAmount = Number(revenueAmounts[revenueAmounts.length - 1]);
    let nextYearProjected = priorYearAmount * (1 + chosenGrowthRate);

    revenueAmounts.push(nextYearProjected);
    projections[currentYear] = nextYearProjected;
    currentYear += 1;
  }

  return { projections, growthRates };
}
