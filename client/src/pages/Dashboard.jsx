import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getCourses, getStudents } from '../api/api';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [counts, setCounts] = useState({ courses: 0, categories: 0, students: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [categories, courses, students] = await Promise.all([
          getCategories(),
          getCourses(),
          getStudents(),
        ]);
        setCounts({
          courses: courses.length,
          categories: categories.length,
          students: students.length,
        });
      } catch {
        // silently handle — stats will show 0
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="dashboard-stats">
        <StatCard
          label="Courses"
          value={counts.courses}
          variant="indigo"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          }
        />
        <StatCard
          label="Categories"
          value={counts.categories}
          variant="emerald"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          }
        />
        <StatCard
          label="Students"
          value={counts.students}
          variant="amber"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          }
        />
      </div>

      <div className="glass-card">
        <h3>Quick Actions</h3>
        <div className="quick-actions">
          <Link to="/courses" className="quick-action-btn" id="quick-courses">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
            Manage Courses
          </Link>
          <Link to="/categories" className="quick-action-btn" id="quick-categories">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
            Manage Categories
          </Link>
          <Link to="/students" className="quick-action-btn" id="quick-students">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            Manage Students
          </Link>
        </div>
      </div>
    </>
  );
}
