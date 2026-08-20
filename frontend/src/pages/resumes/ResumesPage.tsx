import { useEffect, useState } from "react";
import {
  createResume,
  getResumes,
  type Resume,
} from "../../api/resume.api";
import "./resumes.css";

function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function loadResumes() {
      try {
        setError("");

        const response = await getResumes();
        setResumes(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load resumes.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadResumes();
  }, []);

  async function handleUpload() {
    if (!title.trim()) {
      setError("Please enter a resume title.");
      return;
    }

    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      setError("");
      setIsUploading(true);

      const resume = await createResume(title.trim(), file);

      setResumes((currentResumes) => [resume, ...currentResumes]);

      setTitle("");
      setFile(null);

      const fileInput = document.getElementById(
        "resume-file",
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload resume.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="resumes-page">
      <div className="resumes-header">
        <h1>Resumes</h1>
        <p>Manage your resumes for your AI interviews.</p>
      </div>

      <section className="resume-upload-card">
        <div className="resume-section-header">
          <h2>Upload Resume</h2>
          <p>Add a PDF resume to use during your interviews.</p>
        </div>

        <div className="resume-form">
          <div className="resume-form-group">
            <label htmlFor="resume-title">Resume title</label>
            <input
              id="resume-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Software Engineer Resume"
              disabled={isUploading}
            />
          </div>

          <div className="resume-form-group">
            <label htmlFor="resume-file">PDF file</label>
            <input
              id="resume-file"
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
              }}
              disabled={isUploading}
            />
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </section>

      <section className="resume-list-section">
        <div className="resume-section-header">
          <h2>Your Resumes</h2>
          <p>Your uploaded resumes will appear here.</p>
        </div>

        {isLoading && (
          <div className="resume-status">
            <p>Loading resumes...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="resume-status resume-error">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && resumes.length === 0 && (
          <div className="resume-empty-state">
            <p>No resumes uploaded yet.</p>
          </div>
        )}

        {!isLoading && resumes.length > 0 && (
          <div className="resume-list">
            {resumes.map((resume) => (
              <div className="resume-item" key={resume.id}>
                <div className="resume-item-info">
                  <h3>{resume.title}</h3>
                  <p>{resume.originalFileName}</p>
                </div>

                <div className="resume-item-meta">
                  <span>
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ResumesPage;