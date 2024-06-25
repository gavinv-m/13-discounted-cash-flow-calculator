import './styles/styles.css';
import { appManager } from './application-logic/app-manager';

document.addEventListener('DOMContentLoaded', () => {
  appManager.startApplication('IBM');
});
