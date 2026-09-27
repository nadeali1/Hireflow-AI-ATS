import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate("/dashboard");
    else setError(result.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">H</div>
          <span className="text-lg font-bold text-ink">HireFlow</span>
        </Link>

        <div className="card">
          <h1 className="text-lg font-bold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-soft">Log in to keep tracking your applications.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
            <div>
              <label className="field-label">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="field-input"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="field-input"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-ink-soft">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary-dark hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
