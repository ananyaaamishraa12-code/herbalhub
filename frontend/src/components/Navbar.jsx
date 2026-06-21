import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Leaf, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/ai-assistant", label: "AI Assistant" },
  { to: "/orders", label: "My Orders" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? "text-gold-600" : "text-forest-800 hover:text-forest-600"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-forest-100">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-700 text-cream-50">
            <Leaf size={20} />
          </span>
          <span className="font-display text-2xl font-bold text-forest-800">
            Herbal<span className="text-gold-600">Hub</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-forest-800 hover:text-gold-600">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-forest-950">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link to="/admin" className="flex items-center gap-1 text-sm font-semibold text-forest-700 hover:text-gold-600">
                  <LayoutDashboard size={18} /> Admin
                </Link>
              )}
              <span className="text-sm font-semibold text-forest-700">Hi, {user.name.split(" ")[0]}</span>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-1 text-sm font-semibold text-forest-700 hover:text-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-5 text-sm">
              <User size={16} /> Login / Register
            </Link>
          )}
        </div>

        <button className="lg:hidden text-forest-800" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-forest-100 bg-cream-50 px-5 pb-6 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)} end>
                {link.label}
              </NavLink>
            ))}
            <Link to="/cart" onClick={() => setOpen(false)} className="text-sm font-semibold text-forest-800">
              Cart ({itemCount})
            </Link>
            {user?.role === "admin" && (
              <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-semibold text-forest-800">
                Admin Dashboard
              </Link>
            )}
            {user ? (
              <button
                onClick={() => { logout(); setOpen(false); navigate("/"); }}
                className="text-left text-sm font-semibold text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="btn-primary w-fit py-2 px-5 text-sm">
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
