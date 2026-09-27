import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar.jsx";

const DashboardLayout = ({ title, subtitle, action, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink/10 bg-canvas/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-1.5 text-ink-soft hover:bg-surface md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold text-ink sm:text-xl">{title}</h1>
            {subtitle && <p className="mt-0.5 truncate text-sm text-ink-soft">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
