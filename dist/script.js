const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function isDark() {
  return root.dataset.theme === 'dark' ||
    (!root.dataset.theme && systemTheme.matches);
}

function updateButton() {
  themeButton.setAttribute('aria-pressed', String(isDark()));
}

themeButton.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try {
    localStorage.setItem('homepage-theme', root.dataset.theme);
  } catch {
    // The theme still works for this page when storage is unavailable.
  }
  updateButton();
});

systemTheme.addEventListener('change', updateButton);
updateButton();
themeButton.hidden = false;


// Keep anchor destinations visible below the header at every screen size.
const header = document.querySelector('.site-header');
const headerObserver = new ResizeObserver(() => {
  root.style.setProperty('--header-height', header.offsetHeight + 'px');
});
headerObserver.observe(header);
