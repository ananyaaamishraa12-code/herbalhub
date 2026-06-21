import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 30;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container-pad py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-forest-900">Your cart is empty</h1>
        <p className="text-forest-500 mt-2">Browse our shop to add some wellness essentials.</p>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container-pad py-12 grid lg:grid-cols-[1fr_360px] gap-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest-900 mb-6">Your Cart</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.key} className="card flex items-center gap-4 p-4">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-xs text-forest-500">{item.brand}</p>
                <p className="font-semibold text-forest-900">{item.name}</p>
                <p className="text-xs text-forest-500">{item.qty_label}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-forest-200 px-2">
                    <button onClick={() => updateQty(item.key, item.qty_count - 1)} className="px-2 py-1 font-bold text-forest-700">−</button>
                    <span className="min-w-[2ch] text-center text-sm">{item.qty_count}</span>
                    <button onClick={() => updateQty(item.key, item.qty_count + 1)} className="px-2 py-1 font-bold text-forest-700">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.key)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="font-bold text-forest-900">₹{(item.price * item.qty_multiplier * item.qty_count).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6 h-fit">
        <h2 className="font-display text-xl font-bold text-forest-900 mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm text-forest-700">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}</span>
          </div>
          {deliveryFee > 0 && (
            <p className="text-xs text-forest-400">Free delivery on orders above ₹499</p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-forest-100 flex justify-between font-bold text-forest-900">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="btn-primary w-full mt-6">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
