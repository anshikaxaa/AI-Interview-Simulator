import { useEffect, useState } from "react";
import {
  createJobDescription,
  deleteJobDescription,
  getJobDescriptions,
  type JobDescription,
} from "../../api/jobDescription.api";
import "./job-descriptions.css";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function JobDescriptionsPage() {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [deletingJobDescriptionId, setDeletingJobDescriptionId] =
    useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function loadJobDescriptions() {
      try {
        setListError("");

        const response = await getJobDescriptions();

        setJobDescriptions(
          [...response.data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime(),
          ),
        );
      } catch (err) {
        setListError(
          err instanceof Error
            ? err.message
            : "Failed to load job descriptions.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadJobDescriptions();
  }, []);

  async function handleUpload() {
    if (!title.trim()) {
      setUploadError("Please enter a job description title.");
      return;
    }

    if (!file) {
      setUploadError("Please select a PDF file.");
      return;
    }

    try {
      setUploadError("");
      setIsUploading(true);

      const jobDescription = await createJobDescription(
        title.trim(),
        companyName.trim(),
        file,
      );

      setJobDescriptions((currentJobDescriptions) => [
        jobDescription,
        ...currentJobDescriptions,
      ]);

      setTitle("");
      setCompanyName("");
      setFile(null);

      const fileInput = document.getElementById(
        "job-description-file",
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      setUploadError(
        err instanceof Error
          ? err.message
          : "Failed to upload job description.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job description? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setListError("");
      setDeletingJobDescriptionId(id);

      await deleteJobDescription(id);

      setJobDescriptions((currentJobDescriptions) =>
        currentJobDescriptions.filter(
          (jobDescription) => jobDescription.id !== id,
        ),
      );
    } catch (err) {
      setListError(
        err instanceof Error
          ? err.message
          : "Failed to delete job description.",
      );
    } finally {
      setDeletingJobDescriptionId(null);
    }
  }

  return (
    <div className="job-descriptions-page">
      <div className="job-descriptions-header">
        <h1>Job Descriptions</h1>
        <p>Manage job descriptions for your AI interviews.</p>
      </div>

      <section className="job-description-upload-card">
        <div className="job-description-section-header">
          <h2>Upload Job Description</h2>
          <p>Add a PDF job description to prepare for a specific role.</p>
        </div>

        <div className="job-description-form">
          <div className="job-description-form-group">
            <label htmlFor="job-description-title">
              Job description title
            </label>
            <input
              id="job-description-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Software Engineer"
              disabled={isUploading}
            />
          </div>

          <div className="job-description-form-group">
            <label htmlFor="company-name">
              Company name <span>(Optional)</span>
            </label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="e.g. Google"
              disabled={isUploading}
            />
          </div>

          <div className="job-description-form-group">
            <label htmlFor="job-description-file">PDF file</label>
            <input
              id="job-description-file"
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
              }}
              disabled={isUploading}
            />

            {uploadError && (
              <p className="job-description-form-error">
                {uploadError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading
              ? "Uploading..."
              : "Upload Job Description"}
          </button>
        </div>
      </section>

      <section className="job-description-list-section">
        <div className="job-description-section-header">
          <h2>Your Job Descriptions</h2>
          <p>Your uploaded job descriptions will appear here.</p>
        </div>

        {isLoading && (
          <div className="job-description-status">
            <p>Loading job descriptions...</p>
          </div>
        )}

        {!isLoading && listError && (
          <div className="job-description-status job-description-error">
            <p>{listError}</p>
          </div>
        )}

        {!isLoading &&
          !listError &&
          jobDescriptions.length === 0 && (
            <div className="job-description-empty-state">
              <p>No job descriptions uploaded yet.</p>
            </div>
          )}

        {!isLoading &&
          !listError &&
          jobDescriptions.length > 0 && (
            <div className="job-description-list">
              {jobDescriptions.map((jobDescription) => (
                <div
                  className="job-description-item"
                  key={jobDescription.id}
                >
                  <div className="job-description-item-content">
                    <span className="job-description-item-label">
                      Job Description
                    </span>

                    <h3>{jobDescription.title}</h3>

                    {jobDescription.companyName && (
                      <p>{jobDescription.companyName}</p>
                    )}
                  </div>

                  <div className="job-description-item-actions">
                    <time dateTime={jobDescription.createdAt}>
                      {formatDate(jobDescription.createdAt)}
                    </time>

                    <button
                      type="button"
                      className="job-description-delete-button"
                      onClick={() =>
                        handleDelete(jobDescription.id)
                      }
                      disabled={
                        deletingJobDescriptionId ===
                        jobDescription.id
                      }
                    >
                      {deletingJobDescriptionId ===
                      jobDescription.id
                        ? "Deleting..."
                        : "Delete"}
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

export default JobDescriptionsPage;