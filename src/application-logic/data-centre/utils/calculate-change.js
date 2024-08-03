export default function calculateChangeYOY(financialLineItem) {
  let yearsLatestToOldest = [];
  for (let year in financialLineItem) {
    yearsLatestToOldest.push(Number(year));
  }

  yearsLatestToOldest = yearsLatestToOldest.sort((yearOne, yearTwo) => {
    return yearOne > yearTwo ? -1 : 1;
  });

  const changes = {};

  yearsLatestToOldest.forEach((year) => {
    const priorYearAmount = financialLineItem[year - 1];
    const currentAmt = financialLineItem[year];
    if (priorYearAmount === undefined) {
      return; // Skip iteration
    }

    const change = currentAmt - priorYearAmount;
    changes[year] = change;
  });

  return changes;
}
