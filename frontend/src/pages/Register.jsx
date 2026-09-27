import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await register(form);
    setLoading(false);
    if (result.success) navigate("/dashboard");
    else setError(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">H</div>
          <span className="text-lg font-bold text-ink">HireFlow</span>
        </Link>

        <div className="card">
          <h1 className="text-lg font-bold text-ink">Create your account</h1>
          <p className="mt-1 text-sm text-ink-soft">Start organizing your job search today.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            <div>
              <label className="field-label">Full name</label>
              <input name="name" required value={form.name} onChange={handleChange} className="field-input" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} className="field-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange} className="field-input" placeholder="At least 6 characters" />
            </div>
            <div>
              <label className="field-label">Confirm password</label>
              <input type="password" name="confirmPassword" required value={form.confirmPassword} onChange={handleChange} className="field-input" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary-dark hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
