import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getAdminCustomers, deleteCustomer } from "../../api/services";
import { Trash2 } from "lucide-react";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);

  const load = () => getAdminCustomers().then((res) => setCustomers(res.data.customers));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (confirm("Remove this customer?")) {
      await deleteCustomer(id);
      load();
    }
  };

  return (
    <div className="container-pad py-10 flex flex-col lg:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <h1 className="font-display text-3xl font-bold text-forest-900 mb-6">Manage Customers</h1>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-forest-50 text-forest-700">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Orders</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-forest-100">
                  <td className="p-3 font-medium text-forest-900">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.orders}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(c.id)} className="text-red-500"><Trash2 size={16} /></button>
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
