import React, { useState, useEffect, useContext } from "react";
import { CarContext } from "../Context/context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchPopularCars } from "../api";
import ThumbsUp from "../ShowCar/ThumbsUp";
import Overlay from "../../common/Overlay";
import "./AllCars.css";

function AllCars() {
  const { isLoading, setIsLoading, carImage } = useContext(CarContext);
  const navigate = useNavigate();
  const [allcars, setAllCars] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchPopularCars()
      .then((res) => {
        let arr = [];
        if (res.data.length < 16) setAllCars(res.data);
        else if (res.data.length >= 16) {
        while (arr.length < 16) {
          let n = Math.floor(Math.random() * res.data.length);
          if (!arr.includes(n)) arr.push(n);
        }
        setAllCars(() => arr.map((item) => res.data[item]));
      }
        setIsLoading(false);
      })
      .catch((e) => navigate("/404"));
  }, []);

  return (
    <Overlay isLoading={isLoading}>
      <div className="min-vh-100 allcars">
        <div className="container py-2 car-grid">
          <div className="object-fit-none border rounded header">
            <h1 className="display-5">Some Popular Classics</h1>
          </div>
          <main className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-3">
            {allcars &&
              allcars.map((car) => {
                return (
                  <div className="container" key={car.name.slice(0,4) + car.id.toString()}>
                    <div
                      className="col mb-4 sm-mb-2 d-flex flex-column align-items-center text-center bg-light rounded p-3 shadow-sm car-card"
                    >
                      <Link
                        className="text-warning"
                        to={`/cars/${car.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={car.imageurl ?? carImage()}
                          alt={car.name}
                          height="250px"
                          width="180px"
                          className="rounded-1"
                        ></img>
                        <aside>
                          <span className="badge text-bg-primary mt-1">
                            {car.name}
                          </span>
                        </aside>
                      </Link>
                      <ThumbsUp count={car.count} id={car.id} />
                    </div>
                  </div>
                );
              })}
          </main>
        </div>
      </div>
    </Overlay>
  );
}

export default AllCars;
