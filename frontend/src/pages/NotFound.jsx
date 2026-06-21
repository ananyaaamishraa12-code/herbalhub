import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-pad py-32 text-center">
      <h1 className="font-display text-5xl font-bold text-forest-900">404</h1>
      <p className="text-forest-500 mt-3">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back to Home</Link>
    </div>
  );
}
