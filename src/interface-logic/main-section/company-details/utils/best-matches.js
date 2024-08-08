import { createElement } from '../../../utils/element-utils';
import { mainController } from '../../../../main-controller';

const matchListener = function createMatchListener(event) {
  let symbol = event.target.textContent.split(' ')[0];
  mainController.initializeApp(symbol, 'HWDS4EPSIAUWSY7X');
};

// Exports to search-event-listener.js
export function displayBestMatches(bestMatches) {
  const bestMatchesArray = bestMatches.bestMatches;

  if (bestMatchesArray === undefined) return;

  const cappedBestMatches = bestMatchesArray.slice(0, 5);
  const parentContainer = document.getElementById('search-box-error');
  const bestMatchesContainer = createElement('div', { id: 'best-matches' });

  cappedBestMatches.forEach((match) => {
    const companyName = match['2. name'];
    const tickerSymbol =
      match['4. region'] !== 'United States'
        ? match['1. symbol'].split('.')[0]
        : match['1. symbol'];

    const matchContainer = createElement('div', {
      text: `${tickerSymbol} - ${companyName}`,
      classList: ['match'],
    });

    matchContainer.addEventListener('click', matchListener);

    bestMatchesContainer.appendChild(matchContainer);
  });

  parentContainer.appendChild(bestMatchesContainer);
}
