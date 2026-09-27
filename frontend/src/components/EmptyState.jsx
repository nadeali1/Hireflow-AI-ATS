const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-ink/15 bg-white/60 px-6 py-12 text-center">
    {Icon && (
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-surface">
        <Icon size={18} className="text-primary-dark" />
      </div>
    )}
    <h3 className="text-sm font-semibold text-ink">{title}</h3>
    {description && <p className="mt-1 max-w-sm text-sm text-ink-soft">{description}</p>}
    {actionLabel && onAction && (
      <button onClick={onAction} className="btn-primary mt-4">
        {actionLabel}
      </button>
    )}
  </div>
);

export default EmptyState;
