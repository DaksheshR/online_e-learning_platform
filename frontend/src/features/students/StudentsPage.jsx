import { useEffect, useState } from 'react';
import { useToast } from '../../components/Layout';
import FormCard from '../../components/FormCard';
import DataTable from '../../components/DataTable';
import { getStudents, createStudent, updateStudent, deleteStudent as apiDeleteStudent } from '../../services/api';

const emptyForm = { name: '', isEnrolled: false, phone: '' };

export default function StudentsPage() {
  const showToast = useToast();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  async function load() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      showToast(`Could not load students: ${err.message}`, 'error');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (!name || !phone) return showToast('Please fill all student fields.', 'error');

    try {
      if (editingId) {
        await updateStudent(editingId, { name, isEnrolled: form.isEnrolled, phone });
        showToast('Student updated.');
      } else {
        await createStudent({ name, isEnrolled: form.isEnrolled, phone });
        showToast('Student added.');
      }
      resetForm();
      await load();
    } catch (err) {
      showToast(`Student save failed: ${err.message}`, 'error');
    }
  }

  function handleEdit(student) {
    setEditingId(student._id);
    setForm({ name: student.name, isEnrolled: student.isEnrolled, phone: student.phone });
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this student?')) return;
    try {
      await apiDeleteStudent(id);
      showToast('Student removed.');
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
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'isEnrolled', label: 'Enrolled', render: (val) => (val ? 'Yes' : 'No') },
  ];

  return (
    <div className="panel-grid">
      <FormCard title={editingId ? 'Edit Student' : 'New Student'}>
        <form onSubmit={handleSubmit} id="student-form">
          <label htmlFor="student-name">Name</label>
          <input type="text" id="student-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <label htmlFor="student-phone">Phone</label>
          <input type="text" id="student-phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <label htmlFor="student-enrolled">Enrolled</label>
          <input type="checkbox" id="student-enrolled" checked={form.isEnrolled} onChange={(e) => setForm({ ...form, isEnrolled: e.target.checked })} />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="student-submit">{editingId ? 'Update' : 'Save'} Student</button>
            <button type="button" className="btn btn-secondary" onClick={resetForm} id="student-reset">Reset</button>
          </div>
        </form>
      </FormCard>

      <div className="glass-card">
        <div className="panel-header">
          <h3>Students</h3>
          <button className="btn btn-ghost btn-sm" onClick={load} id="refresh-students">↻ Refresh</button>
        </div>
        <DataTable columns={columns} data={students} onEdit={handleEdit} onDelete={handleDelete} emptyIcon="🎓" emptyText="No students yet. Create one!" />
      </div>
    </div>
  );
}
