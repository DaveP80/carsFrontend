import React, { useState, useEffect, useContext } from "react";
import { CarContext } from "../Context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchCarData } from "../api";
import Overlay from "../../common/Overlay";
import "./AllCars.css";

function AllCars() {
  const navigate = useNavigate();
  const [allcars, setAllCars] = useState(null);

  const { isLoading, setIsLoading } = useContext(CarContext);

  useEffect(() => {
    setIsLoading(true);
    fetchCarData()
      .then((res) => {
        let arr = [];
        while (arr.length < 20) {
          let n = Math.floor(Math.random() * res.data.length);
          if (!arr.includes(n)) arr.push(n);
        }
        setAllCars(() => arr.map((item) => res.data[item]));
        setIsLoading(false);
      })
      .catch((e) => navigate("/404"));
  }, []);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container min-vh-100">
        <section className="row text-center">
          {allcars &&
            allcars.map((car) => {
              return (
                <div
                  key={car.id}
                  className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                >
                  <Link
                    className="link-underline link-underline-opacity-0 text-warning"
                    to={`/cars/${car.id}`}
                  >
                    <img
                      src={car.preferences.imageURL}
                      alt={car.name}
                      height="250px"
                      width="180px"
                      className="rounded-1 "
                    ></img>
                    <p className="mt-1 fs-6">
                      {car.model_year}
                    </p>
                  </Link>
                </div>
              );
            })}
        </section>
      </div>
    </Overlay>
  );
}

export default AllCars;
