import { useState, useCallback, createContext, useContext } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

/* ── Toast Context ───────────────────────────────────── */
const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

/* ── SVG Icons ───────────────────────────────────────── */
const icons = {
  dashboard: (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  courses: (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="13" y2="11" />
    </svg>
  ),
  categories: (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  ),
  students: (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  menu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: icons.dashboard },
  { to: '/courses', label: 'Courses', icon: icons.courses },
  { to: '/categories', label: 'Categories', icon: icons.categories },
  { to: '/students', label: 'Students', icon: icons.students },
];

const pageTitles = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your e-learning platform' },
  '/courses': { title: 'Courses', subtitle: 'Create and manage your course catalog' },
  '/categories': { title: 'Categories', subtitle: 'Organize courses into categories' },
  '/students': { title: 'Students', subtitle: 'Manage student enrollments' },
};

/* ── Toast Component ─────────────────────────────────── */
function Toast({ toast, onClose }) {
  return (
    <div className={`toast toast-${toast.type}`} role="alert">
      <span className="toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
      <span>{toast.message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">×</button>
    </div>
  );
}

/* ── Layout Component ────────────────────────────────── */
export default function Layout() {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || pageTitles['/dashboard'];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div className="app-layout">
        {/* Mobile toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
          id="sidebar-toggle"
        >
          {icons.menu}
        </button>

        {/* Overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-brand">
            <h1>EduAdmin</h1>
            <p>Learning Platform</p>
          </div>
          <nav className="sidebar-nav" aria-label="Main navigation">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
                id={`nav-${item.label.toLowerCase()}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="sidebar-footer">
            © 2026 EduAdmin
          </div>
        </aside>

        {/* Main */}
        <main className="main-content">
          <div className="page-header">
            <h2>{pageInfo.title}</h2>
            <p>{pageInfo.subtitle}</p>
          </div>
          <div className="page-body">
            <Outlet />
          </div>
        </main>

        {/* Toasts */}
        <div className="toast-container" aria-live="polite">
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
