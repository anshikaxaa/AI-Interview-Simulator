import { useEffect, useState } from "react";
import { getResumes } from "../../api/resume.api";
import { getJobDescriptions } from "../../api/jobDescription.api";
import "./dashboard.css";

function DashboardPage() {
  const [resumeCount, setResumeCount] = useState(0);
  const [jobDescriptionCount, setJobDescriptionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError("");

        const [resumeResponse, jobDescriptionResponse] =
          await Promise.all([getResumes(), getJobDescriptions()]);

        setResumeCount(resumeResponse.data.length);
        setJobDescriptionCount(jobDescriptionResponse.data.length);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Dashboard</p>
          <h1>Welcome back</h1>
          <p className="dashboard-description">
            Prepare for your next interview with AI-powered practice and
            feedback.
          </p>
        </div>
      </header>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Quick actions</h2>
            <p>Get started with your interview preparation.</p>
          </div>
        </div>

        <div className="quick-actions">
          <button type="button" className="action-card">
            <span className="action-card-title">Upload Resume</span>
            <span className="action-card-description">
              Add your resume for interview preparation.
            </span>
          </button>

          <button type="button" className="action-card">
            <span className="action-card-title">Add Job Description</span>
            <span className="action-card-description">
              Add a job description to tailor your interview.
            </span>
          </button>

          <button type="button" className="action-card">
            <span className="action-card-title">Start Interview</span>
            <span className="action-card-description">
              Begin an AI-powered mock interview.
            </span>
          </button>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Overview</h2>
            <p>Your interview preparation at a glance.</p>
          </div>
        </div>

        {error && <p className="dashboard-error">{error}</p>}

        <div className="overview-grid">
          <div className="overview-card">
            <span className="overview-label">Resumes</span>
            <strong>{isLoading ? "—" : resumeCount}</strong>
          </div>

          <div className="overview-card">
            <span className="overview-label">Job descriptions</span>
            <strong>{isLoading ? "—" : jobDescriptionCount}</strong>
          </div>

          <div className="overview-card">
            <span className="overview-label">Interviews</span>
            <strong>—</strong>
          </div>

          <div className="overview-card">
            <span className="overview-label">Reports</span>
            <strong>—</strong>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Recent activity</h2>
            <p>Your latest interview preparation activity.</p>
          </div>
        </div>

        <div className="empty-state">
          <h3>No recent activity</h3>
          <p>
            Upload a resume or job description to start preparing for an
            interview.
          </p>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;