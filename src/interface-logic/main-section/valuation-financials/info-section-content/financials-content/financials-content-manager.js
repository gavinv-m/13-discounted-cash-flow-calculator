class FinancialsContentManager {
  constructor() {}

  addFinancialsContent(infoContentContainer) {
    const kyleHeading = document.createElement('h1');
    kyleHeading.textContent = 'Tiff';
    infoContentContainer.appendChild(kyleHeading);
  }
}

const financialsContentManager = new FinancialsContentManager();

// Exports to financials-heading-listener
export { financialsContentManager };
