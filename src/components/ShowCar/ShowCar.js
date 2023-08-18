import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Overlay from "../../common/Overlay";
import { fetchCarById } from "../api";
import { CarContext, FormContext } from "../Context/context";
import { FaTrash, FaEdit, FaThumbsUp } from "react-icons/fa";
import DeleteCar from "../DeleteCar/DeleteCar";
import EditCar from "../EditCar/EditCar"
import { logo } from "../../assets";
import CommentThread from "../Comments/CommentThread";
import "./Car.css";

function ShowCar() {
  const { isLoading, setIsLoading, } =
    useContext(CarContext);
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [entry, setEntry] = useState({});
  const [showDel, setShowDel] = useState(false);
  const [count, setCount] = useState(1);
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
    count,
    setCount,
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCarById(id)
      .then((res) => {
        setCar(res.data);
        setCount(res.data[0].count)
        setEntry(res.data[0]);
        setIsLoading(false);
      }).catch((e) => navigate("/404"));
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
        <div className="container min-vh-100">
          {car.length > 0 && (<main className="">
            <div className="row">
              <div className="col-md-6 py-2 px-5">
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
                  <div>
                    <div className="row">
                      <div className="col-md-6 d-flex align-items-center">
                        <p className="mb-0 text-warning">
                          number of interested buyers
                        </p>
                        <FaThumbsUp className="mx-2 popular-icon text-warning" />
                        <p className="mb-0 mr-2 text-success">
                          {count - 1}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="container">
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
                <CommentThread commentz={car.map((item) => { return { name: item.username, comment: item.comment, commentid: item.commentid, isinterested: item.isinterested } })} id={id} />
              </div>
              <div className="col-md-6 mx-auto">
                <div className="container">
                  <div className="text-center">
                    <img
                      src={
                        car[0].preferences.imageURL
                          ? car[0].preferences.imageURL
                          : logo
                      }
                      alt={car[0].name}
                      className="poster img-fluid rounded-1 text-align-center"
                    />

                    <div className="mt-1 text-secondary">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

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
                    <EditCar/>
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
