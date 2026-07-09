import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import DashboardPage from './features/dashboard/DashboardPage';
import CoursesPage from './features/courses/CoursesPage';
import CategoriesPage from './features/categories/CategoriesPage';
import StudentsPage from './features/students/StudentsPage';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="students" element={<StudentsPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
