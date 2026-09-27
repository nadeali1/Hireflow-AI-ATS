import { Pencil, Trash2, ExternalLink } from "lucide-react";
import Modal from "./Modal.jsx";
import StatusBadge from "./StatusBadge.jsx";

const Row = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 border-b border-ink/5 py-2.5 last:border-0 sm:flex-row sm:items-center sm:gap-4">
    <span className="w-32 shrink-0 text-xs font-medium uppercase tracking-wide text-ink-soft/70">{label}</span>
    <span className="text-sm text-ink">{value || "—"}</span>
  </div>
);

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }) : "—";

const ApplicationDetailsModal = ({ open, onClose, application, onEdit, onDelete }) => {
  if (!application) return null;

  return (
    <Modal open={open} onClose={onClose} title={application.jobTitle} maxWidth="max-w-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-soft">{application.company}</p>
        <StatusBadge status={application.status} />
      </div>

      <div>
        <Row label="Location" value={application.location} />
        <Row label="Job Type" value={application.jobType} />
        <Row label="Salary" value={application.salary} />
        <Row label="Applied On" value={formatDate(application.applicationDate)} />
        <Row
          label="Job URL"
          value={
            application.jobUrl ? (
              <a
                href={application.jobUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary-dark hover:underline"
              >
                View posting <ExternalLink size={12} />
              </a>
            ) : null
          }
        />
        <Row label="Notes" value={application.notes} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
        <button onClick={() => onDelete(application)} className="inline-flex items-center gap-1.5 btn-danger-text">
          <Trash2 size={14} /> Delete
        </button>
        <button onClick={() => onEdit(application)} className="btn-primary">
          <Pencil size={14} /> Edit Application
        </button>
      </div>
    </Modal>
  );
};

export default ApplicationDetailsModal;
