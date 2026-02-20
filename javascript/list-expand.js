document.addEventListener('DOMContentLoaded', function () {
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');

  dropdownBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const dropdownContent = btn.nextElementSibling;
      const otherDropdowns = document.querySelectorAll('.dropdown-content2.active');

      otherDropdowns.forEach(function (otherDropdown) {
        if (otherDropdown !== dropdownContent) {
          otherDropdown.classList.remove('active');
          const pricesSection = otherDropdown.closest('.pricesSection');
          pricesSection.style.marginBottom = '0';
        }
      });

      dropdownContent.classList.toggle('active');
      updateDropdownPositions();
    });
  });

  function updateDropdownPositions() {
    const dropdowns = document.querySelectorAll('.dropdown-content2.active');
    let offset = 0;

    dropdowns.forEach(function (dropdown) {
      dropdown.style.top = `calc(100% + ${offset}px)`;

       const screenWidth = window.innerWidth;
      const pricesSection = dropdown.closest('.pricesSection');
      if (pricesSection && screenWidth < 800) {
        const preturiRows = pricesSection.querySelectorAll('.preturi-align-row');
        const marginBottom = preturiRows.length * 58;
        pricesSection.style.marginBottom = `${marginBottom}px`;
        offset += marginBottom;
      } else if (pricesSection){
          const preturiRows = pricesSection.querySelectorAll('.preturi-align-row');
        const marginBottom = preturiRows.length * 42;
        pricesSection.style.marginBottom = `${marginBottom}px`;
        offset += marginBottom;
      }
    });

    if (dropdowns.length === 0) {
      // Reset margin when no dropdown is open
      document.querySelectorAll('.pricesSection').forEach(function (pricesSection) {
        pricesSection.style.marginBottom = '0';
      });
    }
  }
});
