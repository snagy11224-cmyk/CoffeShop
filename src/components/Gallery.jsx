import React, { useEffect, useMemo, useState } from "react";
import { useFavorites } from "./FavoritesContext";  // لاحظ المسار
import { useCart } from "./CartContext";            // لاحظ المسار

const items = [
  { id: 1, type: "Drinks",  label: "Latte",      img: "/latte.jpg",      price: 85, desc: "Velvety milk + espresso.", sizes: { Small: 0.9, Medium: 1, Large: 1.2 }, popular: true },
  { id: 2, type: "Drinks",  label: "Cappuccino", img: "/capuccino.jpg",  price: 90, desc: "Foamy classic.", sizes: { Small: 0.9, Medium: 1, Large: 1.2 } },
  { id: 3, type: "Drinks",  label: "Espresso",   img: "/espresso.jpg",   price: 60, desc: "Rich single shot.", sizes: { Single: 1, Double: 1.6 }, popular: true },
  { id: 4, type: "Drinks",  label: "Mocha",      img: "/mocca.jpg",      price: 95, desc: "Chocolate + espresso.", sizes: { Small: 0.9, Medium: 1, Large: 1.2 } },
  { id: 5, type: "Drinks",  label: "Cold Brew",  img: "/cold brew.jpeg", price: 100, desc: "Slow-steeped & chilled.", sizes: { Small: 0.9, Medium: 1, Large: 1.25 } },
  { id: 6, type: "Bakery",  label: "Croissant",  img: "/croissant.jpg",  price: 55, desc: "Buttery flaky pastry.", popular: true },
  { id: 7, type: "Bakery",  label: "Brownie",    img: "/brownie.jpg",    price: 45, desc: "Fudgy cocoa square." },
  { id: 8, type: "Bakery",  label: "Cheesecake", img: "/cheesecake.jpg", price: 70, desc: "Creamy NY slice." },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [size, setSize] = useState(null);
  const [tab, setTab] = useState("All"); // All | Popular | Drinks | Bakery | Favourites
  const fav = useFavorites();            // { ids, isFav, toggle, count }
  const cart = useCart();                // { add, items, count, total ... }

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // set default size when opening modal
  useEffect(() => {
    if (!selected) return;
    const firstSize = selected.sizes ? ( "Medium" in selected.sizes ? "Medium" : Object.keys(selected.sizes)[0] ) : null;
    setSize(firstSize);
  }, [selected]);

  const cardPrice = (item) => {
    if (!item.sizes) return item.price;
    if ("Medium" in item.sizes) return Math.round(item.price * item.sizes.Medium);
    const minMult = Math.min(...Object.values(item.sizes));
    return Math.round(item.price * minMult);
  };

  const finalPrice = useMemo(() => {
    if (!selected) return 0;
    const base = selected.price;
    if (!selected.sizes || !size) return base;
    return Math.round(base * (selected.sizes[size] ?? 1));
  }, [selected, size]);

  const filtered = useMemo(() => {
    switch (tab) {
      case "All": return items;
      case "Popular": return items.filter((i) => i.popular);
      case "Drinks": return items.filter((i) => i.type === "Drinks");
      case "Bakery": return items.filter((i) => i.type === "Bakery");
      case "Favourites": return items.filter((i) => fav.isFav(i.id));
      default: return items;
    }
  }, [tab, fav]);

  const open = (item) => setSelected(item);
  const close = () => setSelected(null);

  const Heart = ({ active }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "#dc3545" : "none"} stroke={active ? "#dc3545" : "#6c757d"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );

  // quick add from card
  const quickAdd = (item) => {
    const chosenSize = item.sizes ? ("Medium" in item.sizes ? "Medium" : Object.keys(item.sizes)[0]) : undefined;
    const unitPrice = item.sizes ? Math.round(item.price * item.sizes[chosenSize]) : item.price;

    cart.add({
      id: `${item.id}${chosenSize ? "-" + chosenSize : ""}`, // unique by size
      productId: item.id,
      label: item.label,
      img: item.img,
      size: chosenSize,
      price: unitPrice,
      qty: 1
    });
  };

  // add from modal (respect chosen size)
  const addToCart = () => {
    if (!selected) return;
    const unitPrice = selected.sizes ? Math.round(selected.price * selected.sizes[size]) : selected.price;
    cart.add({
      id: `${selected.id}${size ? "-" + size : ""}`,
      productId: selected.id,
      label: selected.label,
      img: selected.img,
      size,
      price: unitPrice,
      qty: 1
    });
    setSelected(null);
  };

  const tabs = ["All", "Popular", "Drinks", "Bakery", `Favourites (${fav.count})`];

  return (
    <>
      {/* Tabs */}
      <ul className="nav nav-pills mb-4 gap-2 flex-wrap coffee-pills">
        {tabs.map((label) => {
          const t = label.startsWith("Favourites") ? "Favourites" : label;
          return (
            <li key={label} className="nav-item">
              <button
                className={`nav-link ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
                type="button"
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Grid */}
      <div className="row g-4">
        {filtered.map((item) => {
          const isFav = fav.isFav(item.id);
          return (
            <div key={item.id} className="col-6 col-md-4 col-lg-3">
              <div
                className="card shadow-sm h-100 zoom-card"
                role="button"
                tabIndex={0}
                onClick={() => open(item)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(item)}
              >
                <div className="position-relative">
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt={item.label}
                    loading="lazy"
                    style={{ height: 200, objectFit: "cover" }}
                  />

                  {/* favourite */}
                  <button
                    className="btn btn-sm position-absolute"
                    style={{ right: 8, top: 8, background: "rgba(255,255,255,0.9)" }}
                    onClick={(e) => { e.stopPropagation(); fav.toggle(item.id); }}
                    aria-pressed={isFav}
                    aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
                    type="button"
                  >
                    <Heart active={isFav} />
                  </button>

                  {/* quick add to cart */}
                  <button
                    className="btn btn-sm btn-coffee-primary position-absolute"
                    style={{ left: 8, bottom: 8 }}
                    onClick={(e) => { e.stopPropagation(); quickAdd(item); }}
                    type="button"
                  >
                    + Add
                  </button>
                </div>

                <div className="card-body d-flex justify-content-between align-items-center">
                  <h6 className="card-title mb-0">{item.label}</h6>
                  <span className="badge bg-primary">EGP {cardPrice(item)}</span>
                </div>

                <div className="px-3 pb-3 d-flex justify-content-between small text-muted">
                  <span>{item.type}</span>
                  {item.sizes && <span>Sizes</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal fade show"
          role="dialog"
          aria-modal="true"
          style={{ display: "block", background: "rgba(0,0,0,0.55)" }}
          onClick={close}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selected.label}</h5>
                <button type="button" className="btn-close" onClick={close} />
              </div>

              <div className="modal-body">
                <img
                  src={selected.img}
                  alt={selected.label}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: 260, objectFit: "cover", width: "100%" }}
                />
                <p className="mb-3">{selected.desc}</p>

                <div className="d-flex flex-wrap align-items-center gap-3">
                  {selected.sizes ? (
                    <>
                      <label className="form-label mb-0">Size</label>
                      <select
                        className="form-select form-select-sm w-auto"
                        value={size ?? ""}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {Object.keys(selected.sizes).map((key) => (
                          <option key={key} value={key}>{key}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <span className="text-muted small">One size</span>
                  )}

                  <span className="ms-auto fs-5 fw-semibold">EGP {finalPrice}</span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={close}>
                  Close
                </button>

                <button type="button" className="btn btn-coffee-primary" onClick={addToCart}>
                  Add to cart
                </button>

                <button
                  type="button"
                  className={`btn ${fav.isFav(selected.id) ? "btn-danger" : "btn-primary"}`}
                  onClick={() => fav.toggle(selected.id)}
                >
                  {fav.isFav(selected.id) ? "Remove Favourite" : "Add Favourite"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
