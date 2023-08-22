import React, { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm, carmakers, compareObjects, origin } from "../helper";
import { editCarInDB, newEntry } from "../api";
import { FormContext, CarContext } from "../Context/context";
import ImageSearch from "./ImageSearch";

function CarForm() {
  const { dataShape, car, setCar, setShowForm } = useContext(FormContext);
  const { setSearch, search } = useContext(CarContext);
  const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          [action.field]: typeof action.value === 'string' ? action.value.toLowerCase() : action.value,
        };
      case "RESET":
        return dataShape;
      default:
        return state;
    }
  };
  const [formState, dispatch] = useReducer(formReducer, dataShape);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.model === "") return;
    if (compareObjects(formState, dataShape)) {
      return;
    }
    try {
      if (!validateForm(formState)) {
        alert("fill fields");
        return;
      }
      formState["name"] = formState.make + " " + formState.model.trim();
      delete formState.make;
      delete formState.model;
      if (formState.table) {
        delete formState.table;
        await newEntry(formState).then((response) => {
          navigate(`/cars/${response.data.id}`);
          setSearch(!search);
        }).catch(e => {
        alert('api error');
        handleReset()});
        console.log('possible duplicate make model year');
      } else if (formState.id) {
        let id = formState.id;
        delete formState.id;
        await editCarInDB(formState, id)
          .then((res) => {
            setCar([res.data, ...car]);
            setShowForm(false);
            handleReset();
            setSearch(!search);
          })
          .catch((e) => {
            setShowForm(false);
            alert('api down');
            handleReset();
            console.log('possible duplicate make model year');
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleInputChange = (field, value) => {
    dispatch({ type: "CHANGE", field, value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    if (formState.table || formState.id)
      document.getElementById("model").focus();
  };

  function handleSwitch() {
    setShowMore(!showMore);
  }

  return (
    <>
      {showModal && (
        <ImageSearch
          formState={formState}
          handleInputChange={handleInputChange}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-check form-switch" style={{ float: "right" }}>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={showMore}
            onChange={handleSwitch}
            id="flexSwitchCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Advanced Form
          </label>
        </div>
        <div className="mb-1">
          <label htmlFor="make" className="form-label">
            Make
          </label>
          <select
            className="form-control shadow-sm"
            id="make"
            value={formState.make}
            onChange={(e) => handleInputChange("make", e.target.value)}
          >
            {carmakers.map((item, i) => {
              return (
                <option value={item} key={i}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-1">
          <label htmlFor="model" className="form-label">
            Model
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="model"
            onChange={(e) => handleInputChange("model", e.target.value)}
            value={formState.model}
            placeholder="please fill"
          />
          {formState.model.length > 0 && (
            <div className="form-check form-switch" style={{ float: "right" }}>
              <input
                className={`form-check-input ${
                  showModal ? "bg-success" : "bg-warning"
                }`}
                type="checkbox"
                role="switch"
                checked={showModal}
                onChange={() => setShowModal(true)}
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {formState.preferences.imageURL
                  ? "Update Image"
                  : "Add Image from google"}
              </label>
            </div>
          )}
        </div>
        <div className="mb-1">
          <label htmlFor="m-year" className="form-label">
            model year
          </label>
          <select
            className="form-control shadow-sm"
            id="m-year"
            value={formState.model_year}
            onChange={(e) => handleInputChange("model_year", e.target.value)}
          >
            {Array.from({ length: 100 - 70 + 1 }, (_, index) => 70 + index)
              .reverse()
              .map((item, i) => {
                return (
                  <option value={item < 100 ? item : 20} key={i}>
                    {item < 100 ? item : 20}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mb-1">
          <label htmlFor="mpg" className="form-label">
            mpg
          </label>
          <input
            placeholder="10 - 45"
            type="number"
            step="0.10"
            min="9"
            max="47"
            id="mpg"
            className="form-control shadow-sm"
            onChange={(e) => handleInputChange("mpg", e.target.value)}
            value={formState.mpg}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="cyl" className="form-label">
            cylinders
          </label>
          <input
            type="number"
            step="1"
            min="4"
            max="8"
            id="cyl"
            className="form-control shadow-sm"
            onChange={(e) => handleInputChange("cylinders", e.target.value)}
            value={formState.cylinders}
          />
        </div>
        {showMore && (
          <div className="mb-1">
            <label htmlFor="disp" className="form-label">
              displacement
            </label>
            <input
              type="number"
              step="1"
              min="68"
              max="455"
              id="disp"
              className="form-control shadow-sm"
              onChange={(e) =>
                handleInputChange("displacement", e.target.value)
              }
              value={formState.displacement}
            />
          </div>
        )}
        <div className="mb-1">
          <label htmlFor="hp" className="form-label">
            horsepower
          </label>
          <input
            type="number"
            step="1"
            min="46"
            max="280"
            id="hp"
            className="form-control shadow-sm"
            onChange={(e) => handleInputChange("horsepower", e.target.value)}
            value={formState.horsepower}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="wt" className="form-label">
            weight
          </label>
          <input
            type="number"
            step="1"
            min="1600"
            max="5200"
            id="wt"
            className="form-control shadow-sm"
            onChange={(e) => handleInputChange("weight", e.target.value)}
            value={formState.weight}
          />
        </div>
        {showMore && (
          <div className="mb-1">
            <label htmlFor="acc" className="form-label">
              acceleration
            </label>
            <input
              type="number"
              step=".10"
              min="8"
              max="25"
              id="acc"
              className="form-control shadow-sm"
              onChange={(e) =>
                handleInputChange("acceleration", e.target.value)
              }
              value={formState.acceleration}
            />
          </div>
        )}
        <div className="mb-1">
          <label className="form-label">origin</label>
          {origin.map((region) => (
            <div className="form-check-inline mx-2" key={region}>
              <input
                type="radio"
                className="form-check-input"
                id={region}
                value={region}
                checked={formState.origin === region}
                onChange={(e) => handleInputChange("origin", e.target.value)}
              />
              <label className="form-check-label mx-1" htmlFor={region}>
                {region}
              </label>
            </div>
          ))}
        </div>
        <div className="d-flex">
          <button
            type="submit"
            id="formcreate"
            className="btn btn-primary mb-2 me-2"
          >
            Submit
          </button>
          <button
            type="button"
            name="resetform"
            className="btn btn-outline-primary mb-2 btn-sm"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}

export default CarForm;
