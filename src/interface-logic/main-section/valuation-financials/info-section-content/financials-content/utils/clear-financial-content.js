// Exports to ./buttons-event-listeners.js
export default function clearFinancialContent(financialContentBox) {
  while (financialContentBox.firstChild) {
    financialContentBox.removeChild(financialContentBox.firstChild);
  }
}
