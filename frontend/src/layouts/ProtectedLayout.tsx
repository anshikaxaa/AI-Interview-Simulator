import { useState } from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./protected-layout.css";
import dashboardIcon from "../assets/icons/dashboard.png";
import resumeIcon from "../assets/icons/resume.png";
import jobDescriptionIcon from "../assets/icons/job-description.png";
import interviewIcon from "../assets/icons/interview.png";
import reportIcon from "../assets/icons/report.png";

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
    <img src={dashboardIcon} alt="" />
    <span>Dashboard</span>
  </NavLink>

  <NavLink
    to="/resumes"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <img src={resumeIcon} alt="" />
    <span>Resumes</span>
  </NavLink>

  <NavLink
    to="/job-descriptions"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <img src={jobDescriptionIcon} alt="" />
    <span>Job Descriptions</span>
  </NavLink>

  <NavLink
    to="/interviews"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <img src={interviewIcon} alt="" />
    <span>Interviews</span>
  </NavLink>

  <NavLink
    to="/reports"
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    <img src={reportIcon} alt="" />
    <span>Reports</span>
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