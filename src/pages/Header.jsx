import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logoMarvel from "/public/assets/logoMarvel.png";
import "./css/header.css";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header-container">
      <div className="item-container">
        {/* Logo */}
        <button
          className="logo-button"
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          <img src={logoMarvel} alt="Logo Marvel" />
        </button>

        {/* Bouton hamburger */}
        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon
            icon={menuOpen ? faXmark : faBars}
            size="lg"
            style={{ color: "white" }}
          />
        </button>

        {/* Navigation */}
        <nav
          id="site-navigation"
          className={`nav-links ${menuOpen ? "open" : ""}`}
          aria-label="Navigation principale"
        >
          <NavLink to="/characters" onClick={closeMenu}>
            Personnages
          </NavLink>
          <NavLink to="/comics" onClick={closeMenu}>
            Comics
          </NavLink>
          <NavLink to="/favorites" onClick={closeMenu}>
            Favoris
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
