import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {productId, name, slug, price, qty, image}

  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === product._id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i].qty += qty;
        return copy;
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  }

  function setQty(productId, qty) {
    setItems((prev) =>
      prev.map((x) => (x.productId === productId ? { ...x, qty: Math.max(1, qty) } : x))
    );
  }

  function clear() {
    setItems([]);
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 300 || subtotal === 0 ? 0 : 29.9;
  const total = subtotal + shipping;

  const value = useMemo(
    () => ({ items, addItem, removeItem, setQty, clear, subtotal, shipping, total }),
    [items, subtotal, shipping, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
