import { useEffect, useState } from 'react';
import { useToast } from '../../components/Layout';
import FormCard from '../../components/FormCard';
import DataTable from '../../components/DataTable';
import { getCategories, createCategory, updateCategory, deleteCategory as apiDeleteCategory } from '../../services/api';

const emptyForm = { name: '' };

export default function CategoriesPage() {
  const showToast = useToast();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  async function load() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      showToast(`Could not load categories: ${err.message}`, 'error');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return showToast('Category name is required', 'error');

    try {
      if (editingId) {
        await updateCategory(editingId, { name });
        showToast('Category updated.');
      } else {
        await createCategory({ name });
        showToast('Category added.');
      }
      resetForm();
      await load();
    } catch (err) {
      showToast(`Category save failed: ${err.message}`, 'error');
    }
  }

  function handleEdit(category) {
    setEditingId(category._id);
    setForm({ name: category.name });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this category?')) return;
    try {
      await apiDeleteCategory(id);
      showToast('Category removed.');
      await load();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'error');
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  const columns = [{ key: 'name', label: 'Name' }];

  return (
    <div className="panel-grid">
      <FormCard title={editingId ? 'Edit Category' : 'New Category'}>
        <form onSubmit={handleSubmit} id="category-form">
          <label htmlFor="category-name">Name</label>
          <input type="text" id="category-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="category-submit">{editingId ? 'Update' : 'Save'} Category</button>
            <button type="button" className="btn btn-secondary" onClick={resetForm} id="category-reset">Reset</button>
          </div>
        </form>
      </FormCard>

      <div className="glass-card">
        <div className="panel-header">
          <h3>Categories</h3>
          <button className="btn btn-ghost btn-sm" onClick={load} id="refresh-categories">↻ Refresh</button>
        </div>
        <DataTable columns={columns} data={categories} onEdit={handleEdit} onDelete={handleDelete} emptyIcon="📁" emptyText="No categories yet. Create one!" />
      </div>
    </div>
  );
}
