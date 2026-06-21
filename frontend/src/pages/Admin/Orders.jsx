import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getAdminOrders, updateOrderStatus } from "../../api/services";

const STATUS_OPTIONS = ["placed", "confirmed", "packed", "out_for_delivery", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const load = () => getAdminOrders().then((res) => setOrders(res.data.orders));
  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    load();
  };

  return (
    <div className="container-pad py-10 flex flex-col lg:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <h1 className="font-display text-3xl font-bold text-forest-900 mb-6">Manage Orders</h1>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-forest-50 text-forest-700">
              <tr>
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Total</th>
                <th className="text-left p-3">Payment</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t border-forest-100">
                  <td className="p-3 text-forest-600">{o._id.slice(-8)}</td>
                  <td className="p-3">{o.phone}</td>
                  <td className="p-3 font-semibold">₹{o.total}</td>
                  <td className="p-3 capitalize">{o.payment_method}</td>
                  <td className="p-3">
                    <select
                      value={o.order_status}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className="rounded-lg border border-forest-200 px-2 py-1"
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
