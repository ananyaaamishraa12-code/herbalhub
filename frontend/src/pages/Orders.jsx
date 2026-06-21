import { useEffect, useState } from "react";
import { Package, CheckCircle2, Circle } from "lucide-react";
import { getMyOrders } from "../api/services";

const TRACKING_FLOW = ["placed", "confirmed", "packed", "out_for_delivery", "delivered"];
const LABELS = {
  placed: "Order Placed", confirmed: "Confirmed", packed: "Packed",
  out_for_delivery: "Out for Delivery", delivered: "Delivered",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders().then((res) => setOrders(res.data.orders)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container-pad py-24 text-center text-forest-500">Loading your orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="container-pad py-24 text-center">
        <Package size={40} className="mx-auto text-forest-300 mb-3" />
        <h1 className="font-display text-2xl font-bold text-forest-900">No orders yet</h1>
        <p className="text-forest-500 mt-2">Once you place an order, you'll be able to track it here.</p>
      </div>
    );
  }

  return (
    <div className="container-pad py-12">
      <h1 className="font-display text-3xl font-bold text-forest-900 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => {
          const currentIndex = TRACKING_FLOW.indexOf(order.order_status);
          return (
            <div key={order._id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <p className="text-xs text-forest-400">Order ID: {order._id}</p>
                  <p className="font-semibold text-forest-900">
                    Placed on {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span className="rounded-full bg-forest-50 px-4 py-1 text-sm font-semibold text-forest-700 capitalize">
                  {order.order_status.replace("_", " ")}
                </span>
              </div>

              {order.order_status !== "cancelled" && (
                <div className="flex items-center mb-6">
                  {TRACKING_FLOW.map((step, i) => (
                    <div key={step} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center text-center flex-1">
                        {i <= currentIndex ? (
                          <CheckCircle2 size={22} className="text-forest-700" />
                        ) : (
                          <Circle size={22} className="text-forest-200" />
                        )}
                        <span className={`mt-1 text-[11px] ${i <= currentIndex ? "text-forest-800 font-semibold" : "text-forest-300"}`}>
                          {LABELS[step]}
                        </span>
                      </div>
                      {i < TRACKING_FLOW.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-5 ${i < currentIndex ? "bg-forest-700" : "bg-forest-200"}`} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="divide-y divide-forest-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-2 text-sm">
                    <span className="text-forest-700">{item.name} ({item.qty_label}) × {item.qty_count}</span>
                    <span className="font-semibold text-forest-900">₹{item.line_total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-forest-100 font-bold text-forest-900">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
