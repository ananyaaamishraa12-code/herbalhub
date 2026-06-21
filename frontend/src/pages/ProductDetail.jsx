import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShieldCheck, Truck } from "lucide-react";
import { getProduct } from "../api/services";
import QuantitySelector from "../components/QuantitySelector";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then((res) => {
        setProduct(res.data);
        setSelectedPack(res.data.pack_options?.[0] || { label: "1 piece", multiplier: 1 });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container-pad py-24 text-center text-forest-500">Loading product...</div>;
  if (!product) return <div className="container-pad py-24 text-center text-forest-500">Product not found.</div>;

  const lineTotal = (product.price * selectedPack.multiplier * count).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, selectedPack, count);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedPack, count);
    navigate("/cart");
  };

  return (
    <div className="container-pad py-12 grid lg:grid-cols-2 gap-12">
      <div className="card overflow-hidden aspect-square">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>

      <div>
        <p className="text-sm font-semibold text-forest-500">{product.brand}</p>
        <h1 className="font-display text-3xl font-bold text-forest-900 mt-1">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2 text-sm text-forest-500">
          <Star size={15} className="fill-gold-500 text-gold-500" />
          {product.rating?.toFixed(1)} ({product.rating_count} reviews)
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-forest-900">₹{product.price}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-forest-400 line-through">₹{product.mrp}</span>
          )}
          <span className="text-xs text-forest-500">per {product.unit_label}</span>
        </div>

        <p className="mt-5 text-forest-700 leading-relaxed">{product.description}</p>

        {product.prescription_required && (
          <p className="mt-3 text-sm font-semibold text-red-600">
            ⚠ Prescription required for this product.
          </p>
        )}

        <div className="mt-6">
          <QuantitySelector
            packOptions={product.pack_options}
            selected={selectedPack}
            onSelect={setSelectedPack}
            count={count}
            onCountChange={setCount}
          />
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl bg-forest-50 px-5 py-3">
          <span className="text-sm font-semibold text-forest-700">Total</span>
          <span className="text-xl font-bold text-forest-900">₹{lineTotal}</span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button onClick={handleAddToCart} className="btn-outline flex-1">Add to Cart</button>
          <button onClick={handleBuyNow} className="btn-primary flex-1">Buy Now</button>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm text-forest-600">
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-forest-600" /> 100% Genuine Product</div>
          <div className="flex items-center gap-2"><Truck size={18} className="text-forest-600" /> Home Delivery Available</div>
        </div>
      </div>
    </div>
  );
}
