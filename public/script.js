const apiBase = '/api';
const messageEl = document.getElementById('message');

const state = {
  categories: [],
  courses: [],
  students: []
};

const tabs = document.querySelectorAll('.tab-button');
tabs.forEach(button => {
  button.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

function showMessage(text, type = 'success') {
  messageEl.textContent = text;
  messageEl.className = `message active ${type}`;
  messageEl.style.background = type === 'error' ? '#fee2e2' : '#ecfdf5';
  messageEl.style.color = type === 'error' ? '#991b1b' : '#138000';
  setTimeout(() => {
    messageEl.className = 'message';
  }, 4000);
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const body = await response.text();
  if (!response.ok) {
    let errorText = body;
    try {
      errorText = JSON.parse(body).message || body;
    } catch {
      // ignore parse errors
    }
    throw new Error(errorText || 'Request failed');
  }
  return body ? JSON.parse(body) : null;
}

async function loadCategories() {
  try {
    state.categories = await fetchJson(`${apiBase}/category`);
    renderCategories();
    renderCategoryOptions();
  } catch (err) {
    showMessage(`Could not load categories: ${err.message}`, 'error');
  }
}

async function loadCourses() {
  try {
    state.courses = await fetchJson(`${apiBase}/courses`);
    renderCourses();
  } catch (err) {
    showMessage(`Could not load courses: ${err.message}`, 'error');
  }
}

async function loadStudents() {
  try {
    state.students = await fetchJson(`${apiBase}/students`);
    renderStudents();
  } catch (err) {
    showMessage(`Could not load students: ${err.message}`, 'error');
  }
}

function renderCategoryOptions() {
  const select = document.getElementById('course-category');
  select.innerHTML = '<option value="">Select category</option>';
  state.categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category._id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}

function renderCategories() {
  const tbody = document.querySelector('#categories-table tbody');
  tbody.innerHTML = '';
  state.categories.forEach(category => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${category.name}</td>
      <td class="action-buttons">
        <button class="btn btn-secondary" data-action="edit" data-id="${category._id}">Edit</button>
        <button class="btn btn-danger" data-action="delete" data-id="${category._id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderCourses() {
  const tbody = document.querySelector('#courses-table tbody');
  tbody.innerHTML = '';
  state.courses.forEach(course => {
    const row = document.createElement('tr');
    const categoryName = course.category?.name || 'Unknown';
    row.innerHTML = `
      <td>${course.title}</td>
      <td>${categoryName}</td>
      <td>${course.creator}</td>
      <td>${course.rating}</td>
      <td class="action-buttons">
        <button class="btn btn-secondary" data-action="edit" data-id="${course._id}">Edit</button>
        <button class="btn btn-danger" data-action="delete" data-id="${course._id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderStudents() {
  const tbody = document.querySelector('#students-table tbody');
  tbody.innerHTML = '';
  state.students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.phone}</td>
      <td>${student.isEnrolled ? 'Yes' : 'No'}</td>
      <td class="action-buttons">
        <button class="btn btn-secondary" data-action="edit" data-id="${student._id}">Edit</button>
        <button class="btn btn-danger" data-action="delete" data-id="${student._id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function clearForm(formId) {
  const form = document.getElementById(formId);
  form.reset();
  const idField = form.querySelector('input[type="hidden"]');
  if (idField) idField.value = '';
}

async function saveCategory(event) {
  event.preventDefault();
  const id = document.getElementById('category-id').value;
  const name = document.getElementById('category-name').value.trim();
  if (!name) return showMessage('Category name is required', 'error');

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiBase}/category/${id}` : `${apiBase}/category`;
    await fetchJson(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    clearForm('category-form');
    await loadCategories();
    showMessage(id ? 'Category updated.' : 'Category added.');
  } catch (err) {
    showMessage(`Category save failed: ${err.message}`, 'error');
  }
}

async function saveCourse(event) {
  event.preventDefault();
  const id = document.getElementById('course-id').value;
  const title = document.getElementById('course-title').value.trim();
  const creator = document.getElementById('course-creator').value.trim();
  const categoryId = document.getElementById('course-category').value;
  const rating = parseFloat(document.getElementById('course-rating').value);

  if (!title || !creator || !categoryId || Number.isNaN(rating)) {
    return showMessage('Please fill all course fields.', 'error');
  }

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiBase}/courses/${id}` : `${apiBase}/courses`;
    await fetchJson(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, creator, categoryId, rating })
    });
    clearForm('course-form');
    await loadCourses();
    showMessage(id ? 'Course updated.' : 'Course added.');
  } catch (err) {
    showMessage(`Course save failed: ${err.message}`, 'error');
  }
}

async function saveStudent(event) {
  event.preventDefault();
  const id = document.getElementById('student-id').value;
  const name = document.getElementById('student-name').value.trim();
  const phone = document.getElementById('student-phone').value.trim();
  const isEnrolled = document.getElementById('student-enrolled').checked;

  if (!name || !phone) {
    return showMessage('Student name and phone are required.', 'error');
  }

  try {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiBase}/students/${id}` : `${apiBase}/students`;
    await fetchJson(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, isEnrolled })
    });
    clearForm('student-form');
    await loadStudents();
    showMessage(id ? 'Student updated.' : 'Student added.');
  } catch (err) {
    showMessage(`Student save failed: ${err.message}`, 'error');
  }
}

function setupTableActions(tableId, handlers) {
  const table = document.getElementById(tableId);
  table.addEventListener('click', async event => {
    const button = event.target.closest('button');
    if (!button) return;
    const action = button.dataset.action;
    const id = button.dataset.id;
    const handler = handlers[action];
    if (handler) await handler(id);
  });
}

async function editCategory(id) {
  const category = state.categories.find(item => item._id === id);
  if (!category) return;
  document.getElementById('category-id').value = category._id;
  document.getElementById('category-name').value = category.name;
}

async function deleteCategory(id) {
  if (!confirm('Delete this category?')) return;
  try {
    await fetchJson(`${apiBase}/category/${id}`, { method: 'DELETE' });
    await loadCategories();
    showMessage('Category removed.');
  } catch (err) {
    showMessage(`Delete failed: ${err.message}`, 'error');
  }
}

async function editCourse(id) {
  const course = state.courses.find(item => item._id === id);
  if (!course) return;
  document.getElementById('course-id').value = course._id;
  document.getElementById('course-title').value = course.title;
  document.getElementById('course-creator').value = course.creator;
  document.getElementById('course-category').value = course.category?._id || '';
  document.getElementById('course-rating').value = course.rating;
}

async function deleteCourse(id) {
  if (!confirm('Delete this course?')) return;
  try {
    await fetchJson(`${apiBase}/courses/${id}`, { method: 'DELETE' });
    await loadCourses();
    showMessage('Course removed.');
  } catch (err) {
    showMessage(`Delete failed: ${err.message}`, 'error');
  }
}

async function editStudent(id) {
  const student = state.students.find(item => item._id === id);
  if (!student) return;
  document.getElementById('student-id').value = student._id;
  document.getElementById('student-name').value = student.name;
  document.getElementById('student-phone').value = student.phone;
  document.getElementById('student-enrolled').checked = student.isEnrolled;
}

async function deleteStudent(id) {
  if (!confirm('Delete this student?')) return;
  try {
    await fetchJson(`${apiBase}/students/${id}`, { method: 'DELETE' });
    await loadStudents();
    showMessage('Student removed.');
  } catch (err) {
    showMessage(`Delete failed: ${err.message}`, 'error');
  }
}

function wireEvents() {
  document.getElementById('category-form').addEventListener('submit', saveCategory);
  document.getElementById('course-form').addEventListener('submit', saveCourse);
  document.getElementById('student-form').addEventListener('submit', saveStudent);

  document.getElementById('category-reset').addEventListener('click', () => clearForm('category-form'));
  document.getElementById('course-reset').addEventListener('click', () => clearForm('course-form'));
  document.getElementById('student-reset').addEventListener('click', () => clearForm('student-form'));

  document.getElementById('refresh-categories').addEventListener('click', async () => await loadCategories());
  document.getElementById('refresh-courses').addEventListener('click', async () => await loadCourses());
  document.getElementById('refresh-students').addEventListener('click', async () => await loadStudents());

  setupTableActions('categories-table', { edit: editCategory, delete: deleteCategory });
  setupTableActions('courses-table', { edit: editCourse, delete: deleteCourse });
  setupTableActions('students-table', { edit: editStudent, delete: deleteStudent });
}

async function init() {
  wireEvents();
  await Promise.all([loadCategories(), loadCourses(), loadStudents()]);
}

init();
