(function () {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="loader-brand">
      <div class="loader-brand-icon"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
      Sahayak
    </div>
    <div class="loader-spinner"></div>
  `;
  document.body.appendChild(loader);

  function hide() {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 320);
  }

  if (document.readyState === 'complete') {
    setTimeout(hide, 60);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 60));
    setTimeout(hide, 3500);
  }
})();
