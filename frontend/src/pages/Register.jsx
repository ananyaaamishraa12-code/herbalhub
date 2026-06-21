import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-pad py-16 max-w-md mx-auto">
      <div className="card p-8">
        <h1 className="font-display text-2xl font-bold text-forest-900 text-center">Create Account</h1>
        <p className="text-center text-forest-500 text-sm mt-1">Join HerbalHub for faster checkout & order tracking</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
          <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
          <input required placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg border border-forest-200 px-4 py-3" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? "Creating account..." : "Register"}</button>
        </form>
        <p className="text-center text-sm text-forest-500 mt-5">
          Already have an account? <Link to="/login" className="text-gold-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
