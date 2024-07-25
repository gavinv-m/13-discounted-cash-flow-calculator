// Exports to heading-event-listeners.js
export default function clearValuationContent(valuationContentBox) {
  while (valuationContentBox.firstChild) {
    valuationContentBox.removeChild(valuationContentBox.firstChild);
  }
}
