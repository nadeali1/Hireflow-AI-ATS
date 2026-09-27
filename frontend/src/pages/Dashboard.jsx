import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Send, Users, Award, XCircle, Plus, Upload, Sparkles } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import DashboardLayout from "../components/DashboardLayout.jsx";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import EmptyState from "../components/EmptyState.jsx";
import api from "../services/api.js";

const COLORS = ["#EEEEEE", "#8B9A6E", "#DCE3D0", "#C9D6B4", "#EADCDC"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/applications/stats/dashboard");
        setStats(data.stats);
        setRecent(data.recent);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const chartData = stats
    ? [
        { name: "Saved", value: stats.Saved },
        { name: "Applied", value: stats.Applied },
        { name: "Interview", value: stats.Interview },
        { name: "Offer", value: stats.Offer },
        { name: "Rejected", value: stats.Rejected },
      ].filter((d) => d.value > 0)
    : [];

  return (
    <DashboardLayout title="Dashboard" subtitle="An overview of your job search pipeline.">
      {loading ? (
        <LoadingSpinner label="Loading your dashboard" />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <StatCard label="Total" value={stats.total} icon={Briefcase} />
            <StatCard label="Applied" value={stats.Applied} icon={Send} />
            <StatCard label="Interview" value={stats.Interview} icon={Users} />
            <StatCard label="Offers" value={stats.Offer} icon={Award} />
            <StatCard label="Rejected" value={stats.Rejected} icon={XCircle} />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="card lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Recent Applications</h2>
                <button onClick={() => navigate("/applications")} className="text-sm font-medium text-primary-dark hover:underline">
                  View all
                </button>
              </div>
              {recent.length === 0 ? (
                <EmptyState
                  icon={Briefcase}
                  title="Your application tracker is empty"
                  description="Add your first application to get started."
                  actionLabel="Add Application"
                  onAction={() => navigate("/applications")}
                />
              ) : (
                <div className="space-y-1">
                  {recent.map((app) => (
                    <div key={app._id} className="flex items-center justify-between border-b border-ink/5 py-2.5 last:border-0">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{app.jobTitle}</p>
                        <p className="truncate text-xs text-ink-soft">{app.company}</p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="mb-2 text-sm font-semibold text-ink">Status Overview</h2>
              {chartData.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-soft">No data yet.</p>
              ) : (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={70} paddingAngle={2}>
                        {chartData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="mb-4 text-sm font-semibold text-ink">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button onClick={() => navigate("/applications")} className="btn-secondary justify-start">
                <Plus size={16} /> Add Application
              </button>
              <button onClick={() => navigate("/resume")} className="btn-secondary justify-start">
                <Upload size={16} /> Upload Resume
              </button>
              <button onClick={() => navigate("/ai-analyzer")} className="btn-secondary justify-start">
                <Sparkles size={16} /> Analyze Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
