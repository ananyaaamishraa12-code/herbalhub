import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/services";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", desc: "Pay via Google Pay, PhonePe, Paytm, etc." },
  { id: "card", label: "Debit / Credit Card", desc: "Visa, Mastercard, RuPay accepted." },
  { id: "netbanking", label: "Net Banking", desc: "Pay directly from your bank account." },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives." },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const deliveryFee = subtotal >= 499 || subtotal === 0 ? 0 : 30;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({
    fullName: "", line1: "", city: "Delhi", pincode: "", phone: "",
    deliveryInstructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.fullName || !form.line1 || !form.pincode || !form.phone) {
      setError("Please fill in all required address fields.");
      return;
    }
    setPlacing(true);
    try {
      const payload = {
        items: items.map((i) => ({
          product_id: i.product_id,
          qty_label: i.qty_label,
          qty_multiplier: i.qty_multiplier,
          qty_count: i.qty_count,
        })),
        address: {
          full_name: form.fullName,
          line1: form.line1,
          city: form.city,
          pincode: form.pincode,
        },
        phone: form.phone,
        delivery_instructions: form.deliveryInstructions,
        payment_method: paymentMethod,
      };
      const res = await placeOrder(payload);
      clearCart();
      navigate("/orders", { state: { newOrderId: res.data.order._id } });
    } catch (err) {
      setError(err.response?.data?.error || "Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return <div className="container-pad py-24 text-center text-forest-500">Your cart is empty.</div>;
  }

  return (
    <div className="container-pad py-12 grid lg:grid-cols-[1fr_360px] gap-10">
      <form onSubmit={handlePlaceOrder} className="space-y-8">
        <div className="card p-6">
          <h2 className="font-display text-xl font-bold text-forest-900 mb-4">Delivery Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="Full Name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-2" />
            <input required placeholder="Address Line (House No, Street, Area)" value={form.line1} onChange={(e) => update("line1", e.target.value)} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-2" />
            <input placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} className="rounded-lg border border-forest-200 px-4 py-3" />
            <input required placeholder="Pincode" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="rounded-lg border border-forest-200 px-4 py-3" />
            <input required placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-2" />
            <textarea placeholder="Delivery instructions (optional) — e.g. landmark, preferred time" value={form.deliveryInstructions} onChange={(e) => update("deliveryInstructions", e.target.value)} className="rounded-lg border border-forest-200 px-4 py-3 sm:col-span-2" rows={3} />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-display text-xl font-bold text-forest-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((m) => (
              <label key={m.id} className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer ${paymentMethod === m.id ? "border-forest-700 bg-forest-50" : "border-forest-200"}`}>
                <input type="radio" name="payment" checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} />
                <div>
                  <p className="font-semibold text-forest-900">{m.label}</p>
                  <p className="text-xs text-forest-500">{m.desc}</p>
                </div>
              </label>
            ))}
          </div>
          {paymentMethod !== "cod" && (
            <p className="text-xs text-forest-400 mt-3">
              You'll be redirected to a secure payment gateway placeholder to complete your {paymentMethod.toUpperCase()} payment. (Gateway integration to be connected by the merchant.)
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={placing} className="btn-primary w-full">
          {placing ? "Placing Order..." : `Place Order — ₹${total.toFixed(2)}`}
        </button>
      </form>

      <div className="card p-6 h-fit">
        <h2 className="font-display text-xl font-bold text-forest-900 mb-4">Order Summary</h2>
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {items.map((i) => (
            <div key={i.key} className="flex justify-between text-sm">
              <span className="text-forest-700">{i.name} ({i.qty_label}) × {i.qty_count}</span>
              <span className="font-semibold text-forest-900">₹{(i.price * i.qty_multiplier * i.qty_count).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-forest-100 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}</span></div>
          <div className="flex justify-between font-bold text-forest-900 pt-2 border-t border-forest-100"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
