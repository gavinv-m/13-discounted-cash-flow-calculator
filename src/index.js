import './styles/styles.css';
import './styles/main/main.css';
import './styles/sidebar/sidebar.css';
import './styles/main/tables.css';
import { mainController } from './main-controller';

document.addEventListener('DOMContentLoaded', () => {
  console.log('test');
  mainController.initializeApp('IBM', 'demo');
});
