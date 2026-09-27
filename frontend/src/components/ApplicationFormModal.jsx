import { useState, useEffect } from "react";
import Modal from "./Modal.jsx";

const emptyForm = {
  company: "",
  jobTitle: "",
  location: "",
  jobType: "Full-time",
  applicationDate: new Date().toISOString().slice(0, 10),
  jobUrl: "",
  salary: "",
  status: "Saved",
  notes: "",
};

const ApplicationFormModal = ({ open, onClose, onSubmit, initialData, submitting }) => {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setError("");
      setForm(
        initialData
          ? { ...emptyForm, ...initialData, applicationDate: initialData.applicationDate?.slice(0, 10) || emptyForm.applicationDate }
          : emptyForm
      );
    }
  }, [open, initialData]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.jobTitle.trim()) {
      setError("Company and job title are required.");
      return;
    }
    setError("");
    const result = await onSubmit(form);
    if (result?.message) setError(result.message);
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Application" : "Add Application"} maxWidth="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label">Company *</label>
            <input name="company" value={form.company} onChange={handleChange} className="field-input" placeholder="e.g. Acme Inc." />
          </div>
          <div>
            <label className="field-label">Job Title *</label>
            <input name="jobTitle" value={form.jobTitle} onChange={handleChange} className="field-input" placeholder="e.g. Frontend Developer" />
          </div>
          <div>
            <label className="field-label">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="field-input" placeholder="e.g. Karachi, PK (Remote)" />
          </div>
          <div>
            <label className="field-label">Job Type</label>
            <select name="jobType" value={form.jobType} onChange={handleChange} className="field-input">
              {["Full-time", "Part-time", "Internship", "Contract", "Remote"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Application Date</label>
            <input type="date" name="applicationDate" value={form.applicationDate} onChange={handleChange} className="field-input" />
          </div>
          <div>
            <label className="field-label">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="field-input">
              {["Saved", "Applied", "Interview", "Offer", "Rejected"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label">Job URL</label>
            <input name="jobUrl" value={form.jobUrl} onChange={handleChange} className="field-input" placeholder="https://" />
          </div>
          <div>
            <label className="field-label">Salary</label>
            <input name="salary" value={form.salary} onChange={handleChange} className="field-input" placeholder="e.g. PKR 100,000/mo" />
          </div>
        </div>
        <div>
          <label className="field-label">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="field-input resize-none" placeholder="Referral contact, interview prep, follow-up dates..." />
        </div>
        <div className="flex justify-end gap-3 pt-1">
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Saving..." : initialData ? "Save Changes" : "Add Application"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplicationFormModal;
