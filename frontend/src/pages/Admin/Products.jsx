import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from "../../api/services";
import { Pencil, Trash2, Plus } from "lucide-react";

const emptyForm = { name: "", brand: "", category: "", price: "", mrp: "", description: "", image: "", stock: 100, featured: false };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => getProducts().then((res) => setProducts(res.data.products));

  useEffect(() => {
    load();
    getCategories().then((res) => setCategories(res.data.categories));
  }, []);

  const resetForm = () => { setForm(emptyForm); setEditingId(null); setShowForm(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price), mrp: form.mrp ? parseFloat(form.mrp) : undefined, stock: parseInt(form.stock) };
    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }
    resetForm();
    load();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, brand: p.brand, category: p.category, price: p.price, mrp: p.mrp || "", description: p.description, image: p.image, stock: p.stock, featured: p.featured });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
      load();
    }
  };

  return (
    <div className="container-pad py-10 flex flex-col lg:flex-row gap-8">
      <AdminSidebar />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold text-forest-900">Manage Products</h1>
          <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary"><Plus size={16} /> Add Product</button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card p-6 mb-6 grid sm:grid-cols-2 gap-4">
            <input required placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
            <input required placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3">
              <option value="">Select Category</option>
              {categories.map((c) => <option key={c._id} value={c.slug}>{c.name}</option>)}
            </select>
            <input required type="number" placeholder="Price (₹)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
            <input type="number" placeholder="MRP (₹, optional)" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
            <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-2" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-2" rows={3} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured Product
            </label>
            <div className="flex gap-3 sm:col-span-2">
              <button type="submit" className="btn-primary">{editingId ? "Update Product" : "Create Product"}</button>
              <button type="button" onClick={resetForm} className="btn-outline">Cancel</button>
            </div>
          </form>
        )}

        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-forest-50 text-forest-700">
              <tr>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-forest-100">
                  <td className="p-3 font-medium text-forest-900">{p.name}</td>
                  <td className="p-3 text-forest-600">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-forest-700"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500"><Trash2 size={16} /></button>
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
