import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../common/Overlay";
import { CarContext } from "../Context/context";
import { fetchIndexData, fetchIndexDataDesc, fetchIndexedPage } from "../api";
import { updown } from "../../assets";
import { v1 as generateUniqueID } from "uuid";
import { scrollToTop } from "../helper";
import "./DIndex.css";

function Index() {
  const { isLoading, setIsLoading } = useContext(CarContext);
  const [cars, setCars] = useState(null);
  const [order, setOrder] = useState(false);
  const [noresult, setnoResult] = useState(null);
  const [pages, setPages] = useState([1]);
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOnClick = async (e) => {
    if (Math.floor(cars[0].id / 50) + 1 === +e) return;
    setIsLoading(true);
    if (+e === 1) firstPage();
    else if (+e > 1)
      await fetchIndexedPage((Number(e) - 1) * 50)
        .then((res) => {
          setCars(res.data.slice(0, 50));
        })
        .catch((e) => console.log(e));
    setIsLoading(false);
  };

  function firstPage() {
    fetchIndexData()
      .then((res) => {
        setCars(res.data);
        let pgs = Math.floor(res.data[0].count / 50);
        if (pages.length < pgs)
          setPages(Array.from({ length: pgs + 1 }, (_, index) => index + 1));
      })
      .catch((e) => setnoResult(true));
  }

  useEffect(() => {
    setIsLoading(true);
    if (order) {
      fetchIndexDataDesc()
        .then((res) => {
          setCars(res.data);
          setIsLoading(false);
        })
        .catch((e) => setnoResult(true));
    } else {
      firstPage();
      setIsLoading(false);
    }
  }, [order]);

  return (
    <Overlay isLoading={isLoading}>
      <div className="container-fluid pt-2 gradient-background">
        {cars && pages.length > 1 && (
          <>
            <div className="container">
              <header className="rounded text-center indexheader">
                <h2 className="display-5 text-light">Classic car db</h2>
                <nav aria-label="..." className="">
                  <ul
                    className={`pagination ${
                      window.innerWidth >= 992
                        ? "pagination-lg"
                        : "pagination-sm"
                    } mt-1`}
                  >
                    {pages.map((item) => {
                      return (
                        <li
                          className={`page-item${
                            Math.floor(cars[0].id / 50) + 1 === item
                              ? " active"
                              : ""
                          }`}
                          key={generateUniqueID()}
                          id={item}
                          value={item}
                          aria-current="page"
                          onClick={() => handleOnClick(item)}
                        >
                          <span className="page-link">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </header>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered shadow-lg">
                <thead>
                  <tr>
                    <th>
                      ID
                      <img
                        src={updown}
                        style={{
                          width: "25px",
                          height: "33px",
                          cursor: "pointer",
                        }}
                        alt="updown"
                        onClick={() => setOrder(!order)}
                      />
                    </th>
                    <th style={{width: "15%"}}>make model</th>
                    <th>mpg</th>
                    <th>cylinders</th>
                    <th>horsepower</th>
                    <th>weight</th>
                    <th>model year</th>
                    <th>origin</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((item) => (
                    <tr key={generateUniqueID()}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.mpg}</td>
                      <td>{item.cylinders}</td>
                      <td>{item.horsepower}</td>
                      <td>{item.weight}</td>
                      <td>{item.model_year}</td>
                      <td>{item.origin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className={`btn btn-primary back-to-top-button ${
                  showButton ? "show" : ""
                }`}
                onClick={scrollToTop}
              >
                Back to Top
              </button>
            </div>
          </>
        )}
        {noresult && (
          <div className="alert alert-primary" role="alert">
            Unable to load info
          </div>
        )}
      </div>
    </Overlay>
  );
}

export default Index;
