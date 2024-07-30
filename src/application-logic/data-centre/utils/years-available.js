export default function getYearsAvailable(statementData) {
  const annualReports = statementData.annualReports;
  const years = [];

  annualReports.forEach((year) => {
    const fiscalYear = year.fiscalDateEnding.split('-')[0];
    years.push(fiscalYear);
  });

  const latestToOldest = [...years].sort((a, b) => b - a);
  const oldestToLatest = [...years].sort((a, b) => a - b);

  return {
    latestToOldest,
    oldestToLatest,
  };
}
