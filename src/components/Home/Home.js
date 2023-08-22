import React from "react";
import { Link } from "react-router-dom";
import { giflogo } from "../../assets";
import "./Home.css";

function Home() {
  const handleInterestedClick = () => {
    document.getElementById("searchbar").focus();
  };

  return (
    <div className="container-fluid home-parent">
      <div className="container pb-5 home-container">
        <div className="pt-4 pb-2 d-flex justify-content-center">
          <img
            className="img-fluid rounded shadow img-width-md-50 img-width-sm-80"
            src={giflogo}
            alt="main logo"
          />
        </div>
        <div className="w-50 mx-auto rounded text-center home-text">
          <h4 className="text-dark" id="davidpaquette">
            Classic Car database and comment on your favorite car.
          </h4>
          <h4 className="text-dark">
            View some popular cars according to users.
            <Link className="text-primary" to="/cars">
              here
            </Link>{" "}
          </h4>
          <h4 className="text-dark">
            Find a car you are really{" "}
            <span
              style={{ cursor: "pointer" }}
              className="text-primary"
              onClick={handleInterestedClick}
            >
              interested in
            </span>
            .
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Home;
