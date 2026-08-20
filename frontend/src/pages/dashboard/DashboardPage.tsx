import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getResumes } from "../../api/resume.api";
import type { Resume } from "../../api/resume.api";
import {
  getJobDescriptions,
} from "../../api/jobDescription.api";
import type { JobDescription } from "../../api/jobDescription.api";
import "./dashboard.css";

type DashboardActivity = {
  id: string;
  type: "resume" | "job-description";
  title: string;
  subtitle: string;
  createdAt: string;
};

function DashboardPage() {
    const { user } = useAuth();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const recentActivities: DashboardActivity[] = [
        ...resumes.map((resume) => ({
            id: resume.id,
            type: "resume" as const,
            title: resume.title,
            subtitle: "Resume",
            createdAt: resume.createdAt,
        })),
        ...jobDescriptions.map((jobDescription) => ({
            id: jobDescription.id,
            type: "job-description" as const,
            title: jobDescription.title,
            subtitle: jobDescription.companyName
            ? `Job Description · ${jobDescription.companyName}`
            : "Job Description",
            createdAt: jobDescription.createdAt,
        })),
]
        .sort(
            (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        )
        .slice(0, 5);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setError("");

        const [resumeResponse, jobDescriptionResponse] =
          await Promise.all([getResumes(), getJobDescriptions()]);

        console.log("Dashboard resume response:", resumeResponse);
        console.log("Dashboard JD response:", jobDescriptionResponse);

        setResumes(resumeResponse.data);
        setJobDescriptions(jobDescriptionResponse.data);
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
    <h1>
      Welcome back, <span>{user?.name}</span>
    </h1>
    <p className="dashboard-description">
      Prepare smarter, practice confidently, and improve with AI-powered
      interview feedback.
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
          <button
            type="button"
            className="action-card"
            onClick={() => navigate("/resumes")}
            >
            <span className="action-card-title">Upload Resume</span>
            <span className="action-card-description">
                Add your resume for interview preparation.
            </span>
            </button>

          <button
            type="button"
            className="action-card"
            onClick={() => navigate("/job-descriptions")}
          >
            <span className="action-card-title">Add Job Description</span>
            <span className="action-card-description">
              Add a job description to tailor your interview.
            </span>
          </button>

          <button
            type="button"
            className="action-card"
            onClick={() => navigate("/interviews")}
          >
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
            <strong>{isLoading ? "—" : resumes.length}</strong>
          </div>

          <div className="overview-card">
            <span className="overview-label">Job descriptions</span>
            <strong>{isLoading ? "—" : jobDescriptions.length}</strong>
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

        {recentActivities.length === 0 ? (
  <div className="empty-state">
    <h3>No recent activity</h3>
    <p>
      Upload a resume or job description to start preparing for an
      interview.
    </p>
  </div>
) : (
  <div className="activity-list">
    {recentActivities.map((activity) => (
      <div className="activity-item" key={`${activity.type}-${activity.id}`}>
        <div className="activity-content">
          <span className="activity-type">{activity.subtitle}</span>
          <h3>{activity.title}</h3>
        </div>

        <time dateTime={activity.createdAt}>
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date(activity.createdAt))}
        </time>
      </div>
    ))}
  </div>
)}
      </section>
    </div>
  );
}

export default DashboardPage;