import React, { useEffect, useRef } from "react";
import { Carousel } from "bootstrap";

const slides = [
  { img: "/slide2.jpg",  alt: "Cappuccino art" },
  { img: "/slide3.webp", alt: "Barista pouring" },
  { img: "/slide4.jpg",  alt: "Coffee beans" },
  { img: "/slide1.jpg",  alt: "Cozy shop" },
  { img: "/slide5.jpg",  alt: "Espresso shot" }
];

export default function Hero(){
  const carouselRef = useRef(null);
  const carouselInstance = useRef(null);

  useEffect(() => {
    if (carouselRef.current && !carouselInstance.current) {
      carouselInstance.current = new Carousel(carouselRef.current, {
        interval: 3500,
        ride: "carousel",      // start automatically
        pause: false,          // don’t pause on hover (optional)
        touch: true,           // enable swipe (optional)
        wrap: true
      });
    }
    return () => {
      // clean up on unmount
      try { carouselInstance.current?.dispose(); } catch {}
      carouselInstance.current = null;
    };
  }, []);

  return (
    <header id="hero" className="py-5 hero-section">
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-3">Fresh Coffee, Made With Care</h1>
            <p className="lead mb-4">
              From hand-selected beans to slow roasting and smooth pours. 
              Enjoy warm flavors, calm atmosphere, and coffee that feels personal.
            </p>
          <div className="d-flex gap-3 mt-4">
  <a href="#menu" className="btn-coffee-primary">View Menu</a>
  <a href="/contact" className="btn-coffee-outline">Contact</a>
</div>


          </div>

          <div className="col-lg-6">
            <div
              id="heroCarousel"
              className="carousel slide carousel-fade"
              ref={carouselRef}
            >
              <div className="carousel-inner rounded-4 shadow">
                {slides.map((s, i) => (
                  <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
                    <img
                      src={s.img}
                      alt={s.alt}
                      className="d-block w-100 hero-image"
                      style={{ height: 320, objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
