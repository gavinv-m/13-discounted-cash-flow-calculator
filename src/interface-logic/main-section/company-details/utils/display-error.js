// Exports to main-controller.js
export default function displayRequestError(message) {
  const errorBox = document.getElementById('error-box');
  errorBox.textContent = message;
}
