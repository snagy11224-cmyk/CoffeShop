// src/layout/Footer.jsx
//import React from "react";
//import { NavLink } from "react-router-dom";
//import { HashLink } from "react-router-hash-link";

export default function Footer(){
  return (
    <footer>
      <div className="container d-flex justify-content-between flex-wrap gap-3 align-items-center">
        
        <div className="copy">
          © {new Date().getFullYear()} CoffeeHouse
        </div>

      </div>
    </footer>
  );
}
