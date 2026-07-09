const API_BASE = import.meta.env.VITE_API_URL || '/api';

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

function buildUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
}

export async function getCategories() {
  return fetchJson(buildUrl('/category'));
}

export async function createCategory(data) {
  return fetchJson(buildUrl('/category'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id, data) {
  return fetchJson(buildUrl(`/category/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id) {
  return fetchJson(buildUrl(`/category/${id}`), { method: 'DELETE' });
}

export async function getCourses() {
  return fetchJson(buildUrl('/courses'));
}

export async function createCourse(data) {
  return fetchJson(buildUrl('/courses'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateCourse(id, data) {
  return fetchJson(buildUrl(`/courses/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(id) {
  return fetchJson(buildUrl(`/courses/${id}`), { method: 'DELETE' });
}

export async function getStudents() {
  return fetchJson(buildUrl('/students'));
}

export async function createStudent(data) {
  return fetchJson(buildUrl('/students'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function updateStudent(id, data) {
  return fetchJson(buildUrl(`/students/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteStudent(id) {
  return fetchJson(buildUrl(`/students/${id}`), { method: 'DELETE' });
}
