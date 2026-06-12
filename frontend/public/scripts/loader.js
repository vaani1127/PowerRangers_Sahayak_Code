(function () {
  const loader = document.createElement('div');
  loader.id = 'page-loader';
  loader.innerHTML = `
    <div class="loader-brand">
      <div class="loader-brand-icon">✦</div>
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
