import { projectionYears } from '../projection-years-manager';

const calcRevGrowth = function calculateRevenueGrowthRates(revenueByYear) {
  /**
   * revenueByYear object is ordered from oldest to latest
   * Must calculate in reverse, latest to oldest for the averages
   */
  const revenueAmounts = Object.values(revenueByYear); // Sorted oldest to latest
  const reversedRevenueAmounts = [...revenueAmounts].reverse(); // Latest to oldest
  const yearSpan = revenueAmounts.length;
  const growthRates = {};

  // Calculate average growth rates from latest to oldest
  reversedRevenueAmounts.reduce((sumGrowthRates, currentAmt, index, array) => {
    if (index <= yearSpan - 2) {
      let priorYearAmount = array[index + 1];

      let growthRate = (currentAmt - priorYearAmount) / priorYearAmount;
      sumGrowthRates += growthRate;

      if (index === 3) {
        growthRates.threeYearAverage = sumGrowthRates / 3;
      } else if (index === 5) {
        growthRates.fiveYearAverage = sumGrowthRates / 5;
      } else if (index === 10) {
        growthRates.tenYearAverage = sumGrowthRates / 10;
      }
    }
    return sumGrowthRates;
  }, 0);

  // console.log({ growthRates });
  return growthRates;
};

// Exports to revenue-and-expenses-projections
export default function projectRevenue(revenueByYear, customRevenueGrowthRate) {
  const growthRates = calcRevGrowth(revenueByYear);
  const threeYearAverage = growthRates.threeYearAverage;
  const fiveYearAverage = growthRates.fiveYearAverage;
  const tenYearAverage = growthRates.tenYearAverage;
  const startingYear = projectionYears.startingProjectionYear;
  const endingYear = projectionYears.endingProjectionYear;
  const projections = {};
  const revenueAmounts = Object.values(revenueByYear); // Sorted oldest to latest

  const historicalGrowthRate =
    fiveYearAverage !== null && fiveYearAverage > 0
      ? fiveYearAverage
      : threeYearAverage !== null
        ? threeYearAverage
        : 0.03; // default rate

  const chosenGrowthRate =
    customRevenueGrowthRate !== null
      ? customRevenueGrowthRate / 100
      : historicalGrowthRate;

  let currentYear = startingYear;

  while (currentYear <= endingYear) {
    let priorYearAmount = revenueAmounts[revenueAmounts.length - 1];
    let nextYearProjected = priorYearAmount * (1 + chosenGrowthRate);

    revenueAmounts.push(nextYearProjected);
    projections[currentYear] = nextYearProjected;
    currentYear += 1;
  }

  return { projections, growthRates, chosenGrowthRate };
}
