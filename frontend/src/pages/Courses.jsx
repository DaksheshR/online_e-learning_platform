import { useEffect, useState } from 'react';
import { useToast } from '../components/Layout';
import FormCard from '../components/FormCard';
import DataTable from '../components/DataTable';
import {
  getCourses,
  getCategories,
  createCourse,
  updateCourse,
  deleteCourse as apiDeleteCourse,
} from '../services/api';

const emptyForm = { title: '', creator: '', categoryId: '', rating: '' };

export default function Courses() {
  const showToast = useToast();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  async function load() {
    try {
      const [coursesData, categoriesData] = await Promise.all([
        getCourses(),
        getCategories(),
      ]);
      setCourses(coursesData);
      setCategories(categoriesData);
    } catch (err) {
      showToast(`Could not load data: ${err.message}`, 'error');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = form.title.trim();
    const creator = form.creator.trim();
    const categoryId = form.categoryId;
    const rating = parseFloat(form.rating);

    if (!title || !creator || !categoryId || Number.isNaN(rating)) {
      return showToast('Please fill all course fields.', 'error');
    }

    try {
      if (editingId) {
        await updateCourse(editingId, { title, creator, categoryId, rating });
        showToast('Course updated.');
      } else {
        await createCourse({ title, creator, categoryId, rating });
        showToast('Course added.');
      }
      resetForm();
      await load();
    } catch (err) {
      showToast(`Course save failed: ${err.message}`, 'error');
    }
  }

  function handleEdit(course) {
    setEditingId(course._id);
    setForm({
      title: course.title,
      creator: course.creator,
      categoryId: course.category?._id || '',
      rating: String(course.rating),
    });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this course?')) return;
    try {
      await apiDeleteCourse(id);
      showToast('Course removed.');
      await load();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'error');
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'category',
      label: 'Category',
      render: (val) => val?.name || 'Unknown',
    },
    { key: 'creator', label: 'Creator' },
    {
      key: 'rating',
      label: 'Rating',
      render: (val) => (
        <span className="rating">★ {val}</span>
      ),
    },
  ];

  return (
    <div className="panel-grid">
      <FormCard title={editingId ? 'Edit Course' : 'New Course'}>
        <form onSubmit={handleSubmit} id="course-form">
          <label htmlFor="course-title">Title</label>
          <input
            type="text"
            id="course-title"
            placeholder="Enter course title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />

          <label htmlFor="course-creator">Creator</label>
          <input
            type="text"
            id="course-creator"
            placeholder="Enter creator name"
            value={form.creator}
            onChange={e => setForm({ ...form, creator: e.target.value })}
            required
          />

          <label htmlFor="course-category">Category</label>
          <select
            id="course-category"
            value={form.categoryId}
            onChange={e => setForm({ ...form, categoryId: e.target.value })}
            required
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <label htmlFor="course-rating">Rating</label>
          <input
            type="number"
            id="course-rating"
            min="0"
            step="0.1"
            placeholder="0 – 10"
            value={form.rating}
            onChange={e => setForm({ ...form, rating: e.target.value })}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="course-submit">
              {editingId ? 'Update' : 'Save'} Course
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm} id="course-reset">
              Reset
            </button>
          </div>
        </form>
      </FormCard>

      <div className="glass-card">
        <div className="panel-header">
          <h3>Courses</h3>
          <button className="btn btn-ghost btn-sm" onClick={load} id="refresh-courses">↻ Refresh</button>
        </div>
        <DataTable
          columns={columns}
          data={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyIcon="📚"
          emptyText="No courses yet. Create one!"
        />
      </div>
    </div>
  );
}
