import React, { createContext, useContext, useMemo, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      return Array.isArray(action.items) ? action.items : [];
    }
    case "ADD": {
      // لو نفس المنتج ونفس الحجم موجود، زوّد الكمية
      const idx = state.findIndex(i => i.id === action.item.id);
      if (idx >= 0) {
        const next = [...state];
        next[idx] = { ...next[idx], qty: next[idx].qty + (action.item.qty ?? 1) };
        return next;
      }
      return [...state, { ...action.item, qty: action.item.qty ?? 1 }];
    }
    case "REMOVE": {
      return state.filter(i => i.id !== action.id);
    }
    case "SET_QTY": {
      return state.map(i => (i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i));
    }
    case "CLEAR": {
      return [];
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart-items") || "[]");
      dispatch({ type: "HYDRATE", items: saved });
    } catch {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return {
      items,
      count,
      total,
      add: (item) => dispatch({ type: "ADD", item }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" })
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
