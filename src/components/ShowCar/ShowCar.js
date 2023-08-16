import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../common/Overlay";
import { fetchCarById, fetchPopularCars } from "../api";
import { CarContext, FormContext } from "../Context/context";
import { FaTrash, FaEdit, FaThumbsUp } from "react-icons/fa";
import DeleteCar from "../DeleteCar/DeleteCar";
import EditCar from "../EditCar/EditCar";
import "./Car.css";

function ShowCar() {
  const { isLoading, setIsLoading, data, } =
    useContext(CarContext);
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [entry, setEntry] = useState({});
  const [showDel, setShowDel] = useState(false);
  const navigate = useNavigate();

  const formContextValue = {
    setCar,
    car,
    setShowForm,
    setEntry,
    entry,
    selectedOptions,
    setSelectedOptions,
    setShowDel,
    id,
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCarById(id)
      .then((res) => {
        setCar(res.data[0]);
        setIsLoading(false);
        setEntry(res.data[0]);
      })
      .catch((e) => navigate("/404"));
  }, [id]);

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleClickEdit = () => {
    setSelectedOptions(() => entry.genre_names.split(","));
    setShowForm(true);
  };

  const handleClickTrash = () => {
    setShowForm(true);
    setShowDel(true);
  };

  return (
    <FormContext.Provider value={formContextValue}>
      <Overlay isLoading={isLoading}>
        <div>
          {car && (
            <>
              <main className="container">
                <div className="row">
                  <div className="col-md-6 py-2 px-5">
                    <div className="">
                      <h2 className="text-warning">
                        {car.name}
                      </h2>
                      <p className="text-warning">{car.mpg}</p>
                    </div>

                    <h5 className="text-warning">
                      <span className="fw-bolder">Model Year</span>:{" "}
                      {car.model_year}
                    </h5>
                    <h5 className="text-warning">
                      <span className="fw-bolder">weight</span>:{" "}
                      {car.weight??'2000'}lbs
                    </h5>
                    {car.revenue ? (
                      <h6 className="text-warning">
                        <span className="fw-bolder">horsepower</span>: $
                        {car.horsepower??'135'}
                      </h6>
                    ) : (
                      " "
                    )}
                    {car.popularity ? (
                      <h6 className="text-warning">
                        <span className="fw-bolder">Popularity</span>:{" "}
                        {data}
                      </h6>
                    ) : (
                      " "
                    )}
                    <p className="text-warning">
                      <span className="fw-bolder">Overview</span>:{" "}
                      {car.overview || car.tagline}
                    </p>
                    <p className="text-warning">
                      Language:{" "}
                      {car.original_language}
                    </p>
                    {popul && (
                      <div>
                        <div className="row">
                          <div className="col-md-6 d-flex align-items-center">
                            <p className="mb-0 mr-2 text-warning">
                              This car is popular
                            </p>
                            <FaThumbsUp className="mx-2 popular-icon text-warning" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div
                        onClick={handleClickTrash}
                        className="pointer-cursor"
                      >
                        <FaTrash className="col-sm-1 icon delete-icon text-danger" />
                      </div>
                      <div onClick={handleClickEdit}>
                        <FaEdit className="col-sm-1 icon edit-icon text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mx-auto">
                    <div className="container">
                      <div className="text-center">
                        <img
                          src={
                            car.preferences.imageURL
                              ? car.preferences.imageURL
                              : ""
                          }
                          alt={car.name}
                          className="poster img-fluid rounded-1 text-align-center"
                        />

                        <div className="mt-1 text-secondary">
                          Original car Poster
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>{" "}
            </>
          )}
          {showForm && (
            <div
              className="modal"
              tabIndex="-1"
              role="dialog"
              style={{ display: "block" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  {!showDel ? (
                    <div>{" "}</div>
                  ) : (
                    <DeleteCar car={car.name} />
                  )}
                </div>
              </div>
            </div>
          )}
          {showForm && (
            <div
              className="modal-backdrop fade show"
              onClick={handleCloseModal}
            ></div>
          )}
        </div>
      </Overlay>
    </FormContext.Provider>
  );
}

export default ShowCar;
