const API_BASE = '/api';

export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.text();
  if (!response.ok) {
    let errorText = body;
    try {
      const parsed = JSON.parse(body);
      errorText = parsed.message || body;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorText || 'Request failed');
  }
  return body ? JSON.parse(body) : null;
}

// ── Categories ──────────────────────────────────────────
export async function getCategories() {
  return fetchJson(`${API_BASE}/category`);
}

export async function createCategory(data) {
  return fetchJson(`${API_BASE}/category`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id, data) {
  return fetchJson(`${API_BASE}/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id) {
  return fetchJson(`${API_BASE}/category/${id}`, { method: 'DELETE' });
}

// ── Courses ─────────────────────────────────────────────
export async function getCourses() {
  return fetchJson(`${API_BASE}/courses`);
}

export async function createCourse(data) {
  return fetchJson(`${API_BASE}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateCourse(id, data) {
  return fetchJson(`${API_BASE}/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(id) {
  return fetchJson(`${API_BASE}/courses/${id}`, { method: 'DELETE' });
}

// ── Students ────────────────────────────────────────────
export async function getStudents() {
  return fetchJson(`${API_BASE}/students`);
}

export async function createStudent(data) {
  return fetchJson(`${API_BASE}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateStudent(id, data) {
  return fetchJson(`${API_BASE}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteStudent(id) {
  return fetchJson(`${API_BASE}/students/${id}`, { method: 'DELETE' });
}
