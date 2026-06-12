fetch('/components/navbar-admin.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-placeholder').innerHTML = html;
    initSidebar('admin');
  });

function initSidebar(role) {
  // Active link
  const path = window.location.pathname;
  document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
    if (path.includes(link.dataset.page)) link.classList.add('active');
  });

  // User info
  const data = JSON.parse(localStorage.getItem(role === 'admin' ? 'adminData' : 'teacherData') || '{}');
  const name = data.name || (role === 'admin' ? 'Admin' : 'Teacher');
  const el = document.getElementById('sidebar-user-name');
  const av = document.getElementById('sidebar-avatar');
  if (el) el.textContent = name;
  if (av) av.textContent = name.charAt(0).toUpperCase();

  // Logout
  document.getElementById('navbar-logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacherData');
    localStorage.removeItem('adminData');
    window.location.href = '/';
  });

  // Theme toggle
  if (typeof initThemeToggle === 'function') initThemeToggle();

  // Mobile hamburger
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const hamburger = document.getElementById('sidebar-hamburger');

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('visible');
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('visible');
  }

  hamburger?.addEventListener('click', openSidebar);
  overlay?.addEventListener('click', closeSidebar);

  document.querySelectorAll('.sidebar-link').forEach(l => {
    l.addEventListener('click', closeSidebar);
  });
}
