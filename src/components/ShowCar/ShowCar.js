import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../common/Overlay";
import { fetchCarById } from "../api";
import { CarContext, CommContext, FormContext } from "../Context/context";
import { FaTrash, FaEdit } from "react-icons/fa";
import ThumbsUp from "./ThumbsUp";
import DeleteCar from "../DeleteCar/DeleteCar";
import CommentThread from "../Comments/CommentThread";
import "./Car.css";
import CarForm from "../CarForm/CarForm";

function ShowCar() {
  const { isLoading, setIsLoading, logo } =
    useContext(CarContext);
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [showForm, setShowForm] = useState(null);
  //const [put, setPut] = useState({});
  const [showDel, setShowDel] = useState(false);
  const [count, setCount] = useState(1);
  const [dataShape, setDataShape] = useState({});
  const navigate = useNavigate();

  const commContextValue = {
    id,
    count,
    setCount
  };

  const crudFormValues = {
    dataShape,
    car,
    setCar,
    setShowForm,
    id,
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCarById(id)
      .then((res) => {
        //array
        setCar(res.data);
        setCount(res.data[0].count);
        setDataShape(
          {
            id: res.data[0].id,
            make: res.data[0].name.split(' ')[0],
            model: res.data[0].name.split(' ').slice(1).length > 0 ? res.data[0].name.split(' ').slice(1).join(' ') : "",
            mpg: res.data[0].mpg,
            cylinders: res.data[0].cylinders,
            //optional
            displacement: res.data[0].displacement,
            horsepower: res.data[0].horsepower,
            weight: res.data[0].weight,
            //optional
            acceleration: res.data[0].acceleration,
            origin: res.data[0].origin || "usa",
            //between 70 and 99
            model_year: res.data[0].model_year,
            preferences: res.data[0].preferences || { imageURL: null, color: null }
          }
        );
        setIsLoading(false);
      }).catch((e) => navigate("/404"));
  }, [id]);

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleClickEdit = () => {
    setShowForm(true);
  };

  const handleClickTrash = () => {
    setShowForm(true);
    setShowDel(true);
  };

  return (
    <Overlay isLoading={isLoading}>
      <div className="container min-vh-100">
        {car.length > 0 && (
        <main className="">
          <div className="row">
            <div className="col-md-6">
              <h1 className="text-warning">
                {car[0].name}
              </h1>
              <h5 className="text-warning">
                <span className="fw-bolder">Model Year</span>:{" "}
                {+car[0].model_year === 20 ? 2000 : '19' + car[0].model_year}
              </h5>
              <h5 className="text-warning">
                <span className="fw-bolder">horsepower</span>:{" "}
                {car[0].horsepower ?? '135'}
              </h5>
              <h5 className="text-warning">
                <span className="fw-bolder">mpg</span>:{" "}
                {car[0].mpg ?? 'N/A'}
              </h5>
              <h6 className="text-warning">
                <span className="fw-bolder">weight</span>:{" "}
                {car[0].weight ?? '2000'}lbs
              </h6>
              <h6 className="text-warning">
                <span className="fw-bolder">origin </span>:{" "}
                {car[0].origin}
              </h6>
              {count > 1 && (
                <ThumbsUp count={count}/>
              )}
              <div className="container mb-1 mt-1">
                <div className="row">

                  <div className="col-md-auto">
                    <span>Edit Car Info</span>
                  </div>
                  <div className="col-md-1">
                    <div onClick={handleClickEdit} className="">
                      <FaEdit className="icon edit-icon text-white" />
                    </div>
                  </div>
                  <div className="col-md-1">
                    <div onClick={handleClickTrash} className="pointer-cursor">
                      <FaTrash className="icon delete-icon text-danger" />
                    </div>
                  </div>
                </div>
              </div>
              <CommContext.Provider value={commContextValue}>
                <CommentThread commentz={car.map((item) => { return { name: item.username, comment: item.comment, commentid: item.commentid, isinterested: item.isinterested } })} />
              </CommContext.Provider>
            </div>
            <div className="col-md-6 mx-auto">
  <div className="container d-flex align-items-center justify-content-center mt-5">
    <div className="text-center">
      <img
        src={
          car[0].preferences.imageURL
            ? car[0].preferences.imageURL
            : logo
        }
        alt={car[0].name}
        className="thumbnail img-fluid rounded-1 text-align-center"
      />

      <div className="mt-1 text-secondary">
        image from google
      </div>
    </div>
  </div>
</div>

          </div>
        </main>

        )}
        <FormContext.Provider value={crudFormValues}>
          
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
                  <>

                    <div className="modal-header">
                      <h5 className="modal-title">Edit Car</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={handleCloseModal}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <CarForm />
                    </div>
                    <div className="modal-footer">
                      <button
                        id="closemodal"
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                  </>
                ) : (
                  <DeleteCar name={car} />
                )}
              </div>
            </div>
          </div>
        )}
        </FormContext.Provider>
        {showForm && (
          <div
            className="modal-backdrop fade show"
          ></div>
        )}
      </div>
    </Overlay>
  );
}

export default ShowCar;
