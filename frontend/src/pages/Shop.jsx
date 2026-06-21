import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategories } from "../api/services";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (sort) params.sort = sort;
    getProducts(params)
      .then((res) => setProducts(res.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search, category, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div className="container-pad py-10">
      <div className="text-center mb-8">
        <span className="eyebrow">Browse</span>
        <h1 className="font-display text-3xl font-bold text-forest-900 mt-2">Shop All Products</h1>
        <div className="mt-5 max-w-xl mx-auto">
          <SearchBar large />
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-forest-900 mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setParam("category", "")}
                  className={`text-left w-full ${!category ? "text-gold-600 font-semibold" : "text-forest-700"}`}
                >
                  All Products
                </button>
              </li>
              {categories.map((c) => (
                <li key={c._id}>
                  <button
                    onClick={() => setParam("category", c.slug)}
                    className={`text-left w-full ${category === c.slug ? "text-gold-600 font-semibold" : "text-forest-700"}`}
                  >
                    {c.icon} {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-forest-900 mb-3">Sort By</h3>
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value)}
              className="w-full rounded-lg border border-forest-200 px-3 py-2 text-sm"
            >
              <option value="">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        <div>
          {search && (
            <p className="text-sm text-forest-500 mb-4">
              Showing results for "<span className="font-semibold text-forest-800">{search}</span>"
            </p>
          )}
          {loading ? (
            <p className="text-forest-500 py-10 text-center">Loading products...</p>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-forest-600 font-semibold">No products found.</p>
              <p className="text-forest-400 text-sm mt-1">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {products.map((p, i) => (
                <ProductCard product={p} key={p._id} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
