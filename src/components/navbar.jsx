import React from "react";
import "./navbar.css";

export const Navbar = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <img src="path/to/logo.png" alt="DIYA Research Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <a href="#resources">Resources</a>
          </li>
          <li>
            <a href="#contact-us">Contact Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
