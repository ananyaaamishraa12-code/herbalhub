import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "herbalhub_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // cartKey uniquely identifies a product+pack-option combination
  const cartKey = (productId, qtyLabel) => `${productId}__${qtyLabel}`;

  const addToCart = (product, packOption, count = 1) => {
    const key = cartKey(product._id, packOption.label);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty_count: i.qty_count + count } : i
        );
      }
      return [
        ...prev,
        {
          key,
          product_id: product._id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          qty_label: packOption.label,
          qty_multiplier: packOption.multiplier,
          qty_count: count,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const updateQty = (key, qty_count) => {
    if (qty_count < 1) return;
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty_count } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty_multiplier * i.qty_count,
    0
  );

  const itemCount = items.reduce((sum, i) => sum + i.qty_count, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
