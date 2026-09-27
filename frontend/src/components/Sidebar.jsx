import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Sparkles,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/applications", label: "Applications", icon: Briefcase },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/ai-analyzer", label: "AI Analyzer", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
];

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-5 pb-6 pt-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
          H
        </div>
        <span className="text-base font-bold text-ink">HireFlow</span>
        <button onClick={onClose} className="ml-auto text-ink-soft md:hidden" aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-ink/10 px-3 py-4">
        <div className="mb-2 flex items-center gap-2.5 rounded-md px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-sm font-semibold text-ink">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
            <p className="truncate text-xs text-ink-soft">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface hover:text-ink"
        >
          <LogOut size={17} />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-ink/10 bg-white md:block">
        {content}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">{content}</aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
