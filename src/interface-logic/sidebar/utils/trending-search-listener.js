import { mainController } from '../../../main-controller';

// Exports to create-trending-searches.js
export default function createTrendingSearchListener(companyContainer) {
  companyContainer.addEventListener('click', () => {
    mainController.initializeApp(companyContainer.id, 'HWDS4EPSIAUWSY7X');
  });
}
