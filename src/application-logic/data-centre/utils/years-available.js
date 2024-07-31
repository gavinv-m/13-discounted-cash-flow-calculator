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

  annualReports.forEach((year) => {
    const fiscalYear = year.fiscalDateEnding.split('-');
    const text = `${monthMap[fiscalYear[1]]}-${fiscalYear[0]}`;
    years.push(text);
  });

  const latestToOldest = years;
  const oldestToLatest = [...years].reverse();
  console.log(latestToOldest, oldestToLatest);

  return {
    latestToOldest,
    oldestToLatest,
  };
}
