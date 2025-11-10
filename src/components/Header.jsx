import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Coffe Shop Website</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item"><NavLink className="nav-link" end to="/">Home</NavLink></li>
            <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu">Gallery</a></li>
            <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>
          <Link to="/contact" className="btn btn-primary ms-lg-3">Reserve a Table</Link>
        </div>
      </div>
    </nav>
  );
}
