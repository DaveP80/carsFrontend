import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ccar } from "../../assets";
import { getSearchSugg } from "../api";
import Searchbar from "../Searchbar/Searchbar";
import "./Nav.css";

function Nav2() {
  const location = useLocation();
  const [searchArr, setSearchArr] = useState(null);
  useEffect(() => {
    getSearchSugg()
      .then((res) => setSearchArr(res.data))
      .catch((e) => console.log(e));
  }, [location]);
  return (
    <nav className="navbar shadow">
      <div className="container">
        <div className="navbar-header px-5">
          <Link className="navbar-brand" to="/cars">
            <img
              src={ccar}
              alt="Logo"
              width="200"
              height="170"
              className="img-fluid car-logo"
            />
          </Link>
        </div>
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li className="nav-item text-center shadow">
              <Link
                className="nav-link navhome-a"
                to="/"
                style={{
                  fontSize: "1.5em",
                  transition: "font-size 0.3s, color 0.3s",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item text-center shadow">
              <Link
                className="nav-link navhome-b"
                to="/index"
                style={{
                  fontSize: "1.5em",
                  transition: "font-size 0.3s, color 0.3s",
                }}
              >
                Index
              </Link>
            </li>
            <li className="nav-item text-center shadow">
              <Link
                className="nav-link navhome-c"
                to="/create"
                style={{
                  fontSize: "1.5em",
                  transition: "font-size 0.3s, color 0.3s",
                }}
              >
                Add Car
              </Link>
            </li>
          </ul>
        </div>
        <Searchbar searchArr={searchArr} />
      </div>
    </nav>
  );
}

export default Nav2;
