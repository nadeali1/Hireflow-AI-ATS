const LoadingSpinner = ({ label = "Loading" }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-ink-soft">
    <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
    <span className="text-sm">{label}</span>
  </div>
);

export default LoadingSpinner;
