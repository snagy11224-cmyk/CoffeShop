import React from "react";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";    
//import Product from "../components/Product"; 
import { useEffect } from "react";

const items = [
  { label: "about", img: "/about.jpg" }
];


export default function Home(){
    useEffect(() => {
  if (window.location.pathname === "/" && !window.location.hash) {
    window.history.replaceState(null, "", "/#hero");
  }
}, []);

  return (
    <>
      <Hero />

      <section id="about" className="py-5 section-muted">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Freshly roasted coffee, daily</h2>
              <p className="mb-2">
                We carefully select beans, roast in-house, and serve signature drinks with daily baked goods.
              </p>
              <ul className="list-unstyled text-muted mb-0">
                <li>• Espresso / Pour-Over / Cold Brew</li>
                <li>• Fresh bakes — croissant & cakes</li>
                <li>• Fast Wi-Fi and calm work corner</li>
              </ul>
            </div>
            <div className="col-md-6">
              <img
  src={items[0].img}
  className="img-fluid hero-image rounded-4 shadow"
  alt={items[0].label}
  loading="lazy"
  width="520"
  height="320"
/>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="py-5">
        <div className="container">
          <h3 className="mb-3">Our Menu  </h3>
          <p className="text-muted mb-4"> </p>
          <Gallery />
        </div>
      </section>

  
    </>
  );
}
