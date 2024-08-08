// Return true if incorrect length
const incorrectLength = function checkDataLength(
  dataArray,
  expectedLength = 5,
) {
  return !Array.isArray(dataArray) || dataArray.length !== expectedLength;
};

// Return true when limit reached
const apiLimitReached = function checkAPILimitReached(dataArray) {
  const limitMessage1 =
    'Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits.';
  const limitMessage2 =
    'Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please visit https://www.alphavantage.co/premium/ if you would like to target a higher API call frequency.';

  return dataArray.some((value) => {
    return (
      typeof value === 'object' &&
      ('Information' in value || 'Note' in value) &&
      (value.Information === limitMessage1 || value.Note === limitMessage2)
    );
  });
};

// Return true when ticker symbol not valid
const invalidTickerSymbol = function checkTickerSymbol(dataArray) {
  const isEmptyObject = (object) => {
    return Object.keys(object).length === 0;
  };

  const hasErrorMessage = (object) => {
    return object.hasOwnProperty('Error Message');
  };

  return dataArray.some((value) => {
    return isEmptyObject(value) || hasErrorMessage(value);
  });
};

// Exports to data-centre.js
export default function checkDataValid(dataArray) {
  const missingData = incorrectLength(dataArray);
  if (missingData === true) {
    return `Unexpected data format. Try 'IBM' instead?`;
  }

  const limitReached = apiLimitReached(dataArray);
  if (limitReached === true) {
    return `API limit reached. Try 'IBM' instead?`;
  }

  const invalidSymbol = invalidTickerSymbol(dataArray);
  if (invalidSymbol === true) {
    return `Symbol not found. Try 'IBM' instead`;
  }

  // True data is valid
  return true;
}
