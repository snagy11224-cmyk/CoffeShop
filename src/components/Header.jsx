//import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageOfTheDayButton } from "../components/MessageOfTheDayButton";


export default function Header() {
  const { pathname, hash } = useLocation();
  const homeActive = pathname === "/" && (!hash || hash === "#hero");

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">OurCoffeShop</Link>

        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#mainNav"
          aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-2">
            {/* استخدمنا <a> عادية مؤقتًا لتجنب أي تعارض من مكتبة الهاش */}
            <li className="nav-item">
              <a href="/#hero" className={`nav-link${homeActive ? " active" : ""}`}>
                Home
              </a>
            </li>

            <li className="nav-item">
              <Link to="/users" className={`nav-link${pathname==="/users" ? " active" : ""}`}>
                Order Contacts
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact" className={`nav-link${pathname==="/contact" ? " active" : ""}`}>
                Contact
              </Link>
            </li>
          </ul>

           <MessageOfTheDayButton className="btn-coffee ms-lg-3" /> 
        </div>
      </div>
    </nav>
  );
}
