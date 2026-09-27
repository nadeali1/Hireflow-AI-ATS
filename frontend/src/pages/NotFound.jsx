import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
    <p className="text-sm font-medium text-primary-dark">404</p>
    <h1 className="mt-2 text-xl font-bold text-ink">Page not found</h1>
    <p className="mt-2 text-sm text-ink-soft">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary mt-6">
      Back to home
    </Link>
  </div>
);

export default NotFound;
