import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getAdminStats } from "../../api/services";
import { Package, ShoppingBag, Users, IndianRupee, Clock } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminStats().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  const cards = stats ? [
    { label: "Total Products", value: stats.total_products, icon: Package },
    { label: "Total Orders", value: stats.total_orders, icon: ShoppingBag },
    { label: "Total Customers", value: stats.total_customers, icon: Users },
    { label: "Total Revenue", value: `₹${stats.total_revenue}`, icon: IndianRupee },
    { label: "Pending Orders", value: stats.pending_orders, icon: Clock },
  ] : [];

  return (
    <div className="container-pad py-10 flex flex-col lg:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <h1 className="font-display text-3xl font-bold text-forest-900 mb-6">Admin Dashboard</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <div key={i} className="card p-6 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <c.icon size={22} />
              </span>
              <div>
                <p className="text-sm text-forest-500">{c.label}</p>
                <p className="text-2xl font-bold text-forest-900">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
