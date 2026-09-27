import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import api, { getErrorMessage } from "../services/api.js";

const fields = [
  { name: "name", label: "Full name" },
  { name: "title", label: "Professional title", placeholder: "e.g. Frontend Developer" },
  { name: "phone", label: "Phone" },
  { name: "location", label: "Location" },
  { name: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/..." },
  { name: "github", label: "GitHub", placeholder: "https://github.com/..." },
  { name: "portfolio", label: "Portfolio", placeholder: "https://..." },
];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    title: user?.title || "",
    phone: user?.phone || "",
    location: user?.location || "",
    linkedin: user?.linkedin || "",
    github: user?.github || "",
    portfolio: user?.portfolio || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const { data } = await api.put("/profile", form);
      updateUser(data.user);
      setMessage("Profile updated.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="Profile" subtitle="Keep your details up to date.">
      <div className="max-w-xl card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && <div className="rounded-md bg-surface px-3 py-2 text-sm text-ink">{message}</div>}
          {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

          <div>
            <label className="field-label">Email</label>
            <input value={user?.email || ""} disabled className="field-input bg-neutral text-ink-soft" />
          </div>

          {fields.map((f) => (
            <div key={f.name}>
              <label className="field-label">{f.label}</label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.placeholder}
                className="field-input"
              />
            </div>
          ))}

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
