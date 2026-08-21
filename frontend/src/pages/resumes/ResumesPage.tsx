import { useEffect, useState } from "react";
import {
  createResume,
  deleteResume,
  getResumes,
  type Resume,
} from "../../api/resume.api";
import "./resumes.css";


function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [deletingResumeId, setDeletingResumeId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function loadResumes() {
      try {
        setListError("");

        const response = await getResumes();
        setResumes(response.data);
      } catch (err) {
        setListError(
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
      setUploadError("Please enter a resume title.");
      return;
    }

    if (!file) {
      setUploadError("Please select a PDF file.");
      return;
    }

    try {
      setUploadError("");
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
      setUploadError(
        err instanceof Error ? err.message : "Failed to upload resume.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
  try {
    setListError("");
    setDeletingResumeId(id);

    await deleteResume(id);

    setResumes((currentResumes) =>
      currentResumes.filter((resume) => resume.id !== id),
    );
  } catch (err) {
    setListError(
      err instanceof Error ? err.message : "Failed to delete resume.",
    );
  } finally {
    setDeletingResumeId(null);
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

  {uploadError && (
    <p className="resume-form-error">{uploadError}</p>
  )}
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

        {!isLoading && listError && (
          <div className="resume-status resume-error">
            <p>{listError}</p>
          </div>
        )}

        {!isLoading && !listError && resumes.length === 0 && (
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

    <div className="resume-item-actions">
      <div className="resume-item-meta">
        <span>{formatDate(resume.createdAt)}</span>
      </div>

      <button
  type="button"
  className="resume-delete-button"
  onClick={() => handleDelete(resume.id)}
  disabled={deletingResumeId === resume.id}
>
  {deletingResumeId === resume.id ? "Deleting..." : "Delete"}
</button>
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