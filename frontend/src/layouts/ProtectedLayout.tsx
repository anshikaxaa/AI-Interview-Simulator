import { useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./protected-layout.css";

function ProtectedLayout() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
        className={`protected-layout ${
            isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
        >
      <aside className="protected-sidebar">
        <button
            type="button"
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
            {isSidebarOpen ? "←" : "→"}
        </button>
        
        <h1>AI Interview Simulator</h1>

        <nav>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/resumes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Resumes
          </NavLink>

          <NavLink
            to="/job-descriptions"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Job Descriptions
          </NavLink>

          <NavLink
            to="/interviews"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Interviews
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Reports
          </NavLink>
        </nav>
      </aside>

      <main className="protected-main">
        <header className="protected-header">
          <span>{user?.name}</span>

          <button type="button" onClick={logout}>
            Logout
          </button>
        </header>

        <section className="protected-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default ProtectedLayout;