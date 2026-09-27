import { useEffect, useState } from "react";
import { FileText, Trash2, Download, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ResumeUploader from "../components/ResumeUploader.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import api, { getErrorMessage } from "../services/api.js";

const formatSize = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

const Resume = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/resume");
      setResume(data.resume);
    } catch {
      setResume(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (file) => {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const { data } = await api.post("/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResume(data.resume);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete your uploaded resume?")) return;
    await api.delete("/resume");
    setResume(null);
  };

  const handleDownload = async () => {
    const response = await api.get("/resume/download", { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", resume.fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <DashboardLayout title="Resume" subtitle="Upload the resume you use when applying to roles.">
      {loading ? (
        <LoadingSpinner label="Loading resume" />
      ) : (
        <div className="max-w-xl space-y-5">
          {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

          {resume ? (
            <div className="card">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-surface">
                  <FileText size={18} className="text-primary-dark" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{resume.fileName}</p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {formatSize(resume.fileSize)} · Uploaded {formatDate(resume.uploadedAt)}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={handleDownload} className="btn-secondary">
                  <Download size={14} /> Download
                </button>
                <button onClick={() => navigate("/ai-analyzer")} className="btn-secondary">
                  <Sparkles size={14} /> Analyze
                </button>
                <button onClick={handleDelete} className="btn-danger-text ml-auto inline-flex items-center gap-1.5">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-md bg-surface/60 px-4 py-3 text-sm text-ink-soft">
              Upload your resume to start analyzing your applications.
            </div>
          )}

          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">
              {resume ? "Replace resume" : "Upload resume"}
            </h2>
            <ResumeUploader onFileSelected={handleUpload} uploading={uploading} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Resume;
