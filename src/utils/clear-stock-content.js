const clear = function clearSectionContent(section) {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
};

// Exports to main-controller.js
export default function clearStockContent() {
  const trendingSearches = document.getElementById('trending-searches');
  const customInputs = document.getElementById('custom-inputs');
  const mainContent = document.getElementById('main-content');
  const footer = document.getElementById('footer');

  const sections = [trendingSearches, customInputs, mainContent, footer];

  sections.forEach((section) => {
    clear(section);
  });
}
