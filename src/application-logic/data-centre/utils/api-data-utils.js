export default async function queryApiData(tickerSymbol) {
  const apiKey = 'demo';

  // Check if it exists in local storage
  if (tickerSymbol in localStorage) {
    return JSON.parse(localStorage.getItem(tickerSymbol));
  }

  try {
    const responses = await Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${tickerSymbol}&apikey=${apiKey}`,
        { mode: 'cors' },
      ),
      fetch(
        `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${tickerSymbol}&apikey=${apiKey}`,
        { mode: 'cors' },
      ),
      fetch(
        `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${tickerSymbol}&apikey=${apiKey}`,
        { mode: 'cors' },
      ),
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerSymbol}&apikey=${apiKey}`,
        { mode: 'cors' },
      ),
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerSymbol}&apikey=${apiKey}`,
        { mode: 'cors' },
      ),
    ]);

    const data = await Promise.all(
      responses.map((response) => response.json()),
    );

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
