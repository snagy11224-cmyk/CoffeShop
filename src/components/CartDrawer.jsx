import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const { items, count, total, setQty, remove, clear } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* floating button */}
      <button
        className="btn-coffee-primary cart-fab"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        🛒 Cart {count ? `(${count})` : ""}
      </button>

      {open && (
        <div
          className="offcanvas-backdrop"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <aside
            className="offcanvas-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="offcanvas-header">
              <h5 className="mb-0">Your Cart</h5>
              <button className="btn-close" onClick={() => setOpen(false)} />
            </div>

            <div className="offcanvas-body">
              {items.length === 0 ? (
                <p className="text-muted">Cart is empty.</p>
              ) : (
                <ul className="list-unstyled m-0">
                  {items.map((it) => {
                    const key = `${it.id}-${it.size ?? "ONE"}`;
                    return (
                      <li key={key} className="d-flex align-items-center mb-3">
                        <img
                          src={it.img}
                          alt={it.label}
                          style={{
                            width: 56,
                            height: 56,
                            objectFit: "cover",
                            borderRadius: 8,
                            marginRight: 12
                          }}
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <strong>{it.label}</strong>
                            <span>EGP {it.price * it.qty}</span>
                          </div>
                          <div className="small text-muted">
                            {it.size ? `Size: ${it.size} • ` : ""}
                            Unit: EGP {it.price}
                          </div>

                          <div className="d-flex align-items-center gap-2 mt-1">
                            <button
                              className="btn btn-sm btn-light"
                              onClick={() => setQty(key, it.qty - 1)}
                            >
                              −
                            </button>
                            <span className="px-2">{it.qty}</span>
                            <button
                              className="btn btn-sm btn-light"
                              onClick={() => setQty(key, it.qty + 1)}
                            >
                              +
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger ms-auto"
                              onClick={() => remove(key)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="offcanvas-footer d-flex justify-content-between align-items-center">
              <strong>Total: EGP {total}</strong>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={clear}>
                  Clear
                </button>
                <button className="btn-coffee-primary">Checkout</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
