import React from "react";
import { Link } from "react-router-dom";
import { ccar } from "../../assets";
import Searchbar from "../Searchbar/Searchbar";

function Nav() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-dark border-bottom border-black">
      <Link
        className="navbar-brand text-warning"
        to="/cars"
        style={{ fontSize: "1.5rem", transition: "font-size 0.3s" }}
      >
        <img
          src={ccar}
          alt="Logo"
          width="200"
          className="d-inline-block align-top px-4"
        />
      </Link>

      <div
        className="links-list collapse navbar-collapse d-flex flex-wrap"
        id="navbarNav"
      >
        <ul className="navbar-nav ml-auto d-flex flex-wrap">
          <li className="nav-item px-3">
            <Link
              className="nav-link text-warning"
              to="/"
              style={{ fontSize: "1.2rem", transition: "font-size 0.3s" }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item px-3">
            <Link
              className="nav-link text-warning"
              to="/index"
              style={{ fontSize: "1.2rem", transition: "font-size 0.3s" }}
            >
              Index
            </Link>
          </li>
          <li className="nav-item px-3">
            <Link
              className="nav-link text-warning"
              to="/create"
              style={{ fontSize: "1.2rem", transition: "font-size 0.3s" }}
            >
              Add Car
            </Link>
          </li>
        </ul>
        <Searchbar />
      </div>
    </nav>
  );
}

export default Nav;
