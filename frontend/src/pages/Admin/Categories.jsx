import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getCategories, createCategory, deleteCategory } from "../../api/services";
import { Trash2, Plus } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "", icon: "🌿", description: "" });

  const load = () => getCategories().then((res) => setCategories(res.data.categories));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(form);
    setForm({ name: "", slug: "", icon: "🌿", description: "" });
    load();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this category?")) {
      await deleteCategory(id);
      load();
    }
  };

  return (
    <div className="container-pad py-10 flex flex-col lg:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <h1 className="font-display text-3xl font-bold text-forest-900 mb-6">Manage Categories</h1>

        <form onSubmit={handleSubmit} className="card p-6 mb-6 grid sm:grid-cols-4 gap-4">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
          <input required placeholder="Slug (e.g. baby-care)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
          <input placeholder="Icon (emoji)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
          <button type="submit" className="btn-primary"><Plus size={16} /> Add</button>
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-4" />
        </form>

        <div className="grid sm:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c._id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-forest-900">{c.name}</p>
                  <p className="text-xs text-forest-400">{c.slug}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(c._id)} className="text-red-500"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
