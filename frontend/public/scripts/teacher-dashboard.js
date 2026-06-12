function skeletonTrackers(n) {
  return Array.from({ length: n }, () => `
    <div class="tracker-card">
      <div class="tracker-header">
        <div class="skeleton sk-title sk-w-3q" style="height:14px;"></div>
        <div class="skeleton sk-text sk-w-3rd" style="width:60px;height:20px;border-radius:99px;"></div>
      </div>
      <div class="skeleton" style="height:5px;width:100%;border-radius:99px;margin-top:4px;"></div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');
  const nameEl = document.getElementById('teacher-name');
  if (nameEl && teacherData.name) nameEl.textContent = teacherData.name;

  // Show skeletons
  document.getElementById('tracker-list-container').innerHTML = skeletonTrackers(3);
  document.getElementById('submission-review-list-container').innerHTML = skeletonTrackers(2);

  loadSyllabusTrackers();
  checkIfClassTeacher();
});

async function checkIfClassTeacher() {
  const token = localStorage.getItem('token');
  const section = document.getElementById('class-teacher-section');
  const container = document.getElementById('class-teacher-actions-container');

  try {
    const res = await fetch('/api/teacher/class-teacher-section', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error();

    const data = await res.json();

    if (data.success && data.isClassTeacher) {
      section.style.display = 'block';
      const btn = document.createElement('a');
      btn.className = 'action-card';
      btn.href = `/pages/attendance.html?sectionId=${data.sectionId}&sectionName=${encodeURIComponent(data.sectionName)}`;
      btn.style.maxWidth = '320px';
      btn.innerHTML = `
        <div class="action-card-icon green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div>
          <div class="action-card-title">Mark Attendance</div>
          <div class="action-card-desc">${data.sectionName}</div>
        </div>
      `;
      container.innerHTML = '';
      container.appendChild(btn);
    } else {
      section.style.display = 'none';
    }
  } catch {
    section.style.display = 'none';
  }
}

async function loadSyllabusTrackers() {
  const syllabusEl = document.getElementById('tracker-list-container');
  const submissionEl = document.getElementById('submission-review-list-container');
  const token = localStorage.getItem('token');

  try {
    const res = await fetch('/api/syllabus/trackers', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) throw new Error();

    const trackers = await res.json();

    if (trackers.length === 0) {
      const msg = `<p style="color:var(--text-3);font-size:0.85rem;padding:4px 0;">No classes assigned yet.</p>`;
      syllabusEl.innerHTML = msg;
      submissionEl.innerHTML = msg;
      return;
    }

    // Update stats
    const totalClasses = trackers.length;
    const totalChapters = trackers.reduce((s, t) => s + Number(t.total_chapters || 0), 0);
    const doneChapters  = trackers.reduce((s, t) => s + Number(t.chapters_completed || 0), 0);
    const pendingChapters = totalChapters - doneChapters;

    document.getElementById('stat-classes').textContent = totalClasses;
    document.getElementById('stat-done').textContent = doneChapters;
    document.getElementById('stat-total').textContent = totalChapters;
    document.getElementById('stat-pending').textContent = pendingChapters;

    // Build HTML
    const syllabusHTML = trackers.map(t => {
      const label = `${t.full_class_name} - ${t.subject_name}`;
      const pct = Number(t.percentage) || 0;
      return `
        <a href="/pages/syllabus-detail.html?id=${t.teacher_assignment_id}" class="tracker-link">
          <div class="tracker-card fade-in">
            <div class="tracker-header">
              <h3>${label}</h3>
              <span class="tracker-badge">${t.chapters_completed}/${t.total_chapters} done</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width:${pct}%;"></div>
            </div>
          </div>
        </a>`;
    }).join('');

    const submissionHTML = trackers.map(t => {
      const label = `${t.full_class_name} - ${t.subject_name}`;
      return `
        <a href="/pages/worksheet-submissions.html?id=${t.teacher_assignment_id}&name=${encodeURIComponent(label)}" class="tracker-link">
          <div class="tracker-card fade-in">
            <div class="tracker-header">
              <h3>${label}</h3>
              <span class="tracker-badge" style="background:var(--success-bg);color:var(--success);">Review →</span>
            </div>
          </div>
        </a>`;
    }).join('');

    syllabusEl.innerHTML = syllabusHTML;
    submissionEl.innerHTML = submissionHTML;

  } catch {
    const errMsg = `<p style="color:var(--danger);font-size:0.85rem;">Failed to load data. Check your connection.</p>`;
    syllabusEl.innerHTML = errMsg;
    submissionEl.innerHTML = errMsg;
  }
}
