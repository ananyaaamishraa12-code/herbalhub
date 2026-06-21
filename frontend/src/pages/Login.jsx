import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-pad py-16 max-w-md mx-auto">
      <div className="card p-8">
        <h1 className="font-display text-2xl font-bold text-forest-900 text-center">Welcome Back</h1>
        <p className="text-center text-forest-500 text-sm mt-1">Login to your HerbalHub account</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Logging in..." : "Login"}</button>
        </form>
        <p className="text-center text-sm text-forest-500 mt-5">
          Don't have an account? <Link to="/register" className="text-gold-600 font-semibold">Register</Link>
        </p>
        <p className="text-center text-xs text-forest-400 mt-3">Demo admin: admin@herbalhub.com / Admin@123</p>
      </div>
    </div>
  );
}
