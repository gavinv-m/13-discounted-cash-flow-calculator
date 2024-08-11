import './styles/styles.css';
import './styles/main/main.css';
import './styles/sidebar/sidebar.css';
import { mainController } from './main-controller';

document.addEventListener('DOMContentLoaded', () => {
  mainController.initializeApp('IBM', 'demo');
});
