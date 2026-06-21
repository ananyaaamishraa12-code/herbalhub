import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import { getCategories } from "../api/services";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data.categories)).catch(() => {});
  }, []);

  return (
    <div className="container-pad py-12">
      <div className="text-center mb-10">
        <span className="eyebrow">Explore</span>
        <h1 className="font-display text-3xl font-bold text-forest-900 mt-2">All Categories</h1>
        <p className="text-forest-500 mt-2 max-w-lg mx-auto">
          From everyday first aid to Ayurvedic wellness — find exactly what your family needs.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {categories.map((cat, i) => (
          <CategoryCard category={cat} key={cat._id} index={i} />
        ))}
      </div>
    </div>
  );
}
