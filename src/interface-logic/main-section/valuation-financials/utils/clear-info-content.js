// Exports to ./heading-event-listeners.js
export default function clearInfoContent(infoContentContainer) {
  while (infoContentContainer.firstChild) {
    infoContentContainer.removeChild(infoContentContainer.firstChild);
  }
}
