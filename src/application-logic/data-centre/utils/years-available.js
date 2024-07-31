export default function getYearsAvailable(statementData) {
  const annualReports = statementData.annualReports;
  const monthMap = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };
  const years = [];
  const yearsOnly = [];

  annualReports.forEach((year) => {
    const fiscalYear = year.fiscalDateEnding.split('-');
    const text = `${monthMap[fiscalYear[1]]}-${fiscalYear[0]}`;
    years.push(text);
    yearsOnly.push(fiscalYear[0]);
  });

  const latestToOldestYearsAndMonth = [...years];
  const oldestToLatestYearsAndMonth = [...years].reverse();
  const latestToOldestYearsOnly = [...yearsOnly].sort((a, b) => b - a);
  const oldestToLatestYearsOnly = [...yearsOnly].sort((a, b) => a - b);

  return {
    latestToOldestYearsAndMonth,
    oldestToLatestYearsAndMonth,
    latestToOldestYearsOnly,
    oldestToLatestYearsOnly,
  };
}
