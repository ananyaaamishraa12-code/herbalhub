import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        to={`/shop?category=${category.slug}`}
        className="card flex flex-col items-center gap-3 p-6 text-center hover:shadow-gold hover:-translate-y-1 transition-all duration-200"
      >
        <span className="text-3xl">{category.icon}</span>
        <span className="font-semibold text-forest-800 text-sm">{category.name}</span>
      </Link>
    </motion.div>
  );
}
