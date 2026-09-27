import { MapPin, Calendar, ExternalLink } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—";

const ApplicationCard = ({ application, onClick }) => (
  <button
    onClick={() => onClick(application)}
    className="card w-full text-left transition-colors hover:border-primary/40"
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">{application.jobTitle}</p>
        <p className="truncate text-sm text-ink-soft">{application.company}</p>
      </div>
      <StatusBadge status={application.status} />
    </div>
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-soft">
      {application.location && (
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {application.location}
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Calendar size={12} /> {formatDate(application.applicationDate)}
      </span>
      {application.jobUrl && (
        <span className="inline-flex items-center gap-1">
          <ExternalLink size={12} /> Link
        </span>
      )}
    </div>
  </button>
);

export default ApplicationCard;
