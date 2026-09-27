import StatusBadge from "./StatusBadge.jsx";

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—";

const ApplicationTable = ({ applications, onRowClick }) => (
  <div className="overflow-hidden rounded-lg border border-ink/10 bg-white">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-ink/10 bg-surface/60 text-xs font-medium uppercase tracking-wide text-ink-soft/70">
          <th className="px-4 py-3">Company</th>
          <th className="px-4 py-3">Job Title</th>
          <th className="px-4 py-3">Location</th>
          <th className="px-4 py-3">Applied</th>
          <th className="px-4 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr
            key={app._id}
            onClick={() => onRowClick(app)}
            className="cursor-pointer border-b border-ink/5 last:border-0 hover:bg-surface/40"
          >
            <td className="px-4 py-3 font-medium text-ink">{app.company}</td>
            <td className="px-4 py-3 text-ink-soft">{app.jobTitle}</td>
            <td className="px-4 py-3 text-ink-soft">{app.location || "—"}</td>
            <td className="px-4 py-3 text-ink-soft">{formatDate(app.applicationDate)}</td>
            <td className="px-4 py-3">
              <StatusBadge status={app.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ApplicationTable;
