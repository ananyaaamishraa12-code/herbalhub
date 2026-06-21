import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, Sparkles, ArrowRight } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import ReviewCard from "../components/ReviewCard";
import { getProducts, getCategories } from "../api/services";

const REVIEWS = [
  { name: "Priya Sharma", location: "Sonia Vihar, Delhi", rating: 5, text: "Genuinely the most reliable medical store near me — fast delivery and the products are always genuine." },
  { name: "Rohit Verma", location: "Yamuna Vihar, Delhi", rating: 5, text: "Loved the Ayurvedic range. The AI assistant helped me find the right immunity supplement quickly." },
  { name: "Anjali Gupta", location: "Khajuri Khas, Delhi", rating: 4, text: "Clean website, easy checkout, and my order arrived the same evening. Highly recommend HerbalHub." },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts({ featured: "true" }).then((res) => setFeatured(res.data.products.slice(0, 8))).catch(() => {});
    getCategories().then((res) => setCategories(res.data.categories.slice(0, 8))).catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-forest-800 via-forest-700 to-forest-900 text-cream-50">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_60%)]" />
        <div className="container-pad relative py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-gold-300">Sonia Vihar, Delhi · Home Delivery Available</span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Trusted Ayurvedic & <br /> Medical Care, <span className="text-gold-400">Delivered Home.</span>
            </h1>
            <p className="mt-5 text-cream-100/85 text-base sm:text-lg max-w-md">
              Genuine medicines, herbal wellness products, and everyday health
              essentials — curated with care, delivered with trust.
            </p>
            <div className="mt-8 max-w-xl">
              <SearchBar large />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/ai-assistant" className="btn-outline border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-forest-800">
                <Sparkles size={16} /> Ask AI Assistant
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto h-[420px] w-[420px] rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=700"
                alt="Ayurvedic herbal products"
                className="h-[340px] w-[340px] rounded-full object-cover shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DELIVERY INFO STRIP */}
      <section className="bg-white border-b border-forest-100">
        <div className="container-pad py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Home Delivery", desc: "Fast delivery across Sonia Vihar & nearby areas." },
            { icon: ShieldCheck, title: "100% Genuine", desc: "Sourced directly from trusted brands & manufacturers." },
            { icon: Clock, title: "Quick Turnaround", desc: "Same-day delivery on orders placed before 6 PM." },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <item.icon size={22} />
              </span>
              <div>
                <p className="font-semibold text-forest-900">{item.title}</p>
                <p className="text-sm text-forest-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-pad py-16">
        <div className="text-center mb-10">
          <span className="eyebrow">Shop By Need</span>
          <div className="leaf-divider"><span>🌿</span></div>
          <h2 className="font-display text-3xl font-bold text-forest-900">Featured Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <CategoryCard category={cat} key={cat._id} index={i} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/categories" className="btn-outline">View All Categories</Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-forest-50/50 py-16">
        <div className="container-pad">
          <div className="text-center mb-10">
            <span className="eyebrow">Loved By Customers</span>
            <div className="leaf-divider"><span>🌿</span></div>
            <h2 className="font-display text-3xl font-bold text-forest-900">Featured Products</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard product={p} key={p._id} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="btn-primary">Browse Full Shop</Link>
          </div>
        </div>
      </section>

      {/* AI ASSISTANT BANNER */}
      <section className="container-pad py-16">
        <div className="card relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 p-10 bg-forest-800 text-cream-50">
          <div className="flex-1">
            <span className="eyebrow text-gold-300">New · AI Health Assistant</span>
            <h2 className="font-display text-3xl font-bold mt-3">Not sure what you need?</h2>
            <p className="mt-3 text-cream-100/85 max-w-lg">
              Chat with our AI Health Assistant for general wellness guidance,
              product recommendations, and order support. It never diagnoses
              or prescribes — for that, we always point you to a doctor or
              our pharmacist.
            </p>
            <Link to="/ai-assistant" className="btn-gold mt-6 inline-flex">
              <Sparkles size={16} /> Chat Now
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="h-40 w-40 rounded-full bg-gold-400/20 flex items-center justify-center">
              <Sparkles size={56} className="text-gold-400" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="container-pad py-16">
        <div className="text-center mb-10">
          <span className="eyebrow">Testimonials</span>
          <div className="leaf-divider"><span>🌿</span></div>
          <h2 className="font-display text-3xl font-bold text-forest-900">What Our Customers Say</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <ReviewCard review={r} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
