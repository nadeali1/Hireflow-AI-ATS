const StatCard = ({ label, value, icon: Icon, accent = false }) => (
  <div className={`card flex items-center justify-between ${accent ? "border-primary/30" : ""}`}>
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft/70">{label}</p>
      <p className="mt-1.5 text-2xl font-bold text-ink">{value}</p>
    </div>
    {Icon && (
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface">
        <Icon size={17} className="text-primary-dark" />
      </div>
    )}
  </div>
);

export default StatCard;
