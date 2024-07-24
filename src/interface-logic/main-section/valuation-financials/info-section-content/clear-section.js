export default function clearInfoSection() {
  const infoContentContainer = document.getElementById('val-fin-info');

  while (infoContentContainer.firstChild) {
    infoContentContainer.removeChild(infoContentContainer.firstChild);
  }

  return;
}
