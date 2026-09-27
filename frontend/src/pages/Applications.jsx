import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Briefcase } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ApplicationTable from "../components/ApplicationTable.jsx";
import ApplicationCard from "../components/ApplicationCard.jsx";
import ApplicationFormModal from "../components/ApplicationFormModal.jsx";
import ApplicationDetailsModal from "../components/ApplicationDetailsModal.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import api, { getErrorMessage } from "../services/api.js";

const STATUS_FILTERS = ["All", "Saved", "Applied", "Interview", "Offer", "Rejected"];

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/applications", { params: { search, status } });
      setApplications(data.applications);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(load, 250);
    return () => clearTimeout(timer);
  }, [load]);

  const handleCreate = async (form) => {
    setSubmitting(true);
    try {
      await api.post("/applications", form);
      setFormOpen(false);
      setSelected(null);
      load();
      return {};
    } catch (error) {
      return { message: getErrorMessage(error) };
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (form) => {
    setSubmitting(true);
    try {
      await api.put(`/applications/${selected._id}`, form);
      setFormOpen(false);
      setDetailsOpen(false);
      setSelected(null);
      load();
      return {};
    } catch (error) {
      return { message: getErrorMessage(error) };
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (app) => {
    if (!window.confirm(`Delete the application for ${app.jobTitle} at ${app.company}?`)) return;
    await api.delete(`/applications/${app._id}`);
    setDetailsOpen(false);
    setSelected(null);
    load();
  };

  const openDetails = (app) => {
    setSelected(app);
    setDetailsOpen(true);
  };

  const openEditFromDetails = (app) => {
    setDetailsOpen(false);
    setSelected(app);
    setFormOpen(true);
  };

  return (
    <DashboardLayout
      title="Applications"
      subtitle="All the roles you're tracking, in one list."
      action={
        <button
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
          className="btn-primary"
        >
          <Plus size={16} /> Add Application
        </button>
      }
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or role"
            className="field-input pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                status === s ? "bg-primary text-white" : "bg-white text-ink-soft hover:bg-surface"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading applications" />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Your application tracker is empty"
          description="Add your first application to get started."
          actionLabel="Add Application"
          onAction={() => setFormOpen(true)}
        />
      ) : (
        <>
          <div className="hidden md:block">
            <ApplicationTable applications={applications} onRowClick={openDetails} />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
            {applications.map((app) => (
              <ApplicationCard key={app._id} application={app} onClick={openDetails} />
            ))}
          </div>
        </>
      )}

      <ApplicationFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={selected ? handleUpdate : handleCreate}
        initialData={selected}
        submitting={submitting}
      />

      <ApplicationDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        application={selected}
        onEdit={openEditFromDetails}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
};

export default Applications;
