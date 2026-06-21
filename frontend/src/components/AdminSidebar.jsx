import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tags, ShoppingBag, Users } from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full lg:w-60 shrink-0">
      <nav className="card p-3 flex lg:flex-col gap-1 overflow-x-auto">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold whitespace-nowrap ${
                isActive ? "bg-forest-700 text-cream-50" : "text-forest-700 hover:bg-forest-50"
              }`
            }
          >
            <l.icon size={16} /> {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
