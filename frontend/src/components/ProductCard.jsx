import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const defaultPack = product.pack_options?.[0] || { label: "1 piece", multiplier: 1 };
    addToCart(product, defaultPack, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="card overflow-hidden group"
    >
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-forest-950">
              Bestseller
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs font-medium text-forest-500">{product.brand}</p>
          <h3 className="mt-1 font-semibold text-forest-900 leading-snug line-clamp-2">{product.name}</h3>
          <div className="mt-2 flex items-center gap-1 text-xs text-forest-500">
            <Star size={13} className="fill-gold-500 text-gold-500" />
            {product.rating?.toFixed(1)} ({product.rating_count})
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-forest-800">₹{product.price}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-xs text-forest-400 line-through">₹{product.mrp}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleQuickAdd}
          className="w-full flex items-center justify-center gap-2 rounded-full border border-forest-700 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-700 hover:text-cream-50 transition-colors"
        >
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
