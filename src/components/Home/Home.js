import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100">
      <div className="mt-5 text-center">
        <div className="py-5 text-center">
          <img className="img-fluid" src={logo} alt="main logo" />
        </div>
        <div className="w-50 text-center mx-auto">
          <h4 className="text-warning">
            Class Car database and comment on your favorite car.
          </h4>
          <h4 className="text-warning">
            Search for cars by make an model.
            <Link className="" to="/cars">
              here
            </Link>{" "}
          </h4>
          <h4 className="text-warning">
            Find a car you are really interested in.
          </h4>
        </div>
      </div>
      <div>
    </div>
    </div>
  );
}

export default Home;
