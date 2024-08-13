// Exports to interface-manager.js
export default function closeVisibleDropDowns() {
  document.addEventListener('click', () => {
    document.addEventListener('click', () => {
      const activeDropDown = document.querySelector('.active-dropdown');
      if (activeDropDown) {
        activeDropDown.style.visibility = 'hidden';
        activeDropDown.classList.remove('active-dropdown');
      }
    });
  });
}
