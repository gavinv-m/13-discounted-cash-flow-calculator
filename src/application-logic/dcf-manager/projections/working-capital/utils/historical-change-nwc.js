export default function calculateHistoricalChangeInNWC(historicalNWC) {
  let yearsLatestToOldest = [];
  for (let year in historicalNWC) {
    yearsLatestToOldest.push(Number(year));
  }

  yearsLatestToOldest = yearsLatestToOldest.sort((yearOne, yearTwo) => {
    return yearOne > yearTwo ? -1 : 1;
  });

  const changesInNWC = {};

  yearsLatestToOldest.forEach((year) => {
    const priorYearAmount = historicalNWC[year - 1];
    const currentAmt = historicalNWC[year];
    if (priorYearAmount === undefined) {
      return; // Skip iteration
    }

    const change = currentAmt - priorYearAmount;
    changesInNWC[year] = change;
  });

  return changesInNWC;
}
